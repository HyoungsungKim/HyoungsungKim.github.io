import * as React from 'react';
import {ethers} from 'ethers';
import * as zksync from 'zksync';
import {Prover} from "../src/prover";
import { Verifier } from '../src/verifier';
import {Connect} from "../src/connect"

declare global {
    interface Window {
        ethereum: any;
    }
}

let connect: Connect;

let proverETHProvider: ethers.providers.Web3Provider;
let verifierETHProvider: ethers.providers.Web3Provider;

let prover: Prover;
let verifier: Verifier;

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

function ConnectButton(props: ButtonProps): JSX.Element {
    const [showResults, setShowResults] = React.useState(false)
    const [spanDisplay, setSpanDisplay] = React.useState("Address : ")

    let {display, onClick, ...htmlButtonProps}: ButtonProps = props
    let spanProps: SpanProps = {display: spanDisplay};
    let alert: JSX.Element = Alert(spanProps);
 
    
    const clickHandler = async () => {      
        if (display.toLowerCase().includes("prover")) {
            connect = new Connect(window.ethereum);  
            proverETHProvider = connect.getProvider();
            await proverETHProvider.send("eth_requestAccounts", []);
            prover = new Prover("ropsten", proverETHProvider);
            //await zksync.getDefaultProvider("ropsten");
            await prover.init()

            spanProps.display = "Address : " + await proverETHProvider.getSigner().getAddress();
            setSpanDisplay(spanProps.display);

            console.log(prover)
            console.log(spanProps.display)

        } else if (display.toLowerCase().includes("verifier")) {
            connect = new Connect(window.ethereum);  
            verifierETHProvider = connect.getProvider();
            await verifierETHProvider.send("eth_requestAccounts", []);
            verifier = new Verifier("ropsten", verifierETHProvider)
            verifier.init()

            spanProps.display = "Address : " + await verifierETHProvider.getSigner().getAddress();
            setSpanDisplay(spanProps.display);

            console.log(verifier)
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

function Deposit(props: ButtonProps): JSX.Element {
    let {display, onClick, ...htmlButtonProps} = props

    const clickHandler = async () => {
        const amountToDeposit = (document.getElementById("amountToDeposit") as HTMLInputElement).value
        await prover.deposit(amountToDeposit)
    }

    return (
        <div>
            <button {...htmlButtonProps} onClick={clickHandler}>{display}</button>
            {Form("Amount to Deposit", "amountToDeposit")}
        </div>
    )
}

function Transfer(props: ButtonProps): JSX.Element {
    let {display, onClick, ...htmlButtonProps} = props

    const clickHandler = async () => {
        const amountToTransfer = (document.getElementById("amountToTransfer") as HTMLInputElement).value
        const toAddress = (document.getElementById("toAddress") as HTMLInputElement).value
        await prover.transfer(toAddress, amountToTransfer)
    }

    return (
        <div>
            <button {...htmlButtonProps} onClick={clickHandler}>{display}</button>
            {Form("Amount to Transfer", "amountToTransfer")}
            {Form("To address", "toAddress")}
        </div>
    )
}

function Withdraw(props: ButtonProps): JSX.Element {
    let {display, onClick, ...htmlButtonProps} = props

    const clickHandler = async () => {
        const amountToWithdraw = (document.getElementById("amountToWithdraw") as HTMLInputElement).value
        await prover.withdraw(amountToWithdraw)
    }

    return (
        <div>
            <button {...htmlButtonProps} onClick={clickHandler}>{display}</button>
            {Form("Amount to Withdraw", "amountToWithdraw")}
        </div>
    )
}

export {ConnectButton, Deposit, Transfer, Withdraw}