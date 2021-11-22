const VotosContract = artifacts.require("VotosContract");

module.exports = function (deployer) {
  deployer.deploy(VotosContract);
};
