const jwt = require("../../utils/jwt")

const routes = [
  {
    method: 'PATCH',
    regex: /^\/dbTest\/collection1\/(.+?)(?<=\/)$/
  }
]

module.exports = require('express').Router().use('/', async (req, res, next) => {
  // TODO verificar no banco se tokenData é valido
  const 
    { method, path } = req,
    pathFormated = path + '/',
    isProtected = routes.find(route=>route.method == method && pathFormated.match(route.regex))
  if(!isProtected) return next()

  let auth = false, message = undefined
  try{
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) throw new Error("Não autorizado")

    const tokenData = jwt.lerToken()
    if(!tokenData) throw new Error("Token invalido ou expirado")

    auth = true
  }catch(e){
    message = e.message
  }

  if(auth) next()
  else return res.status(401).json({ message })
})
