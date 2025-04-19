import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import IFSCInputScreen from './screens/IFSCInputScreen';
import BankCodeScreen from './screens/BankCodeScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#121212',  // Dark background
          },
          headerTitleStyle: {
            color: '#f0b90b',            // Binance yellow title text
            fontWeight: 'bold',
          },
          headerTintColor: '#f0b90b',    // Back arrow and icons
          headerShadowVisible: false,   // No bottom shadow
          headerTitleAlign: 'center',   // Optional: center-align title like Binance
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="IFSCInput" component={IFSCInputScreen} options={{ title: 'Enter IFSC' }} />
        <Stack.Screen name="BankCode" component={BankCodeScreen} options={{ title: 'Enter Bank Code' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Create Account' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



