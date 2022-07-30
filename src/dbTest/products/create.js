const Products = require("../../../database/dbTeste/products")
const Image = require("../../../utils/image")

module.exports = require('express').Router().post(`/products`, async (req, res) => {
  let status = 400, message = undefined, result = undefined
  try{
    const 
      { name, description, categorie, image, value } = req.body,
      createdData = {
        name,
        description,
        categorie,
        image: "/public/images/default.png",
        value
      }

    const resultCreated = await Products.create(createdData)
    if(!resultCreated.success) throw ({
      message: resultCreated.message,
      status: 400
    })

    const
      productData = resultCreated.data
      id = productData._id.toString(),
      imagePath = await Image.uploadImage(image, `${id}.png`, "products"),
      newData = {
        ...productData,
        image: imagePath
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
