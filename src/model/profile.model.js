const Pool = require("../config/db");

const getProfile = ({ id }) => {
  return Pool.query("SELECT * FROM users WHERE id=$1", [id]);
};


module.exports = {
  getProfile,
};
