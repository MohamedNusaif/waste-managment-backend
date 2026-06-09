const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      role
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `
      INSERT INTO users
      (name,email,password,role)
      VALUES (?,?,?,?)
      `,
      [
        full_name,
        email,
        hashedPassword,
        role || "STAFF"
      ]
    );

    res.status(201).json({
      success: true,
      userId: result.insertId,
      message: "User created successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getUsers = async (req, res) => {
  try {

    const [users] = await db.query(
      `
      SELECT
      id,
      name,
      email,
      role,
      created_at
      FROM users
      `
    );

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getUserById = async (req, res) => {

  const { id } = req.params;

  const [user] = await db.query(
    `
    SELECT
    id,
    name,
    email,
    role
    FROM users
    WHERE id=?
    `,
    [id]
  );

  if (!user.length) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.json(user[0]);
};

exports.updateUser = async (req, res) => {

  const { id } = req.params;

  const {
    full_name,
    email,
    role
  } = req.body;

  await db.query(
    `
    UPDATE users
    SET
      name=?,
      email=?,
      role=?
    WHERE id=?
    `,
    [
      full_name,
      email,
      role,
      id
    ]
  );

  res.json({
    success: true,
    message: "User updated"
  });
};

exports.deleteUser = async (req, res) => {

  const { id } = req.params;

  await db.query(
    `
    DELETE FROM users
    WHERE id=?
    `,
    [id]
  );

  res.json({
    success: true,
    message: "User deleted"
  });
};