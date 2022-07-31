const DB = require("../DB")
const AdminPages = require("./adminPages")

class Roles extends DB{

  constructor(){
    super("dbTeste", "roles")
  }

  async getFullListRoles(ids){
    let success = false, message = undefined, result = undefined
    try{
      const 
        listPromises = ids.map((id)=>new Promise(async (resolve, reject)=>{
          const 
            resultGetFullRole = await this.getFullRole(id),
            resultData = resultGetFullRole?.data ? resultGetFullRole.data : null

          if(!resultGetFullRole.success || !resultData) return reject({
            message: resultGetFullRole.message || `Falha ao coletar Role ${id} do banco`
          })
          resolve(resultData)
        })),
        resultData = await Promise.all(listPromises)

      result = resultData
      success = true
    }catch(e){
      message = e.message
      console.log(e)
    }
    
    return({
      success,
      message,
      data: result
    })
  }

  async getFullRole(id){
    let success = false, message = undefined, result = undefined
    try{
      const 
        resultGet = await this.findOne({ _id: id }),
        resultData = resultGet?.data ? resultGet.data : null
      
      if(!resultGet.success) throw new Error (resultGet.message)
  
      const 
        filter = resultData.all ? {} : { _id: resultData.permissions },
        permissions = await AdminPages.findAll({ filter }),
        permissionsData = permissions?.data ? permissions.data : null
  
      if(!permissions.success || !permissionsData) throw new Error(resultGet.message)
  
      result = { ...resultData,  permissions: permissionsData }
      success = true
    }catch(e){
      message = e.message
      console.log(e)
    }
    
    return({
      success,
      message,
      data: result
    })
  }

}

module.exports = new Roles()