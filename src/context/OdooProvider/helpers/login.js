/* eslint-disable no-alert */
import AsyncStorage from '@react-native-async-storage/async-storage';
import OdooApi from '../../../services/odoo';

export const login = async ({server, username, password}) => {
  try {
    const odoo_api = await new OdooApi(server, username, password);

    const database_list = await odoo_api.database_list;

    if (database_list && database_list.length) {
      const [database] = database_list;
      const connection = await odoo_api.connect(database);

      if (!connection) {
        alert('Could not connect to database');
      } else if (!connection.uid || typeof connection.uid !== 'number') {
        alert('No database found');
      }
      const imagem = await odoo_api.get_user_image(connection.uid);
      const res = {
        ...connection,
        backend_url: odoo_api.server_backend_url,
        avatar: imagem,
      };
      await AsyncStorage.setItem('session', JSON.stringify(res));
      return res;
    }
  } catch (error) {
    console.error(error);
  }
};
