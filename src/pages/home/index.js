import React from 'react';
import {Image, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Button, Card, Icon, Text} from 'react-native-elements';

import styles from './style';

export default function HomeScreen({navigation}) {
  const [state, setState] = React.useState({
    user_name: ' ',
    server: ' ',
    db: ' ',
    image_small: '',
  });

  const showMoreApp = () => {
    navigation.navigate('Backend');
  };

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    navigation.navigate('SignIn');
  };

  React.useEffect(() => {
    const bootstrap = async () => {
      const server = await AsyncStorage.getItem('server_backend_url');
      const user_name = await AsyncStorage.getItem('user_display_name');
      const image_small = await AsyncStorage.getItem('image_small');
      const db = await AsyncStorage.getItem('database');

      setState({
        server: server,
        user_name: user_name,
        db: db,
        image_small: image_small,
      });
    };
    bootstrap();
  }, []);

  return (
    <View style={styles.container}>
      <Card title={state.user_name}>
        <Image
          style={styles.image_badge}
          source={{uri: `data:image;base64,${state.image_small}`}}
        />
        <Text style={styles.text_badge}>{state.server}</Text>
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
