var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ethers } from "ethers";
import * as zksync from "zksync";
export function getZkSyncProvider(networkName) {
    return __awaiter(this, void 0, void 0, function* () {
        //let zkSyncProvider: zksync.Provider;
        //zkSyncProvider = await zksync.getDefaultProvider(networkName);
        return zksync.getDefaultProvider(networkName);
    });
}
/*
export async function getEthereumProvider(): Promise<ethers.providers.Web3Provider> {
    let provider: ethers.providers.Web3Provider;
    provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
}
*/
export function initAccount(signer, zkSyncProvider) {
    return __awaiter(this, void 0, void 0, function* () {
        /*
        let provider: ethers.providers.Web3Provider;
        const signer: ethers.Signer = provider.getSigner()
        const zkSyncWallet = await zksync.Wallet.fromEthSigner(signer, zkSyncProvider)
        */
        const zkSyncWallet = yield zksync.Wallet.fromEthSigner(signer, zkSyncProvider);
        return zkSyncWallet;
    });
}
export function registerAccount(zkSyncWallet, changePubKey) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Registering the ${zkSyncWallet.address()} account on zkSync`);
        if (!(yield zkSyncWallet.isSigningKeySet())) {
            if ((yield zkSyncWallet.getAccountId()) === undefined) {
                throw new Error(`Unknown account`);
            }
            const transaction = yield zkSyncWallet.setSigningKey(changePubKey);
            yield transaction.awaitReceipt();
        }
        console.log(`Account ${zkSyncWallet.address()} registered`);
    });
}
export function depositToZkSync(zkSyncWallet, token, amountToDeposit) {
    return __awaiter(this, void 0, void 0, function* () {
        const deposit = yield zkSyncWallet.depositToSyncFromEthereum({
            depositTo: zkSyncWallet.address(),
            token: token,
            amount: ethers.utils.parseEther(amountToDeposit),
        });
        try {
            yield deposit.awaitReceipt();
        }
        catch (error) {
            console.log(`Error while awaiting confirmation from the zkSync operators.`);
            console.log(error);
        }
    });
}
export function transfer(from, toAddress, amountToTransfer, transferFee, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const closestPackableAmount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther(amountToTransfer));
        const closestPackableFee = zksync.utils.closestPackableTransactionFee(ethers.utils.parseEther(transferFee));
        const transfer = yield from.syncTransfer({
            to: toAddress,
            token: token,
            amount: closestPackableAmount,
            fee: closestPackableFee.mul(10),
        });
        const transferReceipt = yield transfer.awaitReceipt();
        console.log("Got transfer receipt");
        console.log(transferReceipt);
        return transferReceipt;
    });
}
export function getFee(transactionType, address, token, zkSyncProvider) {
    return __awaiter(this, void 0, void 0, function* () {
        const feeInWei = yield zkSyncProvider.getTransactionFee(transactionType, address, token);
        return ethers.utils.formatEther(feeInWei.totalFee.toString());
    });
}
export function withdrawToEthereum(wallet, amountToWithdraw, withdrawalFee, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const closestPackableAmount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther(amountToWithdraw));
        const closestPackableFee = zksync.utils.closestPackableTransactionFee(ethers.utils.parseEther(withdrawalFee));
        const withdraw = yield wallet.withdrawFromSyncToEthereum({
            ethAddress: wallet.address(),
            token: token,
            amount: closestPackableAmount,
            fee: closestPackableFee,
        });
        yield withdraw.awaitVerifyReceipt();
        console.log("ZKP verification is complete");
    });
}
export function displayZkSyncBalance(wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        const state = yield wallet.getAccountState();
        if (state.committed.balances.ETH) {
            console.log(`Committed ETH balance for ${wallet.address()}: ${ethers.utils.formatEther(state.committed.balances.ETH)}`);
        }
        else {
            console.log(`Committed ETH balance for ${wallet.address()}: 0`);
        }
        if (state.verified.balances.ETH) {
            console.log(`Verified ETH balance for ${wallet.address()}: ${ethers.utils.formatEther(state.verified.balances.ETH)}`);
        }
        else {
            console.log(`Verified ETH balance for ${wallet.address()}: 0`);
        }
    });
}
