const db = require("../config/db");

// Create Donation
exports.createDonation = async (req, res) => {
  try {
    const {
      donor_name,
      phone,
      item_name,
      quantity,
      description,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO donations
      (donor_name, phone, item_name, quantity, description)
      VALUES (?, ?, ?, ?, ?)`,
      [
        donor_name,
        phone,
        item_name,
        quantity,
        description,
      ]
    );

    res.status(201).json({
      success: true,
      donationId: result.insertId,
      message: "Donation submitted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Donations
exports.getDonations = async (req, res) => {
  try {

    const [rows] = await db.query(
      "SELECT * FROM donations ORDER BY created_at DESC"
    );

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Donation By ID
exports.getDonationById = async (req, res) => {
  try {

    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM donations WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve Donation
exports.approveDonation = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      "UPDATE donations SET status='APPROVED' WHERE id=?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Donation approved successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject Donation
exports.rejectDonation = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      "UPDATE donations SET status='REJECTED' WHERE id=?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Donation rejected successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark as Distributed
exports.markDistributed = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      "UPDATE donations SET status='DISTRIBUTED' WHERE id=?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Donation marked as distributed",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Donation
exports.deleteDonation = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM donations WHERE id=?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Donation deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};