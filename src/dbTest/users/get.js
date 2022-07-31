const Users = require("../../../database/dbTeste/users")

module.exports = require('express').Router().get(`/users/:id`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      id = req.params.id,
      resultGetFullUser = await Users.getFullUser({ _id: id })
      resultData = resultGetFullUser?.data ? resultGetFullUser.data : null
    
    if(!resultGetFullUser.success) throw ({
      message: resultGetFullUser.message,
      status: 400
    })

    const userResponse = { ...resultData }
    delete userResponse.password

    result = userResponse
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
