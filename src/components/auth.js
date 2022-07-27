import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';

import styles from './style';

export default function AuthLoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}
