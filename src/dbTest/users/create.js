const Users = require("../../../database/dbTeste/users")
const Roles = require("../../../database/dbTeste/roles")

const Image = require("../../../utils/image")
const Cripto = require("../../../utils/cripto")

module.exports = require('express').Router().post(`/users`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      username = req.body.username, 
      roles = req.body.roles,
      imageBody = req.body?.image || null,
      passwordCode = Cripto.genHash(6),
      passwordMd5 = Cripto.md5(passwordCode),
      createdData = {
        username,
        password : passwordMd5,
        roles,
        image: "/public/images/users/default.jpg"
      }

    if(!roles || roles.length == 0) throw ({
      status: 200,
      message: "É nescessario ao menos uma role para o usuário"
    })

    const listPromisse = roles.map(role => new Promise(async (resolve, reject)=>{
      const findedResult = await Roles.findOne({ _id: role })
      if(!findedResult.success) return reject({
        status: 500,
        message: findedResult.message
      })
      if(!findedResult.data) return reject({
        status: 400,
        message: `Role id: ${permission} não encontrada`
      })
      resolve()
    }))
    await Promise.all(listPromisse)

    const resultCreated = await Users.create(createdData)
    if(!resultCreated.success) throw ({
      message: resultCreated.message,
      status: 400
    })

    if(imageBody){
      const
        userData = resultCreated.data
        id = userData._id.toString(),
        imagePath = await Image.uploadImage(imageBody, `${id}.png`, "users"),
        newData = {
          ...userData,
          image: imagePath
        }
      delete newData._id
      
      const resultUpdated = await Users.updateOne({ _id: id }, newData)
      if(!resultUpdated.success) throw ({
        message: resultUpdated.message,
        status: 400
      })

      result = resultUpdated.data
    }else{
      result = resultCreated.data
    }

    result.password = passwordCode
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
