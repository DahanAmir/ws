
const jFile = require('jsonfile');

const getUserData = () =>
{
    return new Promise((resolve, reject) =>
    {
        jFile.readFile("./Data/users.json", function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
   
}

const writeUserData = (users) =>
{
    return new Promise((resolve, reject) =>
    {
        jFile.writeFile("./Data/users.json",users, function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
   
}

module.exports = {getUserData,writeUserData}