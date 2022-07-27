import React from 'react';
import {Image, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Button, Card, Icon, Text} from 'react-native-elements';

import styles from './style';
import {useOdooContext} from '../../context/OdooProvider';

export default function HomeScreen({navigation}) {
  const {session} = useOdooContext();
  const state = {
    user_name: session.name,
    server: session.backend_url,
    db: session.db,
    image_small: session.avatar,
  };

  const showMoreApp = () => {
    navigation.navigate('Backend');
  };

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Card title={state.user_name}>
        <Image
          style={styles.image_badge}
          source={{uri: `data:image;base64,${state.image_small}`}}
        />
        <Text style={styles.text_badge}>URL: {state.server}</Text>
        <Text style={styles.text_badge}>Database: {state.db}</Text>
        <Button
          title="Backend"
          onPress={showMoreApp}
          buttonStyle={styles.loginButton}
          icon={<Icon name="home" color="#ffffff" />}
        />
        <Button
          title="Logout"
          onPress={signOutAsync}
          buttonStyle={styles.loginButton}
          icon={<Icon name="exit-to-app" color="#ffffff" />}
        />
      </Card>
    </View>
  );
}
