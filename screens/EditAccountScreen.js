import { useContext, useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";
import Input from "../components/Input";
import { AuthContext } from "../service/AuthContext";
import { BASE_URL } from "../app-config/accessData";


function EditAccountScreen() {
    const {userData, update} = useContext(AuthContext);
    const navigation = useNavigation();
    
    const [enteredFirstName, setEnteredFirstName] = useState(userData.firstname);
    const [enteredLastName, setEnteredLastName] = useState(userData.lastname);
    const [enteredEmail, setEnteredEmail] = useState(userData.email);
    const [enteredPhone, setEnteredPhone] = useState(userData.phone);
    const [enteredHomeAddy, setEnteredHomeAddy] = useState(userData.addy);

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

    function updateAccountHandler() {
      const url = `${BASE_URL}/api/users/${userData.id}`;
  
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
          token: userData.token
        })
      })
      .then((response) => response.json())
      .then((json) => {
        if( json.message === "Success" ){
            update(json.data)
            Alert.alert(
                'Success!',
                 json.reason,
                 [
                    { 
                        text: "OK", 
                        onPress: () => {
                            navigation.replace("Account")
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
        Alert.alert(
          'Account update failed!',
          'Please try again later!'
        );
      }); 
    }

    return(
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollContainer}
            >
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
                        activatemulti = {true}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <Button content="Update Account" onPress={updateAccountHandler} />
                </View>
            </ScrollView>
        </View>
    )
}

export default EditAccountScreen;

const styles = StyleSheet.create({
    midContainer: {
        paddingHorizontal: 30,
    },
        bottomContainer: {
        marginTop: 30,
        paddingHorizontal: 50,
    },
    scrollContainer: {
        paddingHorizontal: 16,
    },
})