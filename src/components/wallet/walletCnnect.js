"use client"
import styles from "./walletConnect.module.css";
import { useEffect, useState } from "react";
import defaultProvider from "../../abi/defaultProvider";
import walletProvider from "../../abi/walletProvider";

const walletConnect = () => {
    const [currentAccount, setCurrentAccount] = useState();

    const handleWalletConnect = async () =>{
        const accounts = await walletProvider.send("eth_requestAccounts", []);
        const accountsMM = await window.ethereum.request({
            method: "eth_requestAccounts",
            params: [],
        })
        console.log(accounts[0]);
        setCurrentAccount(accounts[0]);
    }

    return (
        <div className={styles.mainContainer}>
             <div className={styles.header}>
                <p className={styles.headerText}>Wallet</p>
             </div>
             
                {currentAccount ? <p>{currentAccount}</p> : <div className={styles.mainPart}><button onClick={handleWalletConnect} className={styles.button}>Connect wallet</button></div>}
             
        </div>
    );
}
 
export default walletConnect;