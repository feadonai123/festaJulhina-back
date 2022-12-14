const Products = require("../../../database/dbTeste/products")

module.exports = require('express').Router().get(`/products`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      all = req.query.all ? req.query.all == "true" : false,
      resultFindAll = await Products.findAll({ all })
    
    if(!resultFindAll.success) throw ({
      message: resultFindAll.message,
      status: 400
    })

    result = resultFindAll.data
    status = 200
  }catch(e){
    message = e.message
    status = e.status || 500
    console.log(e)
  }

  return res.status(status).json({
    success: status == 200,
    message,
    data: result
  })
})
