const Trade = require("../model/trade");

exports.getWelcome = async (req, res, next) => {
  res.status(200).json({ message: "Welcome!" });
};

exports.postTrade = async (req, res, next) => {
  const accountAddress = req.params.accountAddress;
  console.log(req.body);
  // make sure that account exists
  //     if (!account) {
  //       const error = new Error("Could not find account.");
  //       error.statusCode = 404;
  //       throw error;
  //     }
  const type = req.body.type;
  const value = req.body.value;
  const txObj = req.body.txObj;
  console.log(type,value, txObj);
  const trade = new Trade({
    type: type,
    value: value,
    txObj: txObj,
    executed: false
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
