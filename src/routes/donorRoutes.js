const express = require("express");
const router = express.Router();

const {
  createDonation,
  getDonations,
  getDonationById,
  approveDonation,
  rejectDonation,
  markDistributed,
  deleteDonation,
} = require("../controllers/donorController");

/**
 * @swagger
 * tags:
 *   name: Donations
 *   description: Donation Management APIs
 */

/**
 * @swagger
 * /api/donations:
 *   post:
 *     summary: Create a donation
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - donor_name
 *               - phone
 *               - item_name
 *               - quantity
 *             properties:
 *               donor_name:
 *                 type: string
 *                 example: Mohamed Nusaif
 *               phone:
 *                 type: string
 *                 example: "0771234567"
 *               item_name:
 *                 type: string
 *                 example: School Uniform
 *               quantity:
 *                 type: integer
 *                 example: 5
 *               description:
 *                 type: string
 *                 example: Good condition uniforms
 *     responses:
 *       201:
 *         description: Donation submitted successfully
 */
router.post("/", createDonation);

/**
 * @swagger
 * /api/donations:
 *   get:
 *     summary: Get all donations
 *     tags: [Donations]
 *     responses:
 *       200:
 *         description: List of donations
 */
router.get("/", getDonations);

/**
 * @swagger
 * /api/donations/{id}:
 *   get:
 *     summary: Get donation by ID
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Donation found
 */
router.get("/:id", getDonationById);

/**
 * @swagger
 * /api/donations/{id}/approve:
 *   put:
 *     summary: Approve donation
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 */
router.put("/:id/approve", approveDonation);

/**
 * @swagger
 * /api/donations/{id}/reject:
 *   put:
 *     summary: Reject donation
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 */
router.put("/:id/reject", rejectDonation);

/**
 * @swagger
 * /api/donations/{id}/distributed:
 *   put:
 *     summary: Mark donation as distributed
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 */
router.put("/:id/distributed", markDistributed);

/**
 * @swagger
 * /api/donations/{id}:
 *   delete:
 *     summary: Delete donation
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 */
router.delete("/:id", deleteDonation);

module.exports = router;