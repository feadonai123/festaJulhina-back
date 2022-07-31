const dbConnect  = require("./connect");

module.exports = class DB {
  
  dbName = null
  collectionName = []
  db = null

  constructor(dbName, collectionName){
    this.dbName = dbName
    this.collectionName = collectionName
  }

  async connect(){
    if(!this.dbName || !this.collectionName) return
    const connection = await dbConnect(this.dbName)
    this.db = connection.model(this.collectionName)
  }
  
  async findOne(filter) {
    let success = false, result = undefined, message = undefined
    try{
      if(!this.db) await this.connect()
      const finded = await this.db.findOne(filter)
      result = finded ? finded.toObject() : null
      success = true
    }catch(e){
      message = e.message
    }
    return ({ success, data: result, message })
  }

  async create(data) {
    let success = false, result = undefined, message = undefined
    try{
      if(!this.db) await this.connect()
      const created = await this.db.create(data)
      result = created ? created.toObject() : null
      success = true
    }catch(e){
      message = e.message
    }
    return ({ success, data: result, message })
  }

  async updateOne(filter, data){
    let success = false, result = undefined, message = undefined
    try{
      if(!this.db) await this.connect()
      const updated = await this.db.findOneAndUpdate(filter, data, { new: true })
      result = updated ? updated.toObject() : null
      success = true
    }catch(e){
      message = e.message
    }
    return ({ success, data: result, message })
  }

  async findAll({ filter = {}, all = false }) {
    let success = false, result = undefined, message = undefined
    try{
      if(!this.db) await this.connect()

      let where = filter
      if(!all) where.deleted_at = null

      const finded = await this.db.find(where)
      result = finded ? finded.map(item=>item.toObject()) : null
      success = true
    }catch(e){
      message = e.message
    }
    return ({ success, data: result, message })
  }
}