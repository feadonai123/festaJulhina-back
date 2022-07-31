const jwt = require("../../utils/jwt")
const Users = require("../../database/dbTeste/users")

module.exports = require('express').Router().get(`/checkToken/:token`, async (req, res) => {

  let status = 400, message = undefined, result = undefined
  try{
    const token = req.params.token

    const tokenData = jwt.lerToken(token)
    if(!tokenData) throw new Error("Token invalido ou expirado")

    const 
      { userId } = tokenData,
      user = await Users.getFullUser({ _id: userId }),
      userData = user?.data || null

    if(!user.success) throw new Error(`Falha ao consultar usuário no banco: ${user.message}`)
    if(!userData) throw new Error(`Usuário não encontrado`)

    const userResponse = { ...userData }
    delete userResponse.password

    result = userResponse
    status = 200
  }catch(e){
    message = e.message
    status = e.status || 500
  }

  return res.status(status).json({
    success: status == 200,
    message,
    result
  })
})
