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

const parseUrl = url => {
  if (!url.includes('http')) {
    url = 'https://' + url;
  }
  let urlParsed = url_api.parse(url);
  const hostname = urlParsed.hostname;
  const protocol = urlParsed.protocol.replace(':', '');

  urlParsed.port = protocol === 'https' ? 443 : 80;
  const completeUrl = urlParsed.href.replace(urlParsed.path, '/');
  const backendUrl = completeUrl + 'web';

  return {
    hostname,
    port: urlParsed.port,
    protocol,
    completeUrl,
    backendUrl,
  };
};

const createOdooService = (url, user, password) => {
  const {hostname, port, protocol, backendUrl, completeUrl} = parseUrl(url);

  const odoo = new Odoo({
    host: hostname,
    port: port,
    username: user,
    password: password,
    protocol: protocol,
  });

  const getDatabases = async () => {
    try {
      const res = await odoo.rpc_call('/web/database/list', {});
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const connect = async db => {
    odoo.database = db;
    try {
      const res = await odoo.connect();
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getDatabases,
    connect,
    ...parseUrl(url),
  };
};

export default createOdooService;
