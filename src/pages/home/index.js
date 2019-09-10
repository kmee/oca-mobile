import React from 'react';
import {AsyncStorage, Image, View} from 'react-native';
import {Button, Card, Icon, Text} from 'react-native-elements';

import styles from './style';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: ' ',
      server: ' ',
      db: ' ',
      image_small: '',
    };
  }

  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    var server = await AsyncStorage.getItem('server_backend_url');
    var user_name = await AsyncStorage.getItem('user_display_name');
    var image_small = await AsyncStorage.getItem('image_small');
    var db = await AsyncStorage.getItem('database');
    this.setState({
      server: server,
      user_name: user_name,
      db: db,
      image_small: image_small,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Card title={this.state.user_name}>
          <Image
            style={styles.image_badge}
            source={{uri: `data:image;base64,${this.state.image_small}`}}
          />
          <Text style={styles.text_badge}>{this.state.server}</Text>
          <Text style={styles.text_badge}>Database: {this.state.db}</Text>
          <Button
            title="Backend"
            onPress={this._showMoreApp}
            buttonStyle={styles.loginButton}
            icon={<Icon name="home" color="#ffffff" />}
          />
          <Button
            title="Logout"
            onPress={this._signOutAsync}
            buttonStyle={styles.loginButton}
            icon={<Icon name="exit-to-app" color="#ffffff" />}
          />
        </Card>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}
