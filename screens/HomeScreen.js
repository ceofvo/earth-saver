import { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { AuthContext } from "../service/AuthContext";

function HomeScreen() {
    const {userData} = useContext(AuthContext)
    
    return (
    <View style={styles.mainContainer}>
        <View>
            <Text>Good day</Text>
            <Text>{userData.firstname} {userData.lastname}</Text>
        </View>
        <Image source={require('../assets/happy-sun-rafiki.png')}/>
    </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 35,
    },
})