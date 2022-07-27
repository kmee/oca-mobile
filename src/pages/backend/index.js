import React from 'react';

import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';

import styles from './style';
import {useOdooContext} from '../../context/OdooProvider';

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
  const [url, setUrl] = React.useState('');
  const {session} = useOdooContext();

  React.useEffect(() => {
    try {
      AsyncStorage.getItem('last_url').then(last_url => {
        if (
          last_url === 'about:blank' ||
          typeof last_url === 'undefined' ||
          last_url == null
        ) {
          setUrl(session.backend_url);
        } else {
          setUrl(last_url);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [session]);

  const onNavigationStateChange = webViewState => {
    AsyncStorage.setItem('last_url', webViewState.url);
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
      source={{uri: url}}
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
