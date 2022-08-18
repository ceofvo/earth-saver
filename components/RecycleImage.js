import { Alert, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

import { ThemeColor } from "../app-config/theme";
import GhostButton from "./GhostButton";

function RecycleImage({ onCapturedImage }) {
  const [capturedImage, setCapturedImage] = useState();

  let openCameraAsyncHandler = async () => {
    try {
      let permissionResponse =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResponse.granted === false) {
        alert("Permission to use camera is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      if (pickerResult.cancelled === true) {
        return;
      }

      setCapturedImage({ localUri: pickerResult.uri });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  let contentToShow = (
    <Text style={styles.previewText}>
      To take a picture of the waste to be recycled, press the button below!
    </Text>
  );

  if (capturedImage) {
    contentToShow = (
      <Image source={{ uri: capturedImage.localUri }} style={styles.image} />
    );
  }

  useEffect(() => {
    onCapturedImage(capturedImage);
  }, [capturedImage]);

  return (
    <View>
      <View style={styles.previewImage}>{contentToShow}</View>
      <GhostButton
        type="show"
        textAlign="center"
        onPress={openCameraAsyncHandler}
        content="Take Plastic Waste Picture"
      />
    </View>
  );
}

export default RecycleImage;

const styles = StyleSheet.create({
  previewImage: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ThemeColor.lightBg,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  previewText: {
    textAlign: "center",
    paddingHorizontal: 10,
    color: ThemeColor.holderColor,
  },
});
