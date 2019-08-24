const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();
const deploy = require("../ethereum/deploy");
const logic = require("../ethereum/logic");


// GET /feed/posts
router.get('/tannaci', controller.getWelcome);

router.get("/message", async (req,res,next) => {
    let message = await logic.getMessage();
    res.send(message);
})

router.post("/message", async (req,res, next) => {
    let message = await logic.setMessage(req.body.message);
    res.send(message.transactionHash);
})

router.get('/trade/:accountAddress', controller.postTrade);

router.post("/deploy", async function(req, res, next) {
    const result = await deploy("Hello World!");
    res.send(JSON.parse(result).address); 
});



module.exports = router;