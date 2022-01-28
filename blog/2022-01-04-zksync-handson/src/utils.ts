import { ethers } from "ethers";
import * as zksyncType from "zksync";

declare global {
    interface Window {
        ethereum: any;
    }
}

export async function getZkSyncProvider(zksync, networkName): Promise<zksyncType.Provider> {
    //let zkSyncProvider: zksyncType.Provider;
    //zkSyncProvider = await zksyncType.getDefaultProvider(networkName);
    return zksync.getDefaultProvider(networkName);
}

/*
export async function getEthereumProvider(): Promise<ethers.providers.Web3Provider> {
    let provider: ethers.providers.Web3Provider;
    provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
}
*/
export async function initAccount(zksync, signer: ethers.Signer, zkSyncProvider: zksyncType.Provider): Promise<zksyncType.Wallet> {
    /*
    let provider: ethers.providers.Web3Provider;
    const signer: ethers.Signer = provider.getSigner()
    const zkSyncWallet = await zksyncType.Wallet.fromEthSigner(signer, zkSyncProvider)
    */

    return zksync.Wallet.fromEthSigner(signer, zkSyncProvider);
}

export interface PubKey {
    feeToken: zksyncType.types.TokenLike;
    ethAuthType: zksyncType.types.ChangePubkeyTypes;
    fee?: ethers.BigNumberish;
    nonce?: zksyncType.types.Nonce;
    validFrom?: number;
    validUntil?: number;
}


export async function registerAccount(zkSyncWallet: zksyncType.Wallet, changePubKey: PubKey) {
    console.log(`Registering the ${zkSyncWallet.address()} account on zksyncType`);
    if (!await zkSyncWallet.isSigningKeySet()) {
        if (await zkSyncWallet.getAccountId() === undefined) {
            throw new Error(`Unknown account`)
        }
        const transaction = await zkSyncWallet.setSigningKey(changePubKey)
        await transaction.awaitReceipt()
    }
    console.log(`Account ${zkSyncWallet.address()} registered`)
}

export async function depositToZkSync(zkSyncWallet: zksyncType.Wallet, token: zksyncType.types.TokenLike, amountToDeposit: string) {
    const deposit = await zkSyncWallet.depositToSyncFromEthereum({
        depositTo: zkSyncWallet.address(),
        token: token,
        amount: ethers.utils.parseEther(amountToDeposit),
    })

    try{
        await deposit.awaitReceipt()
    } catch (error) {
        console.log(`Error while awaiting confirmation from the zksyncType operators.`)
        console.log(error)
    }
}

export async function transfer(
        zksync,
        from: zksyncType.Wallet,
        toAddress: string,
        amountToTransfer: string,
        transferFee: string,
        token: zksyncType.types.TokenLike
    ): Promise<zksyncType.types.TransactionReceipt> {
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
        transactionType: zksyncType.types.IncomingTxFeeType,
        address: string,
        token: zksyncType.types.TokenLike,
        zkSyncProvider: zksyncType.Provider
    ): Promise<string> {
    const feeInWei = await zkSyncProvider.getTransactionFee(transactionType, address, token)
    return ethers.utils.formatEther(feeInWei.totalFee.toString())
}

export async function withdrawToEthereum(zksync, wallet: zksyncType.Wallet, amountToWithdraw: string, withdrawalFee: string, token: zksyncType.types.TokenLike) {
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

export async function displayZkSyncBalance(wallet: zksyncType.Wallet) {
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