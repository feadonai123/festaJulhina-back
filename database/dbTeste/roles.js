const DB = require("../DB")

class Roles extends DB{

  constructor(){
    super("dbTeste", "roles")
  }

}

module.exports = new Roles()