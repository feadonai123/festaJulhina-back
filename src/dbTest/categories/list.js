const Categories = require("../../../database/dbTeste/categories")

module.exports = require('express').Router().get(`/categories`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      all = req.query.all ? req.query.all == "true" : false,
      resultFindAll = await Categories.findAll({ all })
    
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
