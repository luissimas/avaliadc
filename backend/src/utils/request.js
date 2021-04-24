const axios = require('axios').create({
  baseURL: 'http://localhost:3333',
});

module.exports = {
  request(url, method, data) {
    return axios({ url, method, data, validateStatus: false });
  },
};
