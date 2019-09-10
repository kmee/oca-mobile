import React from 'react';
import {APP_SITE, APP_SITE_TITLE} from 'react-native-dotenv';
import {
  AsyncStorage,
  Keyboard,
  Image,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

const url_api = require('url');

import Odoo from 'react-native-odoo-promise-based';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
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
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
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
                leftIcon={<Icon name="home" style={styles.icon} />}
              />
              <Input
                placeholder="Username"
                placeholderColor="#c4c3cb"
                value={this.state.user}
                onChangeText={this.handleUserChange}
                style={styles.loginFormTextInput}
                leftIcon={<Icon name="user" style={styles.icon} />}
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
                leftIcon={<Icon name="key" style={styles.icon} />}
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
    var url = url_api.parse(this.state.server);

    const odoo = new Odoo({
      host: url.hostname,
      port: this.state.port,
      username: this.state.user,
      password: this.state.password,
      protocol: url.protocol.replace(':', ''),
    });

    await odoo
      .rpc_call('/web/database/list', {})
      .then(response => {
        if (response.success === true) {
          this.state.database = response.data;
        }
      })
      .catch(e => {
        console.log(e);
      });

    if (this.state.database && this.state.database.length === 1) {
      this.state.database = this.state.database[0];
      odoo.database = this.state.database;
    } else {
      console.error('Not implemented');
    }

    await odoo
      .connect()
      .then(response => {
        AsyncStorage.setItem('userToken', response.data.session_id);
        AsyncStorage.setItem('user_display_name', response.data.name);
        AsyncStorage.setItem('user_uid', response.data.uid);
        AsyncStorage.setItem('database', response.data.db);
        odoo
          .get('res.users', {
            ids: [response.data.uid],
            fields: ['image_small'],
          })
          .then(response_image => {
            AsyncStorage.setItem(
              'image_small',
              response_image.data[0].image_small,
            );
          })
          .catch(e => {});
      })
      .catch(e => {
        console.log(e);
      });

    await AsyncStorage.setItem(
      'server_backend_url',
      this.state.server + '/web',
    );
    this.props.navigation.navigate('App', {url: this.state.server + '/web'});
  };
}
