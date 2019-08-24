/* globals artifacts */
const TradeAccountsFactory = artifacts.require('TradeAccountsFactory')

module.exports = function(deployer) {
    deployer.deploy(TradeAccountsFactory)
}
