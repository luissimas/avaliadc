const crypto = require('crypto');

module.exports = {
  randomString() {
    return crypto.randomBytes(20).toString('hex');
  },

  // Retorna um inteiro aleatório dentro do intervalo (inclusivo)
  randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // Retorna aleatoriamente verdadeiro ou falso
  randomBool() {
    return Math.round(Math.random()) ? false : true;
  },
};
