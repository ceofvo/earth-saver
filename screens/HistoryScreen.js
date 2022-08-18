import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';

import PickUpLocation from "../components/PickUpLocation";

function HistoryScreen() {
    const [enteredLocation, setEnteredLocation] = useState("");

    function enteredLocationHandler(enteredValue) {
        setEnteredLocation(enteredValue);  
        console.log("In history", enteredValue) 
        console.log("In history state", enteredLocation) 
    }

    return(
        <View style={styles.container}>
            <Text>The History Screen</Text>
            <View style={styles.container}>
                <PickUpLocation 
                    onSelectedLocation={enteredLocationHandler}/>
            </View>
        </View>
    )
}

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: '#ecf0f1',
    },
})