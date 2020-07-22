const Token = artifacts.require("mytoken");

module.exports = function(deployer) {
  deployer.deploy(Token);
};
