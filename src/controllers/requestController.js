const db = require("../config/db");

exports.createRequest = async (req, res) => {
  const {
    requester_name,
    phone,
    item_name,
    quantity,
    reason,
  } = req.body;

  await db.query(
    `INSERT INTO requests
    (requester_name,phone,item_name,quantity,reason)
    VALUES (?,?,?,?,?)`,
    [
      requester_name,
      phone,
      item_name,
      quantity,
      reason,
    ]
  );

  res.status(201).json({
    message: "Request submitted",
  });
};

exports.getRequests = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM requests"
  );

  res.json(rows);
};