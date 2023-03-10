const {
    create,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
  } = require("../Services/UserService");
  const { genSaltSync, hashSync } = require("bcrypt");
  const { validate } = require("../Validation/Validate");
  const client = require("../db/config");
  
  module.exports = {
    createUser:async (req, res) => {
      const { name,email, password, confirmpassword } = req.body;
    
      let errors = validate(req.body);
      if (errors.length > 0) {
        res.send(errors);
      } else {
        try {
          const existingUser = await client.query(
            "SELECT id, email, password,name FROM users u WHERE u.email=$1",
            [email.toLowerCase()]
          );
          if (existingUser.rowCount > 0) {
            errors.push({ message: "Email already registered!!!" });
            res.send(errors);
          } else {
            const salt = genSaltSync(10);
            const passwordString = password.toString();
            const hashedPassword = hashSync(passwordString, salt);
            client.query(
                `INSERT INTO users(name,email,password) VALUES ($1,$2,$3) RETURNING  id,email,name`,
              [
                name.toLowerCase(),
                email.toLowerCase(),
                hashedPassword
                
              ],
              (error, results) => {
                if (error) {
                  throw error;
                }
                res.send({
                  id: results.rows[0].id,
                  email: email,
                  name: results.rows[0].name,
                  isRegistered: true,
                });
                return results;
              }
            );
          }
        } catch (error) {}
      }
    },
    getUserById: (req, res) => {
      const id = req.params.id;
      console.log(id);
      getUserById(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record Not Found",
          });
        }
        return res.json({
          success: 1,
          data: results,
        });
      });
    },
    getUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results,
        });
      });
      },
    updateUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      const passwordString = body.password.toString();
      body.password = hashSync(passwordString, salt);
      updateUser(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database Connection Error",
          });
        }
        return res.status(200).json({
          success: 1,
          data: "Update Successfully...",
        });
      });
    },
    deleteUser: (req, res) => {
      const data = req.body;
      deleteUser(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database Connection Error",
          });
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record Not Found",
          });
        }
        return res.status(200).json({
          success: 1,
          data: "User Deleted Successfully",
        });
      });
    },
  };
  