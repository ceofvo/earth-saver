import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Ionicons } from '@expo/vector-icons';

import {ThemeColor} from '../app-config/theme';
import { AuthContext } from "../service/AuthContext";
import Button from "../components/Button";
import GhostButton from "../components/GhostButton";

function AccountScreen() {
    const navigation = useNavigation();

    const {logout, userData} = useContext(AuthContext);

    const letterUpper = (text)=>{
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    const fname = letterUpper(userData.firstname)
    const lname = letterUpper(userData.lastname)

    function logoutHandler(){
        logout();
    }

    return(
        <View>
            <LinearGradient
                colors={['#015E43', '#70AC7F']}
                style={styles.background}           
            >
                <View style={styles.container}>
                    <Text style={styles.mainHeading}>Account Details</Text>
                </View>
            </LinearGradient>
            <View style={styles.midContainer}>
                <View style={styles.midContainerLeft}>
                    <View style={styles.profileDet}>
                        <Ionicons name="person-circle" size={24} color={ThemeColor.primary} />
                        <Text style={styles.profileDetText}>{fname} {lname}</Text>   
                    </View>
                    <View style={styles.profileDet}>
                        <Ionicons name="phone-portrait-sharp" size={24} color={ThemeColor.primary} />
                        <Text style={styles.profileDetText}>{userData.phone}</Text>   
                    </View>
                    <View style={styles.profileDet}>
                        <Ionicons name="mail-open-sharp" size={24} color={ThemeColor.primary} />
                        <Text style={styles.profileDetText}>{userData.email}</Text>   
                    </View>
                    <View style={styles.profileDet}>
                        <Ionicons name="location" size={24} color={ThemeColor.primary} />
                        <Text style={styles.profileDetText}>{userData.addy}</Text>   
                    </View>
                </View>
                <View style={styles.midContainerRight}>
                    <GhostButton
                        textAlign="center"
                        content="Edit"
                        onPress={() => navigation.navigate("EditAccount", {userId: userData.id})}
                    />
                </View>             
            </View>
            <View style={styles.bottomContainer}>
                <Button content="Logout" onPress={logoutHandler} />
            </View>
        </View>
    )
}

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: 200,
    },
    mainHeading: {
        fontSize: 30,
        fontWeight: "600",
        lineHeight: 60,
        color: ThemeColor.whiteBg,
        textAlign: "center",
    },
    profileDet: {
        flexDirection: 'row',
        marginVertical: 10,
        borderBottomColor: ThemeColor.lightBg,
        borderBottomWidth: 3,
        borderRadius: 5,
    },
    profileDetText: {
        marginLeft: 5,
        fontSize: 15,
        paddingBottom: 10,
        color: ThemeColor.textColor,
    },
    editText: {
        fontWeight: 600,
        fontSize: 15,
    },
    midContainer: {
        paddingHorizontal: 20,
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
      bottomContainer: {
        marginTop: 30,
        paddingHorizontal: 40,
    },
    midContainerLeft : {
        width: '80%',
    },
    midContainerRight : {
        width: '20%',
    }
})