const db = require("../config/db");

exports.getDashboardStats = async (req, res) => {
  try {
    const [[donations]] = await db.query(
      "SELECT COUNT(*) AS total FROM donations"
    );

    const [[pendingDonations]] = await db.query(
      "SELECT COUNT(*) AS total FROM donations WHERE status='PENDING'"
    );

    const [[requests]] = await db.query(
      "SELECT COUNT(*) AS total FROM requests"
    );

    const [[pendingRequests]] = await db.query(
      "SELECT COUNT(*) AS total FROM requests WHERE status='PENDING'"
    );

    res.json({
      success: true,
      data: {
        totalDonations: donations.total,
        pendingDonations: pendingDonations.total,
        totalRequests: requests.total,
        pendingRequests: pendingRequests.total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};