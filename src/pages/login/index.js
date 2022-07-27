/* eslint-disable no-alert */
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
import AuthLoadingScreen from '../../components/auth';

export default function SignInScreen({navigation}) {
  const [state, setState] = React.useState({
    port: 443,
    error: '',
    protocol: 'https',
  });

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const bootstrap = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        // This will switch to the App screen or Auth screen and this loading
        navigation.navigate(userToken ? 'Home' : 'SignIn');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, [navigation]);

  const handleServerChange = server => {
    setState(prev => ({...prev, server}));
  };

  const handleUserChange = user => {
    setState(prev => ({...prev, user}));
  };

  const handlePasswordChange = password => {
    setState(prev => ({...prev, password}));
  };

  const signInAsync = async () => {
    try {
      const odoo_api = await new OdooApi(
        state.server,
        state.user,
        state.password,
      );

      const database_list = await odoo_api.database_list;

      if (database_list && database_list.length) {
        setState(prev => ({...prev, database: database_list[0]}));
        const connection = await odoo_api.connect(state.database);

        if (!connection) {
          alert('Could not connect to database');
        } else if (!connection.uid || typeof connection.uid !== 'number') {
          alert('No database found');
        }

        const imagem = await odoo_api.get_user_image(connection.uid);

        await AsyncStorage.setItem('userToken', connection.session_id);
        await AsyncStorage.setItem('user_display_name', connection.name);
        await AsyncStorage.setItem('user_uid', connection.uid.toString());
        await AsyncStorage.setItem('database', connection.db);
        await AsyncStorage.setItem('image_small', imagem);
        await AsyncStorage.setItem(
          'server_backend_url',
          odoo_api.server_backend_url,
        );

        navigation.navigate('Home', {
          url: odoo_api.server_backend_url,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <AuthLoadingScreen />;
  }

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
              onPress={() => signInAsync()}
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
