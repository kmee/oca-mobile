import * as React from "react"
import { View, Image, SafeAreaView, Linking, KeyboardAvoidingView } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Button, Screen, Text, TextField } from "../../components"
import { APP_SITE, APP_SITE_TITLE } from 'react-native-dotenv'
import { Database, DatabaseModel } from "../../models/database"
import styles from './style';
import reactotron from 'reactotron-react-native'
import { types, getSnapshot } from "mobx-state-tree"
import any from "ramda/es/any"
import { DatabaseStoreModel, DatabaseStore } from "../../models/database-store"
import { persist } from 'mst-persist'
import { AsyncStorage } from 'react-native';
import { toIdentifier } from "@babel/types"

const heart = require("./heart.png");
const ocaLogo = require("./oca.png");

export interface AuthScreenProps extends NavigationScreenProps<{}> {
  firstName: string;
}

export const AuthScreen: React.FunctionComponent<AuthScreenProps> = props => {
  const state = {
    server_url: '',
    database: '',
    version: '',
    user_name: '',
    token: '',
    user_password: '',
  };

  reactotron.log('hello rendering world (;');
  reactotron.display({
    name: 'KNOCK KNOCK',
    preview: 'Who\'s there?',
    value: 'Orange.'
  })
  function addDatabase(this: any) {
    console.log(this.server_url);
    const payload = {
      id: state.server_url,
      server_url: state.server_url,
      user_name: state.user_name,
      user_password: state.user_password,
    };
    const db = DatabaseModel.create(payload);


    const dbStore = getOrCreateDatabaseStore(db).then((dbStore: DatabaseStore) => {
      // AsyncStorage.setItem('dbStore', '');
      dbStore.addToDatabases(db);
      dbStore.setCurrent(db);
      console.log("estou printando dbstore ---> ", JSON.stringify(dbStore));
      AsyncStorage.setItem('dbStore', JSON.stringify(dbStore));
    });


    // persist('dbStore', dbStore, { storage: AsyncStorage }).then(() => console.log('someStore has been hydrated'))

    // IMPORT USER STORAGE
    // const db = Database.create(payload);
    // console.log(Database.create());
    console.log(payload)
    // DECLARE USER STORAGE
    // const db = rootStore.currentDB
    // console.log(db)

    // const database = db.create({
    //   server_url: state.server_url,
    //   user_name: state.user_name,
    //   user_password: state.user_password,
    // });
  };

  async function getOrCreateDatabaseStore(newDB: Database) {
    let value: any = await AsyncStorage.getItem('dbStore');
    value = value !== '{}' ? JSON.parse(value) : undefined;
    if (value) {
      console.log('VALUE', JSON.stringify(value));
      const dbs = [];
      console.log(JSON.stringify(value.databases));
      console.log(value.databases.length);
      // if (value.databases.length) {
      if (value.databases && value.databases.length > 0) {
        value.databases.forEach(db => {
          if (db.id != newDB.id) {
            dbs.push(DatabaseModel.create(db));
          }
        });
        const db = DatabaseStoreModel.create({ databases: dbs, currentDB: dbs.find(item => item.id === value.currentDB) });
        console.log(db);
        console.log(newDB);
        return db;
      }

      return DatabaseStoreModel.create();
    } else {
      return DatabaseStoreModel.create();
    }
  }

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
            name="username"
            inputStyle={styles.INPUT_TEXT}
            onChangeText={(text: string) => state.server_url = text}
          />
          <TextField
            placeholderTx="auth_screen.user_name_placeholder"
            autoCapitalize="none"
            autoCorrect={false}
            inputStyle={styles.INPUT_TEXT}
            // value={this.state.user}
            onChangeText={(text: string) => state.user_name = text}
          // inputStyle={INPUTSTYLE}
          />
          <TextField
            placeholderTx="auth_screen.password_placeholder"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            inputStyle={styles.INPUT_TEXT}
            // value={this.state.password}
            onChangeText={(text: string) => state.user_password = text}
          // inputStyle={INPUTSTYLE}
          />
        </KeyboardAvoidingView>
        <View style={styles.FOOTER_CONTENT}>
          <Button
            style={styles.AUTH}
            textStyle={styles.AUTH_TEXT}
            tx="auth_screen.auth"
            onPress={addDatabase}
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
