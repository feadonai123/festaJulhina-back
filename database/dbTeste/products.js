const DB = require("../DB")

class Products extends DB{

  constructor(){
    super("dbTeste", "products")
  }

}

module.exports = new Products()