const db = require("../config/db");

exports.createDonation = async (req, res) => {
  const {
    donor_name,
    phone,
    item_name,
    quantity,
    description,
  } = req.body;

  await db.query(
    `INSERT INTO donations
    (donor_name,phone,item_name,quantity,description)
    VALUES (?,?,?,?,?)`,
    [
      donor_name,
      phone,
      item_name,
      quantity,
      description,
    ]
  );

  res.status(201).json({
    message: "Donation submitted",
  });
};

exports.getDonations = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM donations"
  );

  res.json(rows);
};