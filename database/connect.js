const mongoose = require('mongoose')
const bancos = require("./bancos")

const uri = process.env.MONGO_DB_STR

let cached = global.mongoose
let conn = global.mongoCon

const dbNames = Object.keys(bancos)

if (!cached) {
  let cachedFormat = []
  dbNames.map(name=>cachedFormat[name]={ conn: null })
  cached = cachedFormat
  global.mongoose = cachedFormat
}

async function dbConnect(dbName) {
    
  let current = cached[dbName]
  if (current.conn) return cached[dbName].conn

  const opts = {
    bufferCommands: false,
  }

  if(!conn){
    conn = mongoose.createConnection(uri, opts)
    global.mongoCon = conn

    await new Promise(resolve=>{
      conn.once('open', () => {
        console.log('MONGODB Connected')
        resolve()
      });
    })
  }

  current.conn = conn.useDb(dbName)
  bancos[dbName].forEach(({ name, model })=>{
    current.conn.model(name, model)
  })
  global.mongoose[dbName] = { conn : current.conn}
  return current.conn
}

module.exports = dbConnect