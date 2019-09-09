import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SignInScreen from '../pages/login';
import HomeScreen from '../pages/home';
import Odoo from '../pages/odoo';
import AuthLoadingScreen from './auth';

const AuthStack = createStackNavigator({SignIn: SignInScreen});
const AppStack = createStackNavigator({Home: HomeScreen, Other: Odoo});

export const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
