const db = require("../config/db");
const bcrypt = require("bcrypt");

const User = {
  async create(username, email, password) {
    const hashedpassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at";
    const values = [username, email, hashedpassword];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async findByUsernameOrEmail(usernameOrEmail) {
    const query = "SELECT * FROM users WHERE username = $1 OR email = $1";
    const result = await db.query(query, [usernameOrEmail]);
    return result.rows[0];
  },

  async findById(id) {
    const query =
      "SELECT id, username, email, created_at FROM users WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  async usernameExists(username) {
    const query = "SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)";
    const result = await db.query(query, [username]);
    return result.rows[0].exists;
  },
  async emailExists(email) {
    const query = "SELECT EXISTS(SELECT 1 FROM users WHERE email =$1)";
    const result = await db.query(query, [email]);
    return result.rows[0].exists;
  },
};

module.exports = User;
