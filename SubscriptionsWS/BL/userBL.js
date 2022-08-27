const userDAL = require("../DAL/userDAL");


const login = async (username,password)  =>{
 let response= await userDAL.getUsers()
 let index=response.findIndex(x=>x.username==username&&x.password==password)
 if(index>-1)
 {
  return response[index]
 }
 return false


}
module.exports = {

  login,

};