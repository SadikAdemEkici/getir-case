var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var record_controller = require('../controllers/record');

router.post('/records', record_controller.fetch_record);

module.exports = router;