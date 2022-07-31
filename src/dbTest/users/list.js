const Users = require("../../../database/dbTeste/users")

module.exports = require('express').Router().get(`/users`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      all = req.query.all ? req.query.all == "true" : false,
      resultFindAll = await Users.findAll({ all }),
      resultFindAllFormat = resultFindAll?.data && resultFindAll.data.map(user => {
        const userTemp = { ...user }
        delete userTemp.password
        return userTemp
      })
    
    if(!resultFindAll.success) throw ({
      message: resultFindAll.message,
      status: 400
    })

    result = resultFindAllFormat
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
