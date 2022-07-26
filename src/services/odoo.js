import Odoo from 'react-native-odoo-promise-based';
const url_api = require('url');

//   // if (userToken !== undefined) {
//   //   const odoo = new Odoo({
//   //     host: 'mobile.kmee.com.br',
//   //     port: '443',
//   //     database: 'mobile',
//   //     // username: this.state.user,
//   //     // password: this.state.password,
//   //     sid: userToken,
//   //     protocol: 'https',
//   //   });
//   //   await odoo
//   //     .connect()
//   //     .then(response => {
//   //       console.log(userToken);
//   //       console.log(response);
//   //       console.log(response.data);
//   //       AsyncStorage.setItem('userToken', response.data.session_id);
//   //     })
//   //     .catch(e => {
//   //       console.log(e);
//   //     });
//   // }
// }

class OdooApi {
  constructor(url, login, password) {
    this.complete_url = url;
    this.login = login;
    this.password = password;
    this._parseURL();
    this.odoo = new Odoo({
      host: this.hostname,
      port: this.port,
      username: this.login,
      password: this.password,
      protocol: this.protocol,
    });
    this.database_list = [];
  }

  _parseURL() {
    if (!this.complete_url.includes('http')) {
      this.complete_url = 'https://' + this.complete_url;
    }
    var url = url_api.parse(this.complete_url);
    this.hostname = url.hostname;

    this.protocol = url.protocol.replace(':', '');

    if (url.port === null) {
      if (this.protocol === 'https') {
        this.port = 443;
      } else if (this.protocol === 'http') {
        this.port = 80;
      }
    } else {
      this.port = url.port;
    }
    this.server_complete_url = url.href.replace(url.path, '/');
    this.server_backend_url = this.server_complete_url + 'web';
  }

  get database_list() {
    return this._getDatabases();
  }

  _getDatabases() {
    return this.odoo
      .rpc_call('/web/database/list', {})
      .then(response => {
        if (response.success === true) {
          return response.data;
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  connect(database) {
    this.odoo.database = database;
    return this.odoo
      .connect()
      .then(response => {
        if (response.success === true) {
          return response.data;
        }
      })
      .catch(e => {
        return false;
      });
  }

  get_user_image(user_id) {
    return this.odoo
      .get('res.users', {
        ids: [user_id],
        fields: ['image_small'],
      })
      .then(response => {
        if (response.success === true) {
          return response.data[0].image_small;
        }
      })
      .catch(e => {
        return false;
      });
  }
}

export default OdooApi;
