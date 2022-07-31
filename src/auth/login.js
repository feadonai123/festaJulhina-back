const jwt = require("../../utils/jwt")
const Users = require("../../database/dbTeste/users")
const Cripto = require("../../utils/cripto")

module.exports = require('express').Router().post(`/login`, async (req, res) => {

  let status = 400, message = undefined, result = undefined
  try{
    const 
      { username, password } = req.body,
      passwordMD5 = Cripto.md5(password)

    if(!username || !password) throw ({
      message: "Usuário ou senha não informado",
      status: 400
    })

    const user = await Users.findOne({ username, password: passwordMD5 })
    if(!user.success) throw ({
      message: `Falha ao consultar usuário no banco: ${user.message}`,
      status: 500
    })
    if(!user.data)throw ({
      message: `Usuário ou senha inválidos`,
      status: 400
    })

    const token = jwt.gerarToken({
      userId: user.data._id,
    })

    const userResponse = { ...user.data }
    delete userResponse.password

    result = { token, user: userResponse }
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
