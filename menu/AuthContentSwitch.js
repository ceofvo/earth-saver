import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { AuthContext } from "../service/AuthContext";
import PostAuthContent from "./PostAuthContent";
import PreAuthContent from "./PreAuthContent";

function AuthContentSwitch() {
    const {isLoading, authToken} = useContext(AuthContext)

    if (isLoading) {
        return (
            <View style={styles.appLoader}>
                <ActivityIndicator size={'large'}></ActivityIndicator>
            </View>
        );
    }

    return(
        <NavigationContainer>
            {authToken === null ? <PreAuthContent /> : <PostAuthContent /> }
        </NavigationContainer>
    );
}

export default AuthContentSwitch;

const styles = StyleSheet.create({
  appLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"

  }
})