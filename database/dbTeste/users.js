const DB = require("../DB")
const Roles = require("./roles")

class Users extends DB{

  constructor(){
    super("dbTeste", "users")
  }

  async getFullUser(filter){
    let success = false, message = undefined, result = undefined
    try{
      const 
        resultGet = await this.findOne(filter),
        resultData = resultGet?.data ? resultGet.data : null
      
      if(!resultGet.success) throw new Error (resultGet.message)
      if(!resultData){
        result = null
      }else{
        const
          rolesList = resultData.roles,
          resultGetRoles = await Roles.getFullListRoles(rolesList),
          resultGetRolesData = resultGetRoles?.data ? resultGetRoles.data : null

        if(!resultGetRoles.success || !resultGetRolesData) throw new Error(resultGetRoles.message)

        result = { ...resultData,  roles: resultGetRolesData }
      }
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

module.exports = new Users()