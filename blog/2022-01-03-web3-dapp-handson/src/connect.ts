import { ethers } from 'ethers';

export class Connect {
    private provider: ethers.providers.Web3Provider;
    private signer: ethers.providers.JsonRpcSigner;

    constructor(externalProvider: ethers.providers.ExternalProvider) {
        this.provider = new ethers.providers.Web3Provider(externalProvider);
        this.signer = this.provider.getSigner();
    }

    getProvider(): ethers.providers.Web3Provider { 
        return this.provider;
    }

    getSigner(): ethers.providers.JsonRpcSigner {
        return this.signer
    }
}