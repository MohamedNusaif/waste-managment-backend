const router = require("express").Router();
const {
  createDonation,
  getDonations
} = require("../controllers/donorController");

/**
 * @swagger
 * /api/donations:
 *   post:
 *     summary: Create donation
 *     tags: [Donations]
 */
router.post("/", createDonation);

/**
 * @swagger
 * /api/donations:
 *   get:
 *     summary: Get all donations
 *     tags: [Donations]
 */
router.get("/", getDonations);

module.exports = router;