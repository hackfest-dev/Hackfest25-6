import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PayThroughQR from './PayThroughQR';
import PayThroughUPI from './PayThroughUPI';

const Tab = createMaterialTopTabNavigator();

export default function UPIPayment() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#121212' },
        tabBarLabelStyle: { fontWeight: 'bold', color: '#f0b90b' },
        tabBarIndicatorStyle: { backgroundColor: '#f0b90b' },
      }}
    >
      <Tab.Screen name="Get paid through QR" component={PayThroughQR} />
      <Tab.Screen name="Pay through UPI" component={PayThroughUPI} />
    </Tab.Navigator>
  );
}
