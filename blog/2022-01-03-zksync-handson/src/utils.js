"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.displayZkSyncBalance = exports.withdrawToEthereum = exports.getFee = exports.transfer = exports.depositToZkSync = exports.registerAccount = exports.initAccount = exports.getEthereumProvider = exports.getZkSyncProvider = void 0;
var ethers_1 = require("ethers");
var zksync = require("zksync");
function getZkSyncProvider(networkName) {
    return __awaiter(this, void 0, void 0, function () {
        var zkSyncProvider, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, zksync.getDefaultProvider(networkName)];
                case 1:
                    zkSyncProvider = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log("Unable to connect to zksync.");
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, zkSyncProvider];
            }
        });
    });
}
exports.getZkSyncProvider = getZkSyncProvider;
function getEthereumProvider() {
    return __awaiter(this, void 0, void 0, function () {
        var provider;
        return __generator(this, function (_a) {
            try {
                provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
            }
            catch (error) {
                console.log("Could not connect to Metamask");
                console.log(error);
            }
            return [2 /*return*/, provider];
        });
    });
}
exports.getEthereumProvider = getEthereumProvider;
function initAccount(signer, zkSyncProvider) {
    return __awaiter(this, void 0, void 0, function () {
        var zkSyncWallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, zksync.Wallet.fromEthSigner(signer, zkSyncProvider)];
                case 1:
                    zkSyncWallet = _a.sent();
                    return [2 /*return*/, zkSyncWallet];
            }
        });
    });
}
exports.initAccount = initAccount;
function registerAccount(zkSyncWallet, changePubKey) {
    return __awaiter(this, void 0, void 0, function () {
        var transaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Registering the " + zkSyncWallet.address() + " account on zkSync");
                    return [4 /*yield*/, zkSyncWallet.isSigningKeySet()];
                case 1:
                    if (!!(_a.sent())) return [3 /*break*/, 5];
                    return [4 /*yield*/, zkSyncWallet.getAccountId()];
                case 2:
                    if ((_a.sent()) === undefined) {
                        throw new Error("Unknown account");
                    }
                    return [4 /*yield*/, zkSyncWallet.setSigningKey(changePubKey)];
                case 3:
                    transaction = _a.sent();
                    return [4 /*yield*/, transaction.awaitReceipt()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    console.log("Account " + zkSyncWallet.address() + " registered");
                    return [2 /*return*/];
            }
        });
    });
}
exports.registerAccount = registerAccount;
function depositToZkSync(zkSyncWallet, token, amountToDeposit) {
    return __awaiter(this, void 0, void 0, function () {
        var deposit, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, zkSyncWallet.depositToSyncFromEthereum({
                        depositTo: zkSyncWallet.address(),
                        token: token,
                        amount: ethers_1.ethers.utils.parseEther(amountToDeposit)
                    })];
                case 1:
                    deposit = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, deposit.awaitReceipt()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.log("Error while awaiting confirmation from the zkSync operators.");
                    console.log(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.depositToZkSync = depositToZkSync;
function transfer(from, toAddress, amountToTransfer, transferFee, token) {
    return __awaiter(this, void 0, void 0, function () {
        var closestPackableAmount, closestPackableFee, transfer, transferReceipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    closestPackableAmount = zksync.utils.closestPackableTransactionAmount(ethers_1.ethers.utils.parseEther(amountToTransfer));
                    closestPackableFee = zksync.utils.closestPackableTransactionFee(ethers_1.ethers.utils.parseEther(transferFee));
                    return [4 /*yield*/, from.syncTransfer({
                            to: toAddress,
                            token: token,
                            amount: closestPackableAmount,
                            fee: closestPackableFee.mul(10)
                        })];
                case 1:
                    transfer = _a.sent();
                    return [4 /*yield*/, transfer.awaitReceipt()];
                case 2:
                    transferReceipt = _a.sent();
                    console.log("Got transfer receipt");
                    console.log(transferReceipt);
                    return [2 /*return*/, transferReceipt];
            }
        });
    });
}
exports.transfer = transfer;
function getFee(transactionType, address, token, zkSyncProvider) {
    return __awaiter(this, void 0, void 0, function () {
        var feeInWei;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, zkSyncProvider.getTransactionFee(transactionType, address, token)];
                case 1:
                    feeInWei = _a.sent();
                    return [2 /*return*/, ethers_1.ethers.utils.formatEther(feeInWei.totalFee.toString())];
            }
        });
    });
}
exports.getFee = getFee;
function withdrawToEthereum(wallet, amountToWithdraw, withdrawalFee, token) {
    return __awaiter(this, void 0, void 0, function () {
        var closestPackableAmount, closestPackableFee, withdraw;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    closestPackableAmount = zksync.utils.closestPackableTransactionAmount(ethers_1.ethers.utils.parseEther(amountToWithdraw));
                    closestPackableFee = zksync.utils.closestPackableTransactionFee(ethers_1.ethers.utils.parseEther(withdrawalFee));
                    return [4 /*yield*/, wallet.withdrawFromSyncToEthereum({
                            ethAddress: wallet.address(),
                            token: token,
                            amount: closestPackableAmount,
                            fee: closestPackableFee
                        })];
                case 1:
                    withdraw = _a.sent();
                    return [4 /*yield*/, withdraw.awaitVerifyReceipt()];
                case 2:
                    _a.sent();
                    console.log("ZKP verification is complete");
                    return [2 /*return*/];
            }
        });
    });
}
exports.withdrawToEthereum = withdrawToEthereum;
function displayZkSyncBalance(wallet) {
    return __awaiter(this, void 0, void 0, function () {
        var state;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wallet.getAccountState()];
                case 1:
                    state = _a.sent();
                    if (state.committed.balances.ETH) {
                        console.log("Committed ETH balance for " + wallet.address() + ": " + ethers_1.ethers.utils.formatEther(state.committed.balances.ETH));
                    }
                    else {
                        console.log("Committed ETH balance for " + wallet.address() + ": 0");
                    }
                    if (state.verified.balances.ETH) {
                        console.log("Verified ETH balance for " + wallet.address() + ": " + ethers_1.ethers.utils.formatEther(state.verified.balances.ETH));
                    }
                    else {
                        console.log("Verified ETH balance for " + wallet.address() + ": 0");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.displayZkSyncBalance = displayZkSyncBalance;
