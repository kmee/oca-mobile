import React from 'react';

import {ActivityIndicator, AsyncStorage, Vibration} from 'react-native';
import {WebView} from 'react-native-webview';

import styles from './style';

const DURATION = 10000;
const PATTERN = [1000, 2000, 3000, 4000];

export default class OdooBackend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    header: null,
  };

  StartVibrationFunction = () => {
    // Device Will Vibrate for 10 seconds.
    // Vibration.vibrate(DURATION);

    // Android Device Will Vibrate in pattern : Wait 1sec -> vibrate 2sec -> wait 3sec.
    // iOS Device Will Vibrate in pattern : Wait 1sec -> Vibrate -> wait 2sec -> Vibrate -> wait 3sec -> Vibrate

    Vibration.vibrate(PATTERN);

    // Android Device Will Vibrate in above pattern Infinite Time.
    // iOS Device Will Vibrate in above pattern Infinite Time.

    // Vibration.vibrate(PATTERN, true)
    // Vibration.cancel();
  };

  async componentDidMount() {
    AsyncStorage.getItem('last_url').then(last_url => {
      if (
        last_url === 'about:blank' ||
        typeof last_url === 'undefined' ||
        last_url == null
      ) {
        AsyncStorage.getItem('server_backend_url')
          .then(url => {
            if (url) {
              this.setState({url: url});
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        this.setState({url: last_url});
      }
    });
  }

  _onNavigationStateChange(webViewState) {
    AsyncStorage.setItem('last_url', webViewState.url);
  }

  _backendMessage(message) {
    switch (message) {
      case 'REACT_EXIT':
        // this.StartVibrationFunction();
        this.props.navigation.navigate('Home');
        break;
      case 'OTHER_MESSAGE':
        this.props.navigation.navigate('Home');
        break;
      default:
        console.log(message);
    }
  }

  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  render() {
    const runFirst = `
      $("[data-menu=logout]").attr('data-menu','logout_custom');
      $("[data-menu=logout_custom]").click(()=>{
          window.ReactNativeWebView.postMessage("REACT_EXIT");
      });
    `;

    console.log(this.state.cookie);

    return (
      <WebView
        source={{uri: this.state.url}}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={this.ActivityIndicatorLoadingView}
        injectedJavaScript={runFirst}
        // injectedJavaScript={this.state.cookie}
        onMessage={event => {
          this._backendMessage(event.nativeEvent.data);
        }}
      />
    );
  }
}
