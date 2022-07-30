const jwt = require('jsonwebtoken');

module.exports = class JWT{

  static lerToken(token){
    let tokenData = null
    try{
      tokenData = jwt.verify(token, process.env.SECRET)
    }catch(e){}
    return tokenData
  }

  static gerarToken(data){
    const token = jwt.sign(data, process.env.SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION_MS
    });
    return token
  }
}
