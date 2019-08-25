const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();
const deployFactory = require("../ethereum/deployFactory");



// GET /feed/posts
router.get('/tannaci', controller.getWelcome);

router.post('/trade/:accountAddress', controller.postTrade);

router.post("/deployFactory", async function(req, res, next) {
    const result = await deployFactory();
    console.log(result);
    res.send(JSON.parse(result).address); 
});

router.get("/:accountAddress", controller.getTrades);

router.put("/:accountAddress/:tradeId", controller.cancelTrade);


module.exports = router;