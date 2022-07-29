import React from 'react';

import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';

import styles from './style';
import {useOdooContext} from '../../context/OdooProvider';
import CookieManager from '@react-native-cookies/cookies';

const CHECK_COOKIE = `
  ReactNativeWebView.postMessage("Cookie: " + document.cookie);
  true;
`;

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
  const {session} = useOdooContext();
  const webViewRef = React.useRef(null);

  const onNavigationStateChange = webViewState => {
    console.log({
      current: webViewState.url,
      backendUrl: session.backend_url,
    });
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(CHECK_COOKIE);
    }
    AsyncStorage.setItem('last_url', webViewState.url);
  };

  const onMessage = async event => {
    const {data} = event.nativeEvent;
    if (data.includes('Cookie:')) {
      console.log(session);
      await CookieManager.get(session.backend_url, true);
    }
  };

  const handleBackendMessage = message => {
    switch (message) {
      case 'REACT_EXIT':
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
      source={{
        uri: session.backend_url,
      }}
      ref={webViewRef}
      onNavigationStateChange={onNavigationStateChange}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      sharedCookiesEnabled={true}
      startInLoadingState={true}
      renderLoading={ActivityIndicatorLoadingView}
      injectedJavaScript={runFirst}
      // injectedJavaScript={this.state.cookie}
      onMessage={event => {
        onMessage(event);
        handleBackendMessage(event.nativeEvent.data);
      }}
    />
  );
}
