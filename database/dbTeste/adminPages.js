const DB = require("../DB")

class AdminPages extends DB{

  constructor(){
    super("dbTeste", "adminPages")
  }

}

module.exports = new AdminPages()