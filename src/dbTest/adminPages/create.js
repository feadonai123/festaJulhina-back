const AdminPages = require("../../../database/dbTeste/adminPages")

module.exports = require('express').Router().post(`/adminPages`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      { name } = req.body, 
      createdData = {
        name
      }

    const resultCreated = await AdminPages.create(createdData)
    if(!resultCreated.success) throw ({
      message: resultCreated.message,
      status: 400
    })

    result = resultCreated.data
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
