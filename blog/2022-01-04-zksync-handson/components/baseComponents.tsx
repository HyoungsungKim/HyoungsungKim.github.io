import * as React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';

import {ethers} from 'ethers';
import {Sender} from "../src/sender";
import { Receiver } from '../src/receiver';
import {Connect} from "../src/connect"

//import * as zksync from 'zksync';


declare global {
    interface Window {
        ethereum: any;
    }
}

let connect: Connect;

let proverETHProvider: ethers.providers.Web3Provider;
let verifierETHProvider: ethers.providers.Web3Provider;

let sender: Sender;
let receiver: Receiver;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    display: string;
}

interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
    display: string;
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

function Alert(props: SpanProps): JSX.Element {
    let {display, ...HTMLSpanProps} = props

    return (
        <div className="alert alert--primary" role="alert">
            <button aria-label="Close" className="clean-btn close" type="button">
                <span {...HTMLSpanProps} aria-hidden="true" />
            </button>{display}
        </div>
    )
}

export function ConnectButton(props: ButtonProps): JSX.Element {
    const [showResults, setShowResults] = React.useState(false)
    const [spanDisplay, setSpanDisplay] = React.useState("Address : ")
  
    let {display, onClick, ...htmlButtonProps}: ButtonProps = props
    let spanProps: SpanProps = {display: spanDisplay};
    let alert: JSX.Element = Alert(spanProps);
    let signer: ethers.Signer;

    const clickHandler = async () => {    
        const zksync = require("zksync");

        connect = new Connect(window.ethereum);  
        proverETHProvider = connect.getProvider();
        await proverETHProvider.send("eth_requestAccounts", []);
        signer = proverETHProvider.getSigner();
        //setIsClicked(true);
        
        if (display.toLowerCase().includes("sender")) {                    
            connect = new Connect(window.ethereum);  
            proverETHProvider = connect.getProvider();
            await proverETHProvider.send("eth_requestAccounts", []);
            const signer = proverETHProvider.getSigner();

            sender = new Sender(zksync, "ropsten", proverETHProvider, signer);        
            await sender.init()
        
            spanProps.display = "Address : " + await signer.getAddress();
            setSpanDisplay(spanProps.display);

            console.log(sender)
            console.log(spanProps.display)
            
        }  else if (display.toLowerCase().includes("receiver")) {
            connect = new Connect(window.ethereum);  
            verifierETHProvider = connect.getProvider();
            await verifierETHProvider.send("eth_requestAccounts", []);
            const signer = verifierETHProvider.getSigner();

            receiver = new Receiver(zksync, "ropsten", verifierETHProvider, signer)
            receiver.init()

            spanProps.display = "Address : " + await signer.getAddress();
            setSpanDisplay(spanProps.display);

            console.log(receiver)
            console.log(spanProps.display)
        }
        
        alert = Alert(spanProps);
        setShowResults(true)        
        
    }

    return (
        <div>
            <button {...htmlButtonProps} onClick={clickHandler}>{display}</button>
            {showResults ? alert : alert}
        </div>
    )
}

export function Deposit(props: ButtonProps): JSX.Element {
    let {display, onClick, ...htmlButtonProps} = props

    const clickHandler = async () => {
        const amountToDeposit = (document.getElementById("amountToDeposit") as HTMLInputElement).value
        await sender.deposit(amountToDeposit)
    }

    return (
        <div>
            <button {...htmlButtonProps} onClick={clickHandler}>{display}</button>
            {Form("Amount to Deposit", "amountToDeposit")}
        </div>
    )
}

export function Transfer(props: ButtonProps): JSX.Element {
    let {display, onClick, ...htmlButtonProps} = props

    const clickHandler = async () => {
        const amountToTransfer = (document.getElementById("amountToTransfer") as HTMLInputElement).value
        const toAddress = (document.getElementById("toAddress") as HTMLInputElement).value
        await sender.transfer(toAddress, amountToTransfer)
    }

    return (
        <div>
            <button {...htmlButtonProps} onClick={clickHandler}>{display}</button>
            {Form("Amount to Transfer", "amountToTransfer")}
            {Form("To address", "toAddress")}
        </div>
    )
}

export function Withdraw(props: ButtonProps): JSX.Element {
    let {display, onClick, ...htmlButtonProps} = props

    const clickHandler = async () => {
        const amountToWithdraw = (document.getElementById("amountToWithdraw") as HTMLInputElement).value
        await sender.withdraw(amountToWithdraw)
    }

    return (
        <div>
            <button {...htmlButtonProps} onClick={clickHandler}>{display}</button>
            {Form("Amount to Withdraw", "amountToWithdraw")}
        </div>
    )
}