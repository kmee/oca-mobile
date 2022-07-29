import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import createOdooService from '../../../services/odoo';

export const login = async ({server, username, password}) => {
  try {
    const odoo = createOdooService(server, username, password);
    const databases = await odoo.getDatabases();
    const [database] = databases;

    const connection = await odoo.connect(database);

    if (!connection) {
      Alert.alert('Could not connect to database');
    } else if (!connection.uid || typeof connection.uid !== 'number') {
      Alert.alert('Invalid UID');
    }

    const res = {
      ...connection,
      backend_url: odoo.backendUrl,
      hostname: odoo.hostname,
      avatar: null,
    };

    await AsyncStorage.setItem('session', JSON.stringify(res));

    return res;
  } catch (error) {
    console.error(error);
  }
};
