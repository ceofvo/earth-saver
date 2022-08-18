import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import {ThemeColor} from "../app-config/theme";
import HomeScreen from "../screens/HomeScreen";
import RecycleScreen from "../screens/RecycleScreen";
import HistoryScreen from "../screens/HistoryScreen";
import RewardsScreen from "../screens/RewardsScreen";
import AccountScreen from "../screens/AccountScreen";
import EditAccountScreen from '../screens/EditAccountScreen';

const Tab = createBottomTabNavigator();
const AccountStack = createNativeStackNavigator();

function AccountAndEditStackScreen() {
  return (
    <AccountStack.Navigator         
        screenOptions={{
          contentStyle: {backgroundColor: ThemeColor.whiteBg},
          headerShown: false
        }}>
      <AccountStack.Screen 
          name="Account" 
          component={AccountScreen} 
      />
      <AccountStack.Screen 
          name="EditAccount" 
          component={EditAccountScreen}
          options={{
            title: 'Edit Account Details',
            headerShown: true
          }} />
    </AccountStack.Navigator>
  );
}

function PostAuthContent() {
    return (
      <Tab.Navigator 
          screenOptions={{
            tabBarStyle: {backgroundColor: ThemeColor.primary},
            tabBarInactiveTintColor: '#fff',
            tabBarActiveTintColor: ThemeColor.secondary,
          }}>
        <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name="Recycle" 
            component={RecycleScreen}
            options={{
              tabBarLabel: 'Recycle',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="earth-outline" size={size} color={color} />
              ),
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name="History" 
            component={HistoryScreen}
            options={{
              tabBarLabel: 'History',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="analytics-outline" size={size} color={color} />
              ),
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name="Rewards" 
            component={RewardsScreen}
            options={{
              tabBarLabel: 'Rewards',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="star-outline" size={size} color={color} />
              ),
            }}>
        </Tab.Screen>
        <Tab.Screen 
            name="AccountAndEdit" 
            component={AccountAndEditStackScreen}
            options={{
              tabBarLabel: 'Account',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}>
        </Tab.Screen>
      </Tab.Navigator>
    );
}

export default PostAuthContent;