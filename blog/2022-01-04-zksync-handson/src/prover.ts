import * as utils from './zksyncUtils';
import {ethers} from "ethers";
import * as zksync from "zksync";


// Prover(Alice) want to send token(or ETH)
export class Prover {
    private networkName: zksync.types.Network;
    private ethersProvider: ethers.providers.Web3Provider;
    private ethersSigner: ethers.Signer;
    private address: string;

    private zkSyncProvider: zksync.Provider;
    private zkSyncWallet: zksync.Wallet;

    private token: zksync.types.TokenLike;

    constructor(
        networkName: "rinkeby" | "ropsten" | "mainnet" | "localhost",
        ethersProvider: ethers.providers.Web3Provider,
        signer:  ethers.Signer,
    ) {
        this.networkName = networkName;
        this.ethersProvider = ethersProvider;      
        this.ethersSigner = signer;
    }

    public async init(token: zksync.types.TokenLike = "ETH") {
        if (token) {
            this.token = token;
        }

        let pubkey: utils.PubKey = {
            feeToken: this.token,
            ethAuthType: "ECDSA",
        } 

        try {
            this.address = await this.ethersSigner.getAddress()

            this.zkSyncProvider = await utils.getZkSyncProvider(this.networkName);
            //this.zkSyncWallet = await utils.initAccount(this.ethersSigner, this.zkSyncProvider);
           // await utils.registerAccount(this.zkSyncWallet, pubkey);

        } catch(error) {
            console.error((<Error>error).message);
        }
    }
/*
    public async deposit(amountToDeposit: string) {
        try{
            await utils.depositToZkSync(this.zkSyncWallet, this.token, amountToDeposit);
            await utils.displayZkSyncBalance(this.zkSyncWallet);
        } catch(error) {
            console.log(error)
            console.error((<Error>error).message);
        }        
    }

    public async transfer(toAddress: string, amountToTransfer: string) {
        const transferFee = await utils.getFee(`Transfer`, this.address, this.token, this.zkSyncProvider)
        try {
            await utils.transfer(this.zkSyncWallet, toAddress, amountToTransfer, transferFee, this.token)
        } catch(error) {
            console.log(error)
            console.error((<Error>error).message);
        }
    }
    
    public async withdraw(amountToWithdraw: string) {
        const withdrawFee = await utils.getFee(`Withdraw`, this.address, this.token, this.zkSyncProvider)
        try {
            await utils.withdrawToEthereum(this.zkSyncWallet, amountToWithdraw, withdrawFee, this.token)
        } catch(error) {
            console.log(error)
            console.error((<Error>error).message);
        }
    }
    */
}