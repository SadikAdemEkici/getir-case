var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var record_controller = require('../controllers/record');

/**
 * @swagger
 * /records:
 *   post:
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 description: The record which is created after this date.
 *                 example: 2016-01-26
 *               endDate:
 *                 type: string
 *                 description: The record which is created before this date.
 *                 example: 2018-02-02
 *               minCount:
 *                 type: integer
 *                 description: Min Count.
 *                 example: 2700
 *               maxCount:
 *                 type: integer
 *                 description: Max count.
 *                 example: 3000
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Date format(s) are invalid!
 *       500:
 *         description: Something went wrong!
 */
router.post('/records', record_controller.fetch_record);

module.exports = router;