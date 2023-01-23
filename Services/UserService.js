const client = require("../db/config");
module.exports = {
  create: (data, callback) => {
    client.query(
      `INSERT INTO users(name,email,password) VALUES ($1,$2,$3)`,
      [data.useremail, data.userpassword, data.firstname, data.lastname],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    client.query(
      `SELECT id,email,password,name  from users`,
      [],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result.rows);
      }
    );
  },
  getUserById: (id, callBack) => {
    client.query(
      `SELECT id,email,password,name from users where id = $1`,
      [id],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result.rows);
      }
    );
  },
  updateUser: (data, callBack) => {
    client.query(
      `UPDATE users set id =$1,email=$2,password=$3,name=$4  where id=$5`,
      [data.id,data.email, data.password, data.first_name, data.last_name, data.id],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result.rows);
      }
    );
  },
  deleteUser:(data,callBack)=>{
    client.query(
        `DELETE FROM users where id = $1`,
        [data.id],
        (err,result)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,result.rows)
        }
    )
  }
};
