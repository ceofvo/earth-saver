import { useContext, useState } from "react";
import { StyleSheet, Text, View, ScrollView, StatusBar, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ThemeColor } from "../app-config/theme";
import Button from "../components/Button";
import GhostButton from "../components/GhostButton";
import Input from "../components/Input";
import { AuthContext } from "../service/AuthContext";

function SignUpScreen() {
  const navigation = useNavigation();
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredHomeAddy, setEnteredHomeAddy] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {register} = useContext(AuthContext);

  function inputFirstNameHandler(enteredValue) {
    setEnteredFirstName(enteredValue);
  }
  function inputLastNameHandler(enteredValue) {
    setEnteredLastName(enteredValue);
  }
  function inputEmailHandler(enteredValue) {
    setEnteredEmail(enteredValue);
  }
  function inputPhoneHandler(enteredValue) {
    setEnteredPhone(enteredValue);
  }
  function inputHomeAddyHandler(enteredValue) {
    setEnteredHomeAddy(enteredValue);
  }
  function inputPasswordHandler(enteredValue) {
    setEnteredPassword(enteredValue);
  }
  function inputConfirmPasswordHandler(enteredValue) {
    setEnteredConfirmPassword(enteredValue);
  }
  function registerHandler() {
    const url = 'http://192.168.0.3:3000/api/register';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        phone:enteredPhone,
        homeAddy:enteredHomeAddy,
        password:enteredPassword,
      })
    })
    .then((response) => response.json())
    .then((json) => {
      if( json.message === "Success" ){
        navigation.replace("SignupSuccess")
        register(json.data)
      } else if(json.message === "Failed" ) {
        Alert.alert(
          'Registration failed!',
           json.reason
        );
      }
    })
    .catch((error) => {
      Alert.alert(
        'Registration failed!',
        'Please try again later!'
      );
    }); 
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <View style={styles.topContainer}>
          <Text style={styles.mainHeading}>Create Account</Text>
          <Text style={styles.subText}>Just a few details about you</Text>
        </View>
        <View style={styles.midContainer}>
          <Input
            keyboardType="default"
            placeholderText="First Name"
            value={enteredFirstName}
            onChangeValue={inputFirstNameHandler}
          />
          <Input
            keyboardType="default"
            placeholderText="Last Name"
            value={enteredLastName}
            onChangeValue={inputLastNameHandler}
          />
          <Input
            keyboardType="default"
            placeholderText="Email Address"
            value={enteredEmail}
            onChangeValue={inputEmailHandler}
          />
          <Input
            keyboardType="default"
            placeholderText="Phone"
            value={enteredPhone}
            onChangeValue={inputPhoneHandler}
          />
          <Input
            keyboardType="default"
            placeholderText="Home Address"
            value={enteredHomeAddy}
            onChangeValue={inputHomeAddyHandler}
          />
          <Input
            keyboardType="default"
            placeholderText="Password"
            value={enteredPassword}
            secure
            onChangeValue={inputPasswordHandler}
          />
          <Input
            keyboardType="default"
            placeholderText="Confirm Password"
            value={enteredConfirmPassword}
            secure
            onChangeValue={inputConfirmPasswordHandler}
          />
          <GhostButton textAlign="right" content="Forgot Password?" />
        </View>
        <View style={styles.bottomContainer}>
          <Button content="Create Account" onPress={registerHandler} />
          <GhostButton
            textAlign="center"
            content="Don't have an account? Sign up here"
            onPress={() => navigation.replace("Login")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
  mainHeading: {
    fontSize: 35,
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
  topContainer: {
    marginBottom: 20,
  },
  midContainer: {
    paddingHorizontal: 20,
  },
  bottomContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
});
