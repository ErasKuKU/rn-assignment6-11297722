// App.js (or any entry point of your app)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import CartScreen from './CartScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
  
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Navigator>
   
  );
}
