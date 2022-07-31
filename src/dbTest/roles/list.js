const Roles = require("../../../database/dbTeste/roles")

module.exports = require('express').Router().get(`/roles`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      all = req.query.all ? req.query.all == "true" : false,
      resultFindAll = await Roles.findAll(all)
    
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
