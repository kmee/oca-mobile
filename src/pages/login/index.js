import React from 'react';
import {APP_SITE, APP_SITE_TITLE} from '@env';
import {
  Keyboard,
  Image,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Button, Input} from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import OdooApi from '../../services/odoo';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    port: 443,
    error: '',
    protocol: 'https',
  };

  handleServerChange = server => {
    this.setState({server});
  };

  handleUserChange = user => {
    this.setState({user});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.containerView}
        behavior="padding"
        keyboardVerticalOffset={-400}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Image
                resizeMode="contain"
                style={styles.imageLogo}
                source={require('../../images/logo.png')}
              />
              <Input
                placeholder="Odoo URL"
                placeholderColor="#c4c3cb"
                value={this.state.server}
                onChangeText={this.handleServerChange}
                style={styles.loginFormTextInput}
                //                leftIcon={<Icon name="home" style={styles.icon} />}
              />
              <Input
                placeholder="Username"
                placeholderColor="#c4c3cb"
                value={this.state.user}
                onChangeText={this.handleUserChange}
                style={styles.loginFormTextInput}
                //                leftIcon={<Icon name="user" style={styles.icon} />}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Input
                placeholder="Password"
                placeholderColor="#c4c3cb"
                value={this.state.password}
                onChangeText={this.handlePasswordChange}
                style={styles.loginFormTextInput}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                //                leftIcon={<Icon name="key" style={styles.icon} />}
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this._signInAsync()}
                title="Login"
              />
              <Button
                buttonStyle={styles.authorButton}
                onPress={() => {
                  Linking.openURL(APP_SITE);
                }}
                type="clear"
                title={APP_SITE_TITLE}
                color="#3897f1"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  _signInAsync = async () => {
    var odoo_api = await new OdooApi(
      this.state.server,
      this.state.user,
      this.state.password,
    );

    const database_list = await odoo_api.database_list;

    if (database_list && database_list.length) {
      if (database_list.length === 1) {
        this.state.database = database_list[0];
      } else {
        console.error('Not implemented');
      }
      var connection = await odoo_api.connect(this.state.database);
      if (typeof connection.uid === 'number') {
        await AsyncStorage.setItem('userToken', connection.session_id);
        await AsyncStorage.setItem('user_display_name', connection.name);
        await AsyncStorage.setItem('user_uid', connection.uid.toString());
        await AsyncStorage.setItem('database', connection.db);
        const imagem = await odoo_api.get_user_image(connection.uid);
        await AsyncStorage.setItem('image_small', imagem);
        await AsyncStorage.setItem(
          'server_backend_url',
          odoo_api.server_backend_url,
        );
        this.props.navigation.navigate('App', {
          url: odoo_api.server_backend_url,
        });
      } else {
        alert('Senha incorreta');
      }
    } else {
      // empty
      alert('No database');
    }
  };
}
