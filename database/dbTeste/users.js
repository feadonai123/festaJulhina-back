const DB = require("../DB")

class Users extends DB{

  constructor(){
    super("dbTeste", "users")
  }

}

module.exports = new Users()