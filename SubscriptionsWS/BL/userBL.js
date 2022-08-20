const userDB = require("../DAL/userMDAL");

const getUsersDB = async () => {
  let usersData = await userDB.getUsers();
  return usersData;
};

const postUsers = async (obj) => {
  let id = await userDB.createUser(obj);
  return id;
};

const login = async (username, password) => {
  let users = await userDB.getUsers();
  console.log(users);

  let index = users.findIndex(
    (x) => x.username == username && x.password == password
  );
  if (index >= 0) {
    return users[index];
  }

  return false;
};

module.exports = {
  getUsersDB,
  login,
  postUsers,
};
