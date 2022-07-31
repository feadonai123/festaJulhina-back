const mongoose = require('mongoose')

const RolesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  permissions:{
    type: [String],
    required: true
  },
  all: {
    type: Boolean,
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

module.exports = RolesSchema

