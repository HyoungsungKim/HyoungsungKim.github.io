"use strict";
exports.__esModule = true;
exports.Connect = void 0;
var ethers_1 = require("ethers");
var Connect = /** @class */ (function () {
    function Connect(externalProvider) {
        this.provider = new ethers_1.ethers.providers.Web3Provider(externalProvider);
        this.signer = this.provider.getSigner();
    }
    Connect.prototype.getProvider = function () {
        return this.provider;
    };
    return Connect;
}());
exports.Connect = Connect;
