/* globals artifacts */
const TradeAccount = artifacts.require('TradeAccount')

// dummy owner, replace with real wallet/owner
const owner = '0xeE9300b7961e0a01d9f0adb863C7A227A07AaD75'

module.exports = function(deployer) {
    deployer.deploy(TradeAccount, owner)
}
