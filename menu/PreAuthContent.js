import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {ThemeColor} from "../app-config/theme";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import OnBoardScreen from "../screens/OnBoardScreen";
import SignUpSuccessScreen from "../screens/SignUpSuccessScreen";

const Stack = createNativeStackNavigator();

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

export default PreAuthContent;