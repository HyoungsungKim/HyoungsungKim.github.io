import * as React from 'react';
import { Connect } from '../src/connect';

import { ethers } from 'ethers';
import ERC20ContractInfo from '../contract/ERC20.json';
import ERC721ContractInfo from '../contract/ERC721/MyNFT.json';
//import ERC721Metdata from '../contract/ERC721/metadata.json';
import { parseUnits } from 'ethers/lib/utils';


declare global {
    interface Window {
        ethereum: any;
    }
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    display: string;
}

interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
    display: string;
}

let connect: Connect;
let provider: ethers.providers.Web3Provider;

function Alert(props: SpanProps): JSX.Element {
    let {display, ...HTMLSpanProps} = props

    return (
        <div className="alert alert--primary" role="alert">
            <button aria-label="Close" className="clean-btn close" type="button">
                <span aria-hidden="true">×</span>
            </button>{display}
        </div>
    )
}

function Form(labelSrc: string, elementId: string|undefined = undefined, value: string|undefined = undefined): JSX.Element {
    return (
        <form>
            <label>
                {labelSrc}:<br />
                <input id={elementId} type="text" defaultValue={value}/>
            </label>
        </form>
    )
}

function ConnectAccountButton(props: ButtonProps): JSX.Element {
    let {display, onClick, ...htmlButtonProps}: ButtonProps = props;
    
    let userAccountComponent: HTMLSpanElement;
    let userAccount: string;
    
    const clickHandler = async () => {
        connect = new Connect(window.ethereum);
        provider = connect.getProvider();

        await provider.send("eth_requestAccounts", []);
        const signer = connect.getSigner();
        userAccount = await signer.getAddress();
        userAccountComponent = document.getElementById("userAccount") as HTMLSpanElement;
        userAccountComponent.textContent = `User account: ${userAccount}`;

        console.log("Account:", userAccount);
    }

    return (
        <div>
            <button {...htmlButtonProps} onClick={clickHandler}>{display}</button>
            <div>
                <span id="userAccount">{`User account: `}</span>
            </div>
        </div>
    )
}

function SendEthButton(props: ButtonProps): JSX.Element {
    let {display, onClick, ...htmlButtonProps}: ButtonProps = props;
    
    const clickHandler = async () => {
        const from = (document.getElementById("fromAccount") as HTMLInputElement).value;
        const to = (document.getElementById("toAccount") as HTMLInputElement).value;
        let value = (document.getElementById("value") as HTMLInputElement).value;

        const params = [
            {
                from: from,
                to: to,
                value: value,
            }
        ]
        await provider.send("eth_sendTransaction", params)
    }

    return (
        <div>
            <button {...htmlButtonProps} onClick={clickHandler}>{display}</button>
            {Form("From", "fromAccount")}
            {Form("To", "toAccount")}
            {Form("Value(wei)", "value", "5AF3107A4000")}
        </div>
    )
    
}

function ERC20Handler(props: ButtonProps): JSX.Element {
    //const abi = [{ 'constant': false, 'inputs': [{ 'name': 'withdrawAmount', 'type': 'uint256' }], 'name': 'withdraw', 'outputs': [{ 'name': 'remainingBal', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'owner', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [], 'name': 'deposit', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': true, 'stateMutability': 'payable', 'type': 'function' }, { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }];
    //const bytecode = "0x608060405234801561001057600080fd5b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000808190555061023b806100686000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e1a7d4d1461005c5780638da5cb5b1461009d578063d0e30db0146100f4575b600080fd5b34801561006857600080fd5b5061008760048036038101908080359060200190929190505050610112565b6040518082815260200191505060405180910390f35b3480156100a957600080fd5b506100b26101d0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100fc6101f6565b6040518082815260200191505060405180910390f35b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561017057600080fd5b8160008082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f193505050501580156101c5573d6000803e3d6000fd5b506000549050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60003460008082825401925050819055506000549050905600a165627a7a72305820f237db3ec816a52589d82512117bc85bc08d3537683ffeff9059108caf3e5d400029";
    let {display, onClick, ...htmlButtonProps}: ButtonProps = props;
    
    const abi = ERC20ContractInfo.abi;
    const bytecode = ERC20ContractInfo.bytecode;
    let signer: ethers.providers.JsonRpcSigner;       

    let statusMonitor: HTMLSpanElement;
    let sendTokenButton: HTMLButtonElement;

    let totalSupplyInput: HTMLInputElement;
    let nameInput: HTMLInputElement;
    let symbolInput: HTMLInputElement;

    let toAddressInput: HTMLInputElement;
    let amountInput: HTMLInputElement;

    let contract: ethers.Contract;

    async function deployButtonHandler() {
        signer = provider.getSigner();
        const factory = new ethers.ContractFactory(abi, bytecode, signer);     

        statusMonitor = document.getElementById("status") as HTMLSpanElement;

        totalSupplyInput = document.getElementById("totalSupply") as HTMLInputElement;
        nameInput = document.getElementById("name") as HTMLInputElement;
        symbolInput = document.getElementById("symbol") as HTMLInputElement;

        toAddressInput = document.getElementById("toAddress") as HTMLInputElement;
        amountInput = document.getElementById("amount") as HTMLInputElement;

        try {
            const totalSupply = totalSupplyInput.value;
            const name = nameInput.value;
            const symbol = symbolInput.value;
            
            contract =  await factory.deploy(parseUnits(totalSupply), name, symbol);
            statusMonitor.innerHTML = "Deploying";

            await contract.deployTransaction.wait();            
            statusMonitor.innerHTML = "Deployed";

            console.log(`Contract mined! address: ${contract.address} transactionHash: ${contract.deployTransaction }`);
        } catch(err) {            
            console.error(err)
            statusMonitor.innerHTML = `Deploy failed, ${(err as Error).message}`
        }        
    }

    async function sendTokenButtonHandler() {
        try {
            const toAddress = toAddressInput.value;
            const amount = amountInput.value;

            const sendingResult = await contract.transfer(toAddress, parseUnits(amount));
            // msg.value = "5AF3107A4000"
            sendingResult.wait();

            statusMonitor.innerHTML = `Sending success`;
        } catch(err) {
            console.error(err);
            statusMonitor.innerHTML = `Sending failed, ${(err as Error).message}`;
        }        
    }

    return (
        <div>
            <span id="status">Click deploy</span>
            <div>
                <button {...htmlButtonProps} onClick={deployButtonHandler}>Deploy(Minting token)</button>
                <div>
                    {Form("Total supply", "totalSupply")}
                    {Form("Name", "name")}
                    {Form("Symbol", "symbol")}
                </div><br />

                <button {...htmlButtonProps} onClick={sendTokenButtonHandler}>Send token</button>
                <div>
                    {Form("To", "toAddress")}
                    {Form("Amount", "amount")}
                </div><br />
            </div>
        </div>
    )
}

