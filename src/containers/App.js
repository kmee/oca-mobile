// In App.js in a new project

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {AppNavigator} from '../components/router';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
