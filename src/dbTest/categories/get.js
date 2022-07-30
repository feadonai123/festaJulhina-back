const Categories = require("../../../database/dbTeste/categories")

module.exports = require('express').Router().get(`/categories/:id`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      id = req.params.id,
      resultGet = await Categories.findOne({ _id: id })
    
    if(!resultGet.success) throw ({
      message: resultGet.message,
      status: 400
    })

    result = resultGet.data
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
