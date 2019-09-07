const React = require('react-native');

const {StyleSheet} = React;

export default {
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginFormTextInput: {
    width: 250,
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    width: 300,
    height: 45,
    marginTop: 10,
  },
  authorButton: {
    height: 45,
    marginTop: 10,
  },
  imageLogo: {
    width: 150,
    height: 80,
    marginBottom: 10,
  },
  icon: {
    size: 18,
    color: '#999',
  },
};
