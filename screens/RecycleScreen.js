import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useIsFocused } from "@react-navigation/native";

import Button from "../components/Button";
import Input from "../components/Input";
import {ThemeColor} from "../app-config/theme";
import RecycleImage from "../components/RecycleImage";
import PickUpLocation from "../components/PickUpLocation";
import { BASE_URL } from "../app-config/accessData";
import { AuthContext } from "../service/AuthContext";

function RecycleScreen() {
    const {userData} = useContext(AuthContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [enteredDate, setEnteredDate] = useState("");
    const [enteredWeight, setEnteredWeight] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [enteredLocation, setEnteredLocation] = useState(null);

    const [invalidDate, setInvalidDate] = useState(true);
    const [invalidWeight, setInvalidWeight] = useState(true);
    const [invalidImage, setInvalidImage] = useState(true);
    const [invalidLocation, setInvalidLocation] = useState(true);

    function enteredWeightHandler(enteredValue) {
      setEnteredWeight(enteredValue);
    }
    function enteredDateHandler(enteredValue) {
      setEnteredDate(enteredValue);
    }
    function takeImageHandler(imageUri) {
      setSelectedImage(imageUri);   
    }

    function enteredLocationHandler(enteredValue) {
        setEnteredLocation(enteredValue);  
    }

    function recycleRequestHandler() {
      const validDateChecker = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  
      if (validDateChecker.test(enteredDate)) {
        setInvalidDate(false)
      } else {
        setInvalidDate(true)
      }

      if (enteredWeight === "") {
        setInvalidWeight(true)
      }  else {
        setInvalidWeight(false)
      }

      if (!selectedImage) {
         setInvalidImage(true);
      } else {
         setInvalidImage(false)
      }

      if (!enteredLocation) {
        setInvalidLocation(true);
      } else {
        setInvalidLocation(false)
      }

      console.log("Weight",enteredWeight)
      console.log("Date",enteredDate)
      console.log("Image",selectedImage)
      console.log("Location",enteredLocation)
      console.log(invalidDate, invalidWeight, invalidImage, invalidLocation)

      if (invalidWeight === false && invalidDate === false && invalidImage === false && invalidLocation === false) {
        let dateSplit = enteredDate.split('-');
        let newDate = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;

        let formInputs = new FormData();
        formInputs.append("requestWeight", enteredWeight);
        formInputs.append("requestDate", newDate);
        formInputs.append("wasteimage", {
          uri : selectedImage.localUri,
          type: "image/jpg",
          name: "imagename" 
         });
        formInputs.append("requestLocation", enteredLocation);
        formInputs.append("userId", userData.id);

        const url = `${BASE_URL}/api/request/add`;

        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          body: formInputs
        })
        .then((response) => response.json())
        .then((json) => {
          if( json.message === "Success" ){
            setEnteredDate(null)
            setEnteredWeight(null)
            setSelectedImage(null)
            setEnteredLocation(null)
              Alert.alert(
                  'Success!',
                   json.reason,
                   [
                      { 
                          text: "OK", 
                          onPress: () => {
                            navigation.navigate('Recycle')
                          }
                      }
                    ]
                );
          } else if(json.message === "Failed" ) {
              Alert.alert(
                  'Failed!',
                  json.reason
              );
          }
        })
        .catch((error) => {
          console.log("Error:", error)
          Alert.alert(
            'Recycle request failed!',
            'Please try again later.'
          );
        }); 
      } 
    }

    return(
        <View>
          <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollContainer}
              keyboardShouldPersistTaps={'handled'}>
            <View style={styles.inputContainer}>
              <Text>Estimated Weight (kg)</Text>
              <Input
                  keyboardType="default"
                  placeholderText="e.g 10"
                  value={enteredWeight}
                  onChangeValue={enteredWeightHandler}
                  isValid={invalidWeight}
              />
              {invalidWeight && <Text style={styles.invalidText}>Enter a valid weight</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text>Pickup Date</Text>
              <Input
                  keyboardType="default"
                  placeholderText="DD-MM-YYYY"
                  value={enteredDate}
                  onChangeValue={enteredDateHandler}
                  isValid={invalidDate}
              />
              {invalidDate && <Text style={styles.invalidText}>Enter a valid date</Text>}
            </View>

            <View style={styles.inputContainer}>
              <RecycleImage onCapturedImage={takeImageHandler} />
              {invalidImage && <Text style={styles.invalidText}>Please take a picture of the waste</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.pickupText}>Pickup Location</Text>
                <PickUpLocation 
                    onSelectedLocation={enteredLocationHandler}/>
                {invalidLocation && <Text style={styles.invalidText}>Please enter location of waste</Text>}
            </View>

            <View style={styles.bottomContainer}>
                <Button content="Send Recycle Request" onPress={recycleRequestHandler} />
            </View>
            
          </ScrollView>
        </View>
    )
}

export default RecycleScreen;

const styles = StyleSheet.create({
    bottomContainer: {
      marginTop: 30,
      paddingHorizontal: 50,
      marginBottom: 100,
  },
  invalidText: {
    color: ThemeColor.errorDark,
    textAlign: "center"
  },
  scrollContainer: {
    paddingHorizontal: 25,
  },
  inputContainer: {
    marginTop: 20,
  },
  pickupText :{
    marginBottom: 20,
  }
})