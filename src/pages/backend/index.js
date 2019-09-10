import React from 'react';

import {ActivityIndicator, AsyncStorage, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

import styles from './style';

export default class OdooBackend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    var url = await AsyncStorage.getItem('last_url');
    if (url === 'about:blank' || typeof url === 'undefined') {
      url = await AsyncStorage.getItem('server_backend_url');
    }
    this.setState({url: url});
  }

  // componentDidMount() {
  //   console.log('Componentem montou');
  // }

  _onNavigationStateChange(webViewState) {
    AsyncStorage.setItem('last_url', webViewState.url);
  }

  ActivityIndicatorLoadingView() {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  render() {
    return (
      <WebView
        source={{uri: this.state.url}}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={this.state.cookie}
        startInLoadingState={true}
        renderLoading={this.ActivityIndicatorLoadingView}
      />
    );
  }
}
