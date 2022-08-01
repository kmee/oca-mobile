// In App.js in a new project

import React from 'react';
import {AppNavigator} from '../components/router';
import {NavigationContainer} from '@react-navigation/native';
import OdooProvider from '../context/OdooProvider';

export default function App() {
  return (
    <NavigationContainer>
      <OdooProvider>
        <AppNavigator />
      </OdooProvider>
    </NavigationContainer>
  );
}
