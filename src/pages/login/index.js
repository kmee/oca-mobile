import React from 'react';

import styles from './style';

import {
  AsyncStorage,
  Keyboard,
  Image,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';

import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// import PasswordInputText from 'react-native-hide-show-password-input';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    password: '',
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
                style={styles.loginFormTextInput}
                leftIcon={<Icon name="home" style={styles.icon} />}
              />
              <Input
                placeholder="Username"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                leftIcon={<Icon name="user" style={styles.icon} />}
              />
              <Input
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={true}
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
                  Linking.openURL('https://odoo-community.org');
                }}
                type="clear"
                title="Odoo Community Association"
                color="#3897f1"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}
