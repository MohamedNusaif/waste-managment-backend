const router = require("express").Router();
const {
  createRequest,
  getRequests
} = require("../controllers/requestController");

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create request
 *     tags: [Requests]
 */
router.post("/", createRequest);

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Get all requests
 *     tags: [Requests]
 */
router.get("/", getRequests);

module.exports = router;