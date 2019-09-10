import React from 'react';
import {AsyncStorage} from 'react-native';
import {WebView} from 'react-native-webview';

export default class OdooBackend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: undefined,
    };
  }

  _onNavigationStateChange(webViewState) {
    AsyncStorage.setItem('last_url', webViewState.url);
  }

  componentDidMount() {
    AsyncStorage.getItem('last_url').then(value => {
      if (value !== undefined) {
        this.state({
          url: value,
        });
      } else {
        this.state({
          url: AsyncStorage.getItem('server_backend_url'),
        });
      }
    });
  }

  render() {
    return (
      <WebView
        source={{uri: this.state.url}}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={this.state.cookie}
        startInLoadingState={false}
      />
    );
  }
}
