const Trade = require("../model/trade");
const {web3} = require("../ethereum/web3");

exports.getWelcome = async (req, res, next) => {
  res.status(200).json({ message: "Welcome!" });
};

exports.postTrade = async (req, res, next) => {
  const accountAddress = req.params.accountAddress;
  // make sure that account exists
  //     if (!account) {
  //       const error = new Error("Could not find account.");
  //       error.statusCode = 404;
  //       throw error;
  //     }
    
  const tradeParams = req.body.tradeParams

  const trade = new Trade({
    ...tradeParams,
    executed: false,
    hash: req.body.hash,
    string: JSON.stringify(tradeParams),
    nonce: req.body.nonce,
    account: accountAddress,
    signature: req.body.signature
  });

  try {
    trade.save();

    //     const story = await Story.findOne()
    //       .where({ shortId: storyId })
    //       .populate("creator")
    //       .populate({
    //         path: "confirmedEpisodes",
    //         model: "Episode",
    //         populate: {
    //           path: "proposer",
    //           model: "User",
    //           select: "name"
    //         }
    //       });

    res.status(200).json({ message: "Trade saved & will be executed when condition is met!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
