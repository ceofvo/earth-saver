import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { useContext } from "react";

import { ThemeColor } from "../app-config/theme";
import Button from "../components/Button";
import { AuthContext } from "../service/AuthContext";

function SignUpSuccessScreen() {
    const {login, userData} = useContext(AuthContext);

    function registerSuccessHandler() {
        login(userData)
    }

    return (
    <View style={styles.mainContainer}>
        <ImageBackground source={require('../assets/success-bg.png')} resizeMode="cover" style={styles.imageBg}>
            <View style={styles.topContainer}>
                <Text style={styles.mainHeading}>Congratulations</Text>
                <Text style={styles.subText}>Your account has been created successfully</Text>
            </View>
            <View style={styles.bottomContainer}>
            <Button content="CONTINUE" onPress={registerSuccessHandler} />
            </View>
        </ImageBackground>
    </View>
    )
}

export default SignUpSuccessScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    imageBg: {
        flex: 1,
        justifyContent: "center",
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
    bottomContainer: {
        marginTop: 30,
        paddingHorizontal: 30,
    },
})