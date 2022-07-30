const mongoose = require('mongoose')

const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now().toString(),
    set: ()=>Date.now().toString()
  },
  created_at: {
    type: Date,
    default: Date.now().toString()
  },
  deleted_at: {
    type: Date,
    default: null
  },
})

module.exports = CategoriesSchema

