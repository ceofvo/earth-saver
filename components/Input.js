import { StyleSheet, TextInput, View } from "react-native";

import {ThemeColor} from "../app-config/theme";

function Input({
    keyboardType,
    secure,
    onChangeValue,
    value,
    isValid,
    placeholderText
}) {
    return (
        <View>
            <TextInput 
                style={[styles.inputField, isValid && styles.inputInvalid]}
                autoCapitalize="none"
                keyboardType={keyboardType}
                secureTextEntry={secure}
                onChangeText={onChangeValue}
                value={value}
                placeholder={placeholderText}
                placeholderTextColor={ThemeColor.textColor} 
            />
        </View>
    );
    
}

export default Input;

const styles =  StyleSheet.create({
    inputField: {
        fontSize: 14,
        borderRadius: 35,
        backgroundColor: ThemeColor.lightBg,
        padding: 10,
        textAlign: "center",
        marginTop: 30,
    },
    inputInvalid: {
        backgroundColor: "#f2f2f2"
    }
})