const userModel = require("../mongooseSchema/userModel");
const findUser = async ()  =>{
  let data=userDAL.getUsers()
    var Users=[]
    console.log(data)

    data.forEach(x=>{
      let obj={ Password:x.data().Password, 
        UserName:x.data().UserName}
        Users.push(obj)
    })
return Users
}

const login1 = async (username,password)  =>{
  let data=await userDAL.getUsers()
    console.log(data)
   let index= data.findIndex( x=>x.data().password==password&&x.data().username==username)
   if(index>-1)
   {
    return {username:x.data().username ,password:x.data().password,id:x.data().id}
   }
      
return false
}

const getUsers = function (obj) {
  return new Promise((resolve, reject) => {
    userModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};


module.exports = {

  findUser,
  getUsers
};
