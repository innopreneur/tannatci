const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();
const deploy = require("../ethereum/deploy");


// GET /feed/posts
router.get('/tannaci', controller.getWelcome);

router.post('/trade/:accountAddress', controller.postTrade);

router.post("/deploy", async function(req, res, next) {
    const result = await deploy("Hello World!");
    res.send(JSON.parse(result).address); 
});



module.exports = router;