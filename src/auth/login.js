const jwt = require("../../utils/jwt")

module.exports = require('express').Router().post(`/login`, async (req, res) => {

  // TODO verificar no banco se credenciais do usuário é valido
  let status = 400, message = undefined, result = undefined
  try{
    const 
      { username, password } = req.body

    if(!username || !password) throw ({
      message: "Usuário ou senha não informado",
      status: 400
    })

    const token = jwt.gerarToken({
      username
    })

    result = { token }
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
