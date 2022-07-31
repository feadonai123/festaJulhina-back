const crypto = require('crypto');

module.exports = class Hash{

  static genHash(length){
    let randomCode = (Math.random() + 1).toString(16).substring(length);
    return randomCode
  }

  static md5(string){
    return crypto.createHash('md5').update(string).digest('hex')
  }
}
