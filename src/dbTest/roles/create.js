const Roles = require("../../../database/dbTeste/roles")
const AdminPages = require("../../../database/dbTeste/adminPages")

module.exports = require('express').Router().post(`/roles`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      name = req.body.name, 
      permissions = req.body?.permissions || [],
      isAll = req.body?.all || false,
      permissionsFormat = isAll ? [] : permissions
      createdData = {
        name,
        permissions: permissionsFormat,
        all: isAll
      }

    if(!isAll && permissionsFormat.length == 0) throw ({
      status: 200,
      message: "É nescessario ao menos uma permissão"
    })

    const listPromisse = !isAll ? permissionsFormat.map(permission => new Promise(async (resolve, reject)=>{
      const findedResult = await AdminPages.findOne({ _id: permission })
      if(!findedResult.success) return reject({
        status: 500,
        message: findedResult.message
      })
      if(!findedResult.data) return reject({
        status: 400,
        message: `Página id: ${permission} não encontrada`
      })
      resolve()
    })) : []

    await Promise.all(listPromisse)

    const resultCreated = await Roles.create(createdData)
    if(!resultCreated.success) throw ({
      message: resultCreated.message,
      status: 400
    })

    result = resultCreated.data
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
