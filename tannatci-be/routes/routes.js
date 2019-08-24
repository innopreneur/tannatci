const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

// GET /feed/posts
router.get('/tannaci', controller.getWelcome);

router.get('/:accountAddress', controller.postTrade);


module.exports = router;