const Roles = require("../../../database/dbTeste/roles")

module.exports = require('express').Router().get(`/roles/:id`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      id = req.params.id,
      resultGetFullRole = await Roles.getFullRole(id)
      resultData = resultGetFullRole?.data ? resultGetFullRole.data : null
    
    if(!resultGetFullRole.success) throw ({
      message: resultGetFullRole.message,
      status: 400
    })

    result = resultData
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
