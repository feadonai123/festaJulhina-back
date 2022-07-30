const DB = require("../DB")

class Products extends DB{

  constructor(){
    super("dbTeste", "categories")
  }

}

module.exports = new Products()