function ERC721Handler(props: ButtonProps): JSX.Element {
    let {display, onClick, ...htmlButtonProps}: ButtonProps = props;

    const abi = ERC721ContractInfo.abi;
    const bytecode = ERC721ContractInfo.bytecode;
    let signer: ethers.providers.JsonRpcSigner

    let statusMonitor: HTMLSpanElement;
    let sendTokenButton: HTMLButtonElement;
    
    let URIInput: HTMLInputElement;
    let nameInput: HTMLInputElement;
    let symbolInput: HTMLInputElement;

    let toAddressInput: HTMLInputElement;

    let contract: ethers.Contract;

    let addressMap: {[key: string]: number[]} = {};

    async function deployButtonHandler() {
        signer = provider.getSigner();
        const factory = new ethers.ContractFactory(abi, bytecode, signer);        
        statusMonitor = document.getElementById("NFTstatus") as HTMLSpanElement;
        sendTokenButton =  document.getElementById("NFTsendTokenButton") as HTMLButtonElement;

        URIInput = document.getElementById("URI") as HTMLInputElement;
        nameInput = document.getElementById("NFTname") as HTMLInputElement;
        symbolInput = document.getElementById("NFTsymbol") as HTMLInputElement;

        toAddressInput = document.getElementById("NFTtoAddress") as HTMLInputElement;

        try {
            const name = nameInput.value;
            const symbol = symbolInput.value;

            contract = await factory.deploy(name, symbol);
            statusMonitor.innerHTML = "Deploying";

            await contract.deployTransaction.wait();
            statusMonitor.innerHTML = "Deployed";

            console.log(`Contract mined! address: ${contract.address} transactionHash: ${contract.deployTransaction}`);
            sendTokenButton.disabled = false;
        } catch(err) {
            console.error(err);
            statusMonitor.innerHTML = `Deploy failed, ${(err as Error).message}`;
        }
    }

    async function mintERC721() {
        try {
            const URI = URIInput.value;
            const toAddress = toAddressInput.value;
            
            const mintingResult = await contract.mintNFT(toAddress, URI)
            mintingResult.wait();
            statusMonitor.innerHTML = `Minting Success`;
            let NFTId: any;

            contract.on("Transfer", (from, to, tokenId) => {        
                console.log("From:", from);
                console.log("To:",to);
                console.log("TokenId:", tokenId);

                if (addressMap[toAddress]) {
                    addressMap[toAddress].push(tokenId);
                } else {
                    addressMap[toAddress] = [tokenId];
                } 

                console.log(addressMap[toAddress]);
            })
        } catch(err) {
            console.error(err);
            statusMonitor.innerHTML = `Minting failed, ${(err as Error).message}`;
        }
    }

    return (
        <div>
            <span id="NFTstatus">Click deploy</span><br />            
            <div>
                <button {...htmlButtonProps} onClick={deployButtonHandler}>Deploy(Minting token)</button>
                <div>
                    {Form("Name", "NFTname")}
                    {Form("Symbol", "NFTsymbol")}
                </div><br />

                <button {...htmlButtonProps} id="NFTsendTokenButton" onClick={mintERC721}>Mint token</button>
                <div>
                    {Form("URI", "URI")}
                    {Form("Mint To", "NFTtoAddress")}
                </div>
            </div>
        </div>
    )
}

export {Form, ConnectAccountButton, SendEthButton, ERC20Handler, ERC721Handler}
