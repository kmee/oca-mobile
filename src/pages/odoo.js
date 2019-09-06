import React from 'react';
import { WebView } from 'react-native-webview';

export default class Odoo extends React.Component {
    render() {
      return (
        <WebView source={{ uri: 'https://facebook.github.io/react-native/' }} />
      );
    }
  }