const axios = require("axios");

const getNember = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};

module.exports = { getNember };
