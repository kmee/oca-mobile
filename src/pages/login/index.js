import React from 'react';
import {APP_SITE, APP_SITE_TITLE} from '@env';
import {
  Keyboard,
  Image,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Linking,
  Alert,
} from 'react-native';

import {Button, Input} from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

import {useOdooContext} from '../../context/OdooProvider';

export default function SignInScreen() {
  const {signIn} = useOdooContext();

  const [state, setState] = React.useState({
    port: 443,
    error: '',
    protocol: 'https',
    server: 'https://tgi.kmee.com.br',
    user: 'arc.admin',
    password: 'tg1k&m2021',
  });

  const handleServerChange = server => {
    setState(prev => ({...prev, server}));
  };

  const handleUserChange = user => {
    setState(prev => ({...prev, user}));
  };

  const handlePasswordChange = password => {
    setState(prev => ({...prev, password}));
  };

  const handleSignIn = async () => {
    const {server, user, password} = state;
    try {
      await signIn({server, username: user, password});
    } catch (error) {
      Alert.alert('An unknown error occurred', error.message);
      console.error(error);
    }
  };

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
              value={state.server}
              onChangeText={handleServerChange}
              style={styles.loginFormTextInput}
              //                leftIcon={<Icon name="home" style={styles.icon} />}
            />
            <Input
              placeholder="Username"
              placeholderColor="#c4c3cb"
              value={state.user}
              onChangeText={handleUserChange}
              style={styles.loginFormTextInput}
              //                leftIcon={<Icon name="user" style={styles.icon} />}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              placeholder="Password"
              placeholderColor="#c4c3cb"
              value={state.password}
              onChangeText={handlePasswordChange}
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              //                leftIcon={<Icon name="key" style={styles.icon} />}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={handleSignIn}
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
