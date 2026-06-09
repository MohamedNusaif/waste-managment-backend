const db = require("../config/db");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [users] = await db.query(
    "SELECT * FROM users WHERE email=?",
    [email]
  );

  if (users.length === 0) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const user = users[0];

  const match = await bcrypt.compare(
    password,
    user.password
  );

  if (!match) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  res.json({
    token: generateToken(user.id),
    user,
  });
};