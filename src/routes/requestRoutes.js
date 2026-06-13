const express = require("express");
const router = express.Router();

const {
  createRequest,
  getRequests,
  getRequestById,
  approveRequest,
  rejectRequest,
  fulfillRequest,
  deleteRequest
} = require("../controllers/requestController");

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Request Management APIs
 */

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create a new request
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requester_name
 *               - phone
 *               - item_name
 *               - quantity
 *             properties:
 *               requester_name:
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
 *                 example: 2
 *               reason:
 *                 type: string
 *                 example: Need school uniforms for children
 *     responses:
 *       201:
 *         description: Request submitted successfully
 */
router.post("/", createRequest);

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Get all requests
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: List of requests
 */
router.get("/", getRequests);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Get request by ID
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 */
router.get("/:id", getRequestById);

/**
 * @swagger
 * /api/requests/{id}/approve:
 *   put:
 *     summary: Approve request
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 */
router.put("/:id/approve", approveRequest);

/**
 * @swagger
 * /api/requests/{id}/reject:
 *   put:
 *     summary: Reject request
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 */
router.put("/:id/reject", rejectRequest);

/**
 * @swagger
 * /api/requests/{id}/fulfill:
 *   put:
 *     summary: Fulfill request
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 */
router.put("/:id/fulfill", fulfillRequest);

/**
 * @swagger
 * /api/requests/{id}:
 *   delete:
 *     summary: Delete request
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 */
router.delete("/:id", deleteRequest);

module.exports = router;