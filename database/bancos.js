const categoriesModel = require('./dbTeste/models/categories')
const productsModel = require('./dbTeste/models/products')
const usersModel = require('./dbTeste/models/users')
const rolesModel = require('./dbTeste/models/roles')
const adminPagesModel = require('./dbTeste/models/adminPages')

module.exports = {
  dbTeste: [
    {
      name: "products",
      model: productsModel,
    },
    {
      name: "categories",
      model: categoriesModel,
    },
    {
      name: "users",
      model: usersModel,
    },
    {
      name: "roles",
      model: rolesModel,
    },
    {
      name: "adminPages",
      model: adminPagesModel,
    }
  ]
}