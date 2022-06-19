const userDB = require("../DAL/userMDAL");
const userJsonDAL=require("../DAL/userJsonDAL")

const getUsers = async () => {
  let usersData = await userDB.getUsers();
  return usersData;
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
  getUsers,
  login,
};
