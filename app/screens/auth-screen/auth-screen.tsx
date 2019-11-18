import * as React from "react"
import { View, Image, SafeAreaView, Linking, KeyboardAvoidingView } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Button, Screen, Text, TextField} from "../../components"
import { APP_SITE, APP_SITE_TITLE } from 'react-native-dotenv'
import styles from './style';

const heart = require("./heart.png")
const ocaLogo = require("./oca.png")

export interface AuthScreenProps extends NavigationScreenProps<{}> {}

export const AuthScreen: React.FunctionComponent<AuthScreenProps> = props => {
  const nextScreen = React.useMemo(() => () => props.navigation.navigate("demo"), [
    props.navigation,
  ])

  return (
    <View style={styles.FULL}>
      <Screen style={styles.CONTAINER} preset="scroll" backgroundColor={styles.color.transparent}>
        <Image source={ocaLogo} style={styles.AUTHLOGO} />
      </Screen>
      <SafeAreaView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-400} style={styles.KEYBOARD_AVOID}>
          <TextField
                  placeholderTx="auth_screen.server_placeholder"
                  // value={this.state.server}
                  // onChangeText={this.handleServerChange}
                  inputStyle={styles.INPUT_TEXT}
                />
          <TextField
                placeholderTx="auth_screen.user_name_placeholder"
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={styles.INPUT_TEXT}
                // value={this.state.user}
                // onChangeText={this.handleUserChange}
                // inputStyle={INPUTSTYLE}
              />
          <TextField
            placeholderTx="auth_screen.password_placeholder"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            inputStyle={styles.INPUT_TEXT}
            // value={this.state.password}
            // onChangeText={this.handlePasswordChange}
            // inputStyle={INPUTSTYLE}
          />
        </KeyboardAvoidingView>
        <View style={styles.FOOTER_CONTENT}>
          <Button
            style={styles.AUTH}
            textStyle={styles.AUTH_TEXT}
            tx="auth_screen.auth"
            onPress={nextScreen}
          />
          <Button
            style={styles.AUTHOR}
            onPress={() => {
              Linking.openURL(APP_SITE);
            }}
          >
            <Text style={styles.LOVE} text="Made with" />
            <Image source={heart} style={styles.HEART} />
            <Text style={styles.LOVE} text={APP_SITE_TITLE} />
          </Button>
        </View>
      </SafeAreaView>
    </View>
  )
}
