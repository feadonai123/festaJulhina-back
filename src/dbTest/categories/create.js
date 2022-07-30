const Categories = require("../../../database/dbTeste/categories")
const Image = require("../../../utils/image")

module.exports = require('express').Router().post(`/categories`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      { name, image } = req.body,
      createdData = {
        name,
        image: "/public/images/default.png",
      }

    const resultCreated = await Categories.create(createdData)
    if(!resultCreated.success) throw ({
      message: resultCreated.message,
      status: 400
    })

    const
      categorieData = resultCreated.data
      id = categorieData._id.toString(),
      imagePath = await Image.uploadImage(image, `${id}.png`, "categories"),
      newData = {
        ...categorieData,
        image: imagePath
      }
    delete newData._id
    
    const resultUpdated = await Categories.updateOne({ _id: id }, newData)
    if(!resultUpdated.success) throw ({
      message: resultUpdated.message,
      status: 400
    })

    result = resultUpdated.data
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
