const db = require("../config/db");

// Create Request
exports.createRequest = async (req, res) => {
  try {
    const {
      requester_name,
      phone,
      item_name,
      quantity,
      reason,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO requests
      (requester_name, phone, item_name, quantity, reason)
      VALUES (?, ?, ?, ?, ?)`,
      [
        requester_name,
        phone,
        item_name,
        quantity,
        reason,
      ]
    );

    res.status(201).json({
      success: true,
      requestId: result.insertId,
      message: "Request submitted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Requests
exports.getRequests = async (req, res) => {
  try {

    const [rows] = await db.query(
      "SELECT * FROM requests ORDER BY created_at DESC"
    );

    res.status(200).json({
      success: true,
      data: rows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Request By ID
exports.getRequestById = async (req, res) => {
  try {

    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM requests WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
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

// Approve Request
exports.approveRequest = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      "UPDATE requests SET status='APPROVED' WHERE id=?",
      [id]
    );

    res.json({
      success: true,
      message: "Request approved",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject Request
exports.rejectRequest = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      "UPDATE requests SET status='REJECTED' WHERE id=?",
      [id]
    );

    res.json({
      success: true,
      message: "Request rejected",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Fulfill Request
exports.fulfillRequest = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      "UPDATE requests SET status='FULFILLED' WHERE id=?",
      [id]
    );

    res.json({
      success: true,
      message: "Request fulfilled",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Request
exports.deleteRequest = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM requests WHERE id=?",
      [id]
    );

    res.json({
      success: true,
      message: "Request deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};