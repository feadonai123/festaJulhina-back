module.exports = [
  require("../dbTest/products/create"),
  require('../dbTest/products/update'),
  require('../dbTest/products/delete'),
  require('../dbTest/products/get'),
  require('../dbTest/products/list'),

  require("../dbTest/categories/create"),
  require('../dbTest/categories/update'),
  require('../dbTest/categories/delete'),
  require('../dbTest/categories/get'),
  require('../dbTest/categories/list'),

  require("../dbTest/users/create"),
  require("../dbTest/users/list"),

  require("../dbTest/roles/create"),
  require("../dbTest/roles/list"),

  require("../dbTest/adminPages/create"),
  require("../dbTest/adminPages/list")
  
]