const userDB = require("../DAL/userMDAL");
const userJsonDAL=require("../DAL/userJsonDAL");
const { now } = require("mongoose");

const getUsersDB = async () => {
  let usersData = await userDB.getUsers();
  return usersData;
};
const getUsersJson = async () => {
  let usersData = await userJsonDAL.getUserData();
  return usersData;
};


const postUsers = async (obj) => {
  let id=await userDB.createUser(obj)
  console.log(id);
  let promise=await userJsonDAL.getUserData()

  console.log(promise);
  let users=promise.users
  users.push({_id:id,name:obj.username,CreateDate:now(),expiresIn:"60m"})
  await userJsonDAL.writeUserData({"users":[users]})


  return id;
};

const login = async (obj) => {
  let usersData = await userDB.login(obj);
  usersData=usersData[0]
 let userjson=await userJsonDAL.getUserData()
 userjson=userjson.users
 userj=userjson.filter(x=>x._id==usersData._id)
 userj=userj[0]
user={_id:userj._id,
      username:usersData.username,
      password:usersData.password,
      SessionTimeOut:userj.SessionTimeOut
      }

 return user;

};


module.exports = {
  getUsersDB,
  login,
  postUsers,
  getUsersJson
  
};
