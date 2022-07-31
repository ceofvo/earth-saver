import { View, Text, StyleSheet, StatusBar, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";
import GhostButton from "../components/GhostButton";
import { ThemeColor } from "../app-config/theme";

function OnBoardScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
            <View>
                <Image source={require('../assets/save-the-earth-1.png')} />
            </View>
            <View>
                <Text style={styles.mainHeading}>Register with ease</Text>
                <Text style={styles.subText}>Register your account in less than 5 minutes and start saving the planet</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Button 
                    content="LOGIN" 
                    onPress={() => navigation.replace("Login")} 
                />
                <GhostButton
                    textAlign="center"
                    content="REGISTER"
                    type="show"
                    onPress={() => navigation.replace("Signup")}
                />
            </View>
        </View>
    )
}

export default OnBoardScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 35,
  },
  bottomContainer: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  mainHeading: {
    fontSize: 25,
    fontWeight: "600",
    lineHeight: 43,
    color: ThemeColor.primary,
    textAlign: "center",
    marginTop: 100,
  },
  subText: {
    color: ThemeColor.textColor,
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 5,
  },
})