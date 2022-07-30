const Categories = require("../../../database/dbTeste/categories")

module.exports = require('express').Router().delete(`/categories/:id`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const id = req.params.id
      
    const resultUpdated = await Categories.updateOne({ _id: id }, { deleted_at: Date.now().toString() })
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
