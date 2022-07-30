const Categories = require("../../../database/dbTeste/categories")
const Image = require("../../../utils/image")

module.exports = require('express').Router().patch(`/categories/:id`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      { name, description, image, value } = req.body,
      newImage = image ? image.replace("http://localhost:1234", "") : undefined,
      id = req.params.id

    const resultGet = await Categories.findOne({ _id: id })
    if(!resultGet.success) throw ({
      message: resultGet.message,
      status: 400
    })
  
    let updatedData = {
      name,
      description,
      image: newImage, 
      value
    }

    if(updatedData.image && resultGet.data.image != updatedData.image){
      const imagePath = await Image.uploadImage(updatedData.image, `${id}.png`, "categories")
      updatedData.image = imagePath
    }

    const newData = {
      ...resultGet.data,
      ...updatedData,
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
