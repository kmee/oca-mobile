import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignInScreen from '../pages/login';
import HomeScreen from '../pages/home';
import Odoo from '../pages/odoo';
import AuthLoadingScreen from './auth';

const AppStack = createStackNavigator({ Home: HomeScreen, Other: Odoo });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
