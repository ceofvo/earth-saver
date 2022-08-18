import { useContext, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { ThemeColor } from "../app-config/theme";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";
import GhostButton from "../components/GhostButton";
import Input from "../components/Input";
import { AuthContext } from "../service/AuthContext";

function LoginScreen() {
  const navigation = useNavigation();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const {login} = useContext(AuthContext);

  function inputEmailHandler(enteredValue) {
    setEnteredEmail(enteredValue);
  }

  function inputPasswordHandler(enteredValue) {
    setEnteredPassword(enteredValue);
  }

  function loginHandler() {
    const url = 'http://192.168.0.3:3000/api/login';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: enteredEmail,
        password:enteredPassword,
      })
    })
    .then((response) => response.json())
    .then((json) => {
      if( json.message === "Success" ){
        login(json.data)
      } else if(json.message === "Failed" ) {
        Alert.alert(
          'Authentication failed!',
          'Please check your credentials. ' + json.reason
        );
      }
    })
    .catch((error) => {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
    });

  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.mainHeading}>Login</Text>
        <Text style={styles.subText}>Enter your details below to continue</Text>
      </View>
      <View style={styles.midContainer}>
        <Input
          keyboardType="email-address"
          placeholderText="Email Address"
          value={enteredEmail}
          onChangeValue={inputEmailHandler}
        />
        <Input
          keyboardType="default"
          placeholderText="Password"
          value={enteredPassword}
          secure
          onChangeValue={inputPasswordHandler}
        />
        <GhostButton textAlign="right" content="Forgot Password?" />
      </View>
      <View style={styles.bottomContainer}>
        <Button content="Login" onPress={loginHandler} />
        <GhostButton
          textAlign="center"
          content="Don't have an account? Sign up here"
          onPress={() => navigation.replace("Signup")}
        />
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  mainHeading: {
    fontSize: 35,
    fontWeight: "600",
    lineHeight: 43,
    color: ThemeColor.primary,
    textAlign: "center",
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
  },
});
