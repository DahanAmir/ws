const userDB = require("../DAL/userMDAL");
const userJsonDAL = require("../DAL/userJsonDAL");

const permissionsDAL = require("../DAL/userPermissionsDAL");
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
  let id = await userDB.createUser(obj);
  let userJson = await userJsonDAL.getUserData();
  let users = userJson.users;
  let user = {
    _id: id,
    Fname: obj.username,
    Lname:'',
    CreateDate: now().toLocaleDateString("he-IL"),
    expiresIn: "60m",
  };
  users.push(user);
  await userJsonDAL.writeUserData({ users: users });
  let permissionsData = await permissionsDAL.getUserPermissions();
  let permissions = permissionsData.Permissions;
  let userPermissions = {
    id: id,
    Permissions: [],
  };
  permissions.push(userPermissions);
  await permissionsDAL.writeUserPermissions({ Permissions: permissions });

  return id;
};

const login = async (obj) => {
  let usersData = await userDB.login(obj);
  console.log(usersData);
  usersData = usersData[0];
  let userjson = await userJsonDAL.getUserData();
  userjson = userjson.users;
  userj = userjson.filter((x) => x._id == usersData._id);
  userj = userj[0];
  user = {
    _id: userj._id,
    username: usersData.username,
    password: usersData.password,
    SessionTimeOut: userj.SessionTimeOut,
  };

  return user;
};
const getUserId = async (id) => {
  let user={}
  user.id=id
  let usersData = await userDB.getUsers();
  let usermongo = usersData.find((x) => x._id == id);
  user.username=usermongo.username
  let userjson = await userJsonDAL.getUserData();
  userjson = userjson.users;
  userj = userjson.find((x) => x._id == id);
  user.Fname=userj.Fname
  user.Lname=userj.Lname
  user.CreateDate=userj.CreateDate
  user.SessionTimeOut=userj.SessionTimeOut
  let permissionsData = await permissionsDAL.getUserPermissions();
  let permissions = permissionsData.Permissions;
  permissionsUser=permissions.find(x=>x.id=id)
  user.Permissions=permissionsUser.Permissions
  return user;
};

module.exports = {
  getUsersDB,
  login,
  postUsers,
  getUsersJson,
  getUserId,
};
