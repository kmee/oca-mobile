import {createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SignInScreen from '../pages/login';
import HomeScreen from '../pages/home';
import OdooBackend from '../pages/backend';
import AuthLoadingScreen from './auth';

const AuthStack = createStackNavigator({SignIn: SignInScreen});
const AppStack = createStackNavigator({Other: OdooBackend, Home: HomeScreen});

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
