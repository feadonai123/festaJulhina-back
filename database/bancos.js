const categoriesModel = require('./dbTeste/models/categories')
const productsModel = require('./dbTeste/models/products')

module.exports = {
  dbTeste: [
    {
      name: "products",
      model: productsModel,
    },
    {
      name: "categories",
      model: categoriesModel,
    }
  ]
}