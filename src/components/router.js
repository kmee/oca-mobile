import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../pages/login';
import HomeScreen from '../pages/home';
import OdooBackend from '../pages/backend';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const options = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={options} initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Backend" component={OdooBackend} />
    </Stack.Navigator>
  );
};
