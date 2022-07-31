const mongoose = require('mongoose')

const AdminPagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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

module.exports = AdminPagesSchema

