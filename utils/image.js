const fs = require('fs')
const path = require('path')
const pathImages = "/public/images"

module.exports = class Image{
  static async uploadImage(base64, name, folder){
    const 
      completePath = path.resolve(__dirname, '..' + pathImages, folder, name),
      buff = Buffer.from(base64.split(',')[1], 'base64');
    fs.writeFileSync(completePath, buff);
    return `${pathImages}/${folder}/${name}`
  }

  static async deleteImage(patch){
    const completePath = path.resolve(__dirname, '..' + patch)
    if(!fs.existsSync(completePath)) return
    fs.unlinkSync(completePath)
  }
}