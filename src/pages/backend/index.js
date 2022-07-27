import React from 'react';

import {ActivityIndicator, Vibration} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';

import styles from './style';

const PATTERN = [1000, 2000, 3000, 4000];

function ActivityIndicatorLoadingView() {
  return (
    <ActivityIndicator
      color="#009688"
      size="large"
      style={styles.ActivityIndicatorStyle}
    />
  );
}

export default function OdooBackend({navigation}) {
  const [url, setUrl] = React.useState({});

  // const StartVibrationFunction = () => {
  //   // Device Will Vibrate for 10 seconds.
  //   // Vibration.vibrate(DURATION);

  //   // Android Device Will Vibrate in pattern : Wait 1sec -> vibrate 2sec -> wait 3sec.
  //   // iOS Device Will Vibrate in pattern : Wait 1sec -> Vibrate -> wait 2sec -> Vibrate -> wait 3sec -> Vibrate

  //   Vibration.vibrate(PATTERN);

  //   // Android Device Will Vibrate in above pattern Infinite Time.
  //   // iOS Device Will Vibrate in above pattern Infinite Time.

  //   // Vibration.vibrate(PATTERN, true)
  //   // Vibration.cancel();
  // };

  React.useEffect(() => {
    AsyncStorage.getItem('last_url').then(last_url => {
      if (
        last_url === 'about:blank' ||
        typeof last_url === 'undefined' ||
        last_url == null
      ) {
        AsyncStorage.getItem('server_backend_url')
          .then(uri => {
            if (uri) {
              setUrl(uri);
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        setUrl(last_url);
      }
    });
  }, []);

  const onNavigationStateChange = webViewState => {
    AsyncStorage.setItem('last_url', webViewState.url);
  };

  const handleBackendMessage = message => {
    switch (message) {
      case 'REACT_EXIT':
        // this.StartVibrationFunction();
        navigation.navigate('Home');
        break;
      case 'OTHER_MESSAGE':
        navigation.navigate('Home');
        break;
      default:
        console.log(message);
    }
  };

  const runFirst = `
      $("[data-menu=logout]").attr('data-menu','logout_custom');
      $("[data-menu=logout_custom]").click(()=>{
          window.ReactNativeWebView.postMessage("REACT_EXIT");
      });
    `;

  return (
    <WebView
      source={url}
      onNavigationStateChange={onNavigationStateChange}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      renderLoading={ActivityIndicatorLoadingView}
      injectedJavaScript={runFirst}
      // injectedJavaScript={this.state.cookie}
      onMessage={event => {
        handleBackendMessage(event.nativeEvent.data);
      }}
    />
  );
}
