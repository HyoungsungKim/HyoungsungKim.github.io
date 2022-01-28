import * as utils from "./utils";
import {ethers} from "ethers";
import type * as zksyncType from "zksync";

// Verifier(Bob) verify Prover(Alice)
export class Verifier {
    private zksync;
    private networkName: string;
    private ethersProvider: ethers.providers.Web3Provider;
    private ethersSigner: ethers.Signer;
    private address: string;

    private zkSyncProvider: zksyncType.Provider;
    private zkSyncWallet: zksyncType.Wallet;

    private token: zksyncType.types.TokenLike;

    constructor(
        zksync,
        networkName: "rinkeby" | "ropsten" | "mainnet" | "localhost",
        ethersProvider: ethers.providers.Web3Provider,
        signer: ethers.Signer
    ) {
        this.zksync = zksync;
        this.networkName = networkName;
        this.ethersProvider = ethersProvider;      
        this.ethersSigner = signer
    }

    public async init() {
        try {
            this.address = await this.ethersSigner.getAddress()

            this.zkSyncProvider = await utils.getZkSyncProvider(this.zksync, this.networkName);
            this.zkSyncWallet = await utils.initAccount(this.zksync, this.ethersSigner, this.zkSyncProvider);
        } catch(error) {
            console.error((<Error>error).message);
        }
    }

    public async displayZkSyncBalance() {
        await utils.displayZkSyncBalance(this.zkSyncWallet)
    }
}