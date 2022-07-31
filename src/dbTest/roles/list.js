const roles = require("../../../database/dbTeste/roles")
const Roles = require("../../../database/dbTeste/roles")

module.exports = require('express').Router().get(`/roles`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      all = req.query.all ? req.query.all == "true" : false,
      resultFindAll = await Roles.findAll({ all })

    if(!resultFindAll.success) throw ({
      message: resultFindAll.message,
      status: 400
    })

    const 
      listIds = resultFindAll.data.map(role => role._id),
      resultFindFullAll = await Roles.getFullListRoles(listIds)
    
    if(!resultFindFullAll.success) throw ({
      message: resultFindFullAll.message,
      status: 400
    })

    result = resultFindFullAll.data
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
