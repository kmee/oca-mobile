import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Odoo from 'react-native-odoo-promise-based';

import styles from './style';

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken);

    // if (userToken !== undefined) {
    //   const odoo = new Odoo({
    //     host: 'mobile-ponto.kmee.com.br',
    //     port: '443',
    //     database: 'mobile-ponto',
    //     // username: this.state.user,
    //     // password: this.state.password,
    //     sid: userToken,
    //     protocol: 'https',
    //   });
    //   await odoo
    //     .connect()
    //     .then(response => {
    //       console.log(userToken);
    //       console.log(response);
    //       console.log(response.data);
    //       AsyncStorage.setItem('userToken', response.data.session_id);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
