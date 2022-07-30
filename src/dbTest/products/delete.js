const Products = require("../../../database/dbTeste/products")

module.exports = require('express').Router().delete(`/products/:id`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const id = req.params.id
      
    const resultUpdated = await Products.updateOne({ _id: id }, { deleted_at: Date.now().toString() })
    if(!resultUpdated.success) throw ({
      message: resultUpdated.message,
      status: 400
    })

    result = resultUpdated.data
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
