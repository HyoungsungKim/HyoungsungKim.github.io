import { ethers } from "ethers";
import * as zksync from "zksync";

declare global {
    interface Window {
        ethereum: any;
    }
}

export async function getZkSyncProvider(networkName): Promise<zksync.Provider> {
    let zkSyncProvider: zksync.Provider;
    try {
        zkSyncProvider = await zksync.getDefaultProvider(networkName);
    } catch(error) {
        console.log("Unable to connect to zksync.");
        console.log(error);
    }

    return zkSyncProvider;
}

export async function getEthereumProvider(): Promise<ethers.providers.Web3Provider> {
    let provider: ethers.providers.Web3Provider;
    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
    } catch(error) {
        console.log("Could not connect to Metamask")
        console.log(error)
    }

    return provider;
}

export async function initAccount(signer: ethers.Signer, zkSyncProvider: zksync.Provider): Promise<zksync.Wallet> {
    /*
    let provider: ethers.providers.Web3Provider;
    const signer: ethers.Signer = provider.getSigner()
    const zkSyncWallet = await zksync.Wallet.fromEthSigner(signer, zkSyncProvider)
    */

    const zkSyncWallet = await zksync.Wallet.fromEthSigner(signer, zkSyncProvider);
    return zkSyncWallet;
}

export interface PubKey {
    feeToken: zksync.types.TokenLike;
    ethAuthType: zksync.types.ChangePubkeyTypes;
    fee?: ethers.BigNumberish;
    nonce?: zksync.types.Nonce;
    validFrom?: number;
    validUntil?: number;
}

export async function registerAccount(zkSyncWallet: zksync.Wallet, changePubKey: PubKey) {
    console.log(`Registering the ${zkSyncWallet.address()} account on zkSync`);
    if (!await zkSyncWallet.isSigningKeySet()) {
        if (await zkSyncWallet.getAccountId() === undefined) {
            throw new Error(`Unknown account`)
        }
        const transaction = await zkSyncWallet.setSigningKey(changePubKey)
        await transaction.awaitReceipt()
    }
    console.log(`Account ${zkSyncWallet.address()} registered`)
}

export async function depositToZkSync(zkSyncWallet: zksync.Wallet, token: zksync.types.TokenLike, amountToDeposit: string) {
    const deposit = await zkSyncWallet.depositToSyncFromEthereum({
        depositTo: zkSyncWallet.address(),
        token: token,
        amount: ethers.utils.parseEther(amountToDeposit),
    })

    try{
        await deposit.awaitReceipt()
    } catch (error) {
        console.log(`Error while awaiting confirmation from the zkSync operators.`)
        console.log(error)
    }
}

export async function transfer(
        from: zksync.Wallet,
        toAddress: string,
        amountToTransfer: string,
        transferFee: string,
        token: zksync.types.TokenLike
    ): Promise<zksync.types.TransactionReceipt> {
    const closestPackableAmount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther(amountToTransfer));
    const closestPackableFee = zksync.utils.closestPackableTransactionFee(ethers.utils.parseEther(transferFee));

    const transfer = await from.syncTransfer({
        to: toAddress,
        token: token,
        amount: closestPackableAmount,
        fee: closestPackableFee.mul(10),
    })
    const transferReceipt = await transfer.awaitReceipt()
    console.log("Got transfer receipt")
    console.log(transferReceipt)

    return transferReceipt;
}

export async function getFee(
        transactionType: zksync.types.IncomingTxFeeType,
        address: string,
        token: zksync.types.TokenLike,
        zkSyncProvider: zksync.Provider
    ): Promise<string> {
    const feeInWei = await zkSyncProvider.getTransactionFee(transactionType, address, token)
    return ethers.utils.formatEther(feeInWei.totalFee.toString())
}

export async function withdrawToEthereum(wallet: zksync.Wallet, amountToWithdraw: string, withdrawalFee: string, token: zksync.types.TokenLike) {
    const closestPackableAmount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther(amountToWithdraw))
    const closestPackableFee = zksync.utils.closestPackableTransactionFee(ethers.utils.parseEther(withdrawalFee))
    const withdraw = await wallet.withdrawFromSyncToEthereum({
        ethAddress: wallet.address(),
        token: token,
        amount: closestPackableAmount,
        fee: closestPackableFee,
    })

    await withdraw.awaitVerifyReceipt()
    console.log("ZKP verification is complete")
}

export async function displayZkSyncBalance(wallet: zksync.Wallet) {
    const state = await wallet.getAccountState()

    if (state.committed.balances.ETH) {
        console.log(`Committed ETH balance for ${wallet.address()}: ${ethers.utils.formatEther(state.committed.balances.ETH)}`)
    } else {
        console.log(`Committed ETH balance for ${wallet.address()}: 0`)
    }

    if (state.verified.balances.ETH) {
        console.log(`Verified ETH balance for ${wallet.address()}: ${ethers.utils.formatEther(state.verified.balances.ETH)}`)
    } else {
        console.log(`Verified ETH balance for ${wallet.address()}: 0`)
    }
}