const Products = require("../../../database/dbTeste/products")
const Image = require("../../../utils/image")

module.exports = require('express').Router().patch(`/products/:id`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      { name, description, image, categorie, value } = req.body,
      newImage = image ? image.replace("http://localhost:1234", "") : undefined,
      id = req.params.id

    const resultGet = await Products.findOne({ _id: id })
    if(!resultGet.success) throw ({
      message: resultGet.message,
      status: 400
    })
  
    let updatedData = {
      name,
      description,
      categorie,
      image: newImage, 
      value
    }

    if(updatedData.image && resultGet.data.image != updatedData.image){
      const imagePath = await Image.uploadImage(updatedData.image, `${id}.png`, "products")
      updatedData.image = imagePath
    }

    const newData = {
      ...resultGet.data,
      ...updatedData,
    }
    delete newData._id
      
    const resultUpdated = await Products.updateOne({ _id: id }, newData)
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
