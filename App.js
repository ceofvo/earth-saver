import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import OnBoardScreen from "./screens/OnBoardScreen";
import SignUpSuccessScreen from "./screens/SignUpSuccessScreen";
import {ThemeColor} from "./app-config/theme";
import AuthProvider, { AuthContext } from "./service/AuthContext";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PreAuthContent() {
  return (
    <Stack.Navigator 
      screenOptions={{
        contentStyle: {backgroundColor: ThemeColor.whiteBg},
        headerShown: false
      }}>
      <Stack.Screen name="OnBoard" component={OnBoardScreen}></Stack.Screen>
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="Signup" component={SignUpScreen}></Stack.Screen>
      <Stack.Screen name="SignupSuccess" component={SignUpSuccessScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

function PostAuthContent() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

function Navigation() {
  const {isLoading, authToken} = useContext(AuthContext)

  
  if (isLoading) {
    return (
    <View style={styles.appNav}>
      <ActivityIndicator size={'large'}></ActivityIndicator>
    </View>
    );
  }

  return (
    <NavigationContainer>
      {authToken !== null ? <PostAuthContent /> : <PreAuthContent />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </>
  );
}


const styles = StyleSheet.create({
  appNav: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"

  }
})