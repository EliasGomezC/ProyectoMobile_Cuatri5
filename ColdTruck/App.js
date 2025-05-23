// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Pantallas
import LoginScreen from './src/screens/loginYregister/login';
import RegisterScreen from './src/screens/loginYregister/register'
import InicioScreen from './src/tests/testNodeJS';
import TestScreen from './src/tests/test2';
import mainDriverScreen from './src/screens/driver/mainDriver';
import historyDriverScreen from './src/screens/driver/historyRoutes';
import notificationDriverScreen from './src/screens/driver/notificationDriver';
import routeDriverScreen from './src/screens/driver/routeDriver';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Componente con las Tabs según el rol
const HomeTabs = ({ route }) => {
  const { role } = route.params;

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitle: '',
          headerStyle: {
              backgroundColor: "#2C7296",
              height: 80,
              
          },
          tabBarActiveTintColor: '#0E415C',
          tabBarInactiveTintColor: '#0E415C',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Test') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Main') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Route') {
              iconName = focused ? 'map' : 'map-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarShowLabel: false,
          tabBarItemStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            margin: 5,
            padding: 5,
          },
          tabBarPressColor: 'transparent',
          tabBarPressOpacity: 1,
          tabBarStyle: {
            height: 110,
            gap: 10,
          },
        })}
      >
      {role === 'Administrator' && (
        <Tab.Screen name="Inicio" component={InicioScreen} />
      )}
      {role === 'Driver' && (
        <>
          <Tab.Screen name='Main' component={mainDriverScreen}/>
          <Tab.Screen name="Test" component={TestScreen} />
          <Tab.Screen name='Route' component={routeDriverScreen}/>
          <Tab.Screen name='History' component={historyDriverScreen}/>
          <Tab.Screen name='Notification' component={notificationDriverScreen}/>
        </>
      )}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabs}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
