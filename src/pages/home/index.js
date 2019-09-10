import React from 'react';
import {AsyncStorage, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

import styles from './style';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Backend"
          onPress={this._showMoreApp}
          buttonStyle={styles.loginButton}
        />
        <Button
          title="Logout"
          onPress={this._signOutAsync}
          buttonStyle={styles.loginButton}
        />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}
