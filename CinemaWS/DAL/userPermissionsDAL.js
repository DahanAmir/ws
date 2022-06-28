const jFile = require("jsonfile");

const getUserPermissions = () => {
  return new Promise((resolve, reject) => {
    jFile.readFile("./Data/ermissions.json", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeUserPermissions = (permissions) => {
  return new Promise((resolve, reject) => {
    jFile.writeFile(
      "./Data/ermissions.json",
      permissions,
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

module.exports = { getUserPermissions, writeUserPermissions };
