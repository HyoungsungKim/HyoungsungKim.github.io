import * as utils from "./utils";
import {ethers} from "ethers";
import * as zksync from "zksync";

// Verifier(Bob) verify Prover(Alice)
export class Verifier {
    private networkName: string;
    private ethersProvider: ethers.providers.Web3Provider;
    private ethersSigner: ethers.Signer;
    private address: string;

    private zkSyncProvider: zksync.Provider;
    private zkSyncWallet: zksync.Wallet;

    private token: zksync.types.TokenLike;

    constructor(
        networkName: "rinkeby" | "ropsten" | "mainnet" | "localhost",
        ethersProvider: ethers.providers.Web3Provider
    ) {
        this.networkName = networkName;
        this.ethersProvider = ethersProvider;      
        this.ethersSigner = this.ethersProvider.getSigner()
    }

    public async init() {
        try {
            this.address = await this.ethersSigner.getAddress()

            this.zkSyncProvider = await utils.getZkSyncProvider(this.networkName);
            this.zkSyncWallet = await utils.initAccount(this.ethersSigner, this.zkSyncProvider);
        } catch(error) {
            console.error((<Error>error).message);
        }
    }

    public async displayZkSyncBalance() {
        await utils.displayZkSyncBalance(this.zkSyncWallet)
    }
}