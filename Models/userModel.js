const client = require("../db/config");

module.exports = class UserModel {
  async getUserByEmail(email) {
    try {
      const statement = `SELECT *
                             FROM users
                             WHERE email = $1`;
      const values = [email];
      const result = await client.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async getUserById(id) {
    try {
      const statement = `SELECT *
                               FROM users
                               WHERE id = $1`;
      const values = [id];
      const result = await client.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
};
