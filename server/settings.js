var path = require('path');


module.exports = {
  server: {
    port: 3000,
    distFolder: path.resolve(__dirname, '../client/dist'),
    staticUrl: '/static',
    cookieSecret: 'your secret here'
  }
};
