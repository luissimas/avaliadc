const crypto = require('crypto');

module.exports = {
  randomString() {
    return crypto.randomBytes(20).toString('hex');
  },

  // Retorna um inteiro aleatório entre 1 e 5
  randomNota() {
    return Math.floor(Math.random() * 5) + 1;
  },

  // Retorna aleatoriamente verdadeiro ou falso
  randomBool() {
    return Math.round(Math.random()) ? false : true;
  },
};
