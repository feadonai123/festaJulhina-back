const jwt = require("../../utils/jwt")
const Users = require("../../database/dbTeste/users")
const Roles = require("../../database/dbTeste/roles")

const routes = [
  {
    method: 'POST',
    regex: /^\/dbTest\/users\/$/
  },
  {
    method: 'POST',
    regex: /^\/dbTest\/roles\/$/
  },
  {
    method: 'GET',
    regex: /^\/dbTest\/roles\/$/
  },
  {
    method: 'POST',
    regex: /^\/dbTest\/adminPages\/$/
  },
  {
    method: 'GET',
    regex: /^\/dbTest\/adminPages\/$/
  },
  {
    method: 'GET',
    regex: /^\/dbTest\/users\/$/
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

    const tokenData = jwt.lerToken(token)
    if(!tokenData) throw new Error("Token invalido ou expirado")

    const { userId } = tokenData

    const 
      user = await Users.findOne({ _id: userId }),
      userData = user?.data || null,
      roleRoot = await Roles.findOne({ name: "root" }),
      roleRootData = roleRoot?.data || null,
      roleRootId = roleRootData?._id ? roleRootData._id.toString() : null

    if(!roleRoot.success) throw new Error(`Falha ao consultar regra de usuário no banco: ${roleRoot.message}`)
    if(!user.success) throw new Error(`Falha ao consultar usuário no banco: ${user.message}`)
    if(!userData) throw new Error(`Usuário ou senha inválidos`)
    if(userData.roles.indexOf(roleRootId) == -1) throw new Error(`Usuário não tem permissão para acessar este recurso`)

    auth = true
  }catch(e){
    console.log(e)
    message = e.message
  }

  if(auth) next()
  else return res.status(401).json({ message })
})
