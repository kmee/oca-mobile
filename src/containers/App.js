// In App.js in a new project

import React from 'react';
import {AppNavigator} from '../components/router';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
