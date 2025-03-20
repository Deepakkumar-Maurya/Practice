var AddressIndependentAuth = artifacts.require("./AddressIndependentAuth.sol");

module.exports = function(deployer) {
    deployer.deploy(AddressIndependentAuth);
};