import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import LoginForm from '../../components/loginform';

// import PasswordInputText from 'react-native-hide-show-password-input';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  state = {
    password: '',
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            source={require('../../images/logo.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </KeyboardAvoidingView>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  logo: {
    position: 'absolute',
    width: 300,
    height: 100,
  },
});
