"use client";
import styles from "./walletConnect.module.css";
import { useEffect, useState } from "react";
import defaultProvider from "../../abi/defaultProvider";
import Image from "next/image";
import tick from "../../../public/Icons/StatusCheck.png"
import { BrowserProvider } from "ethers";

const walletConnect = () => {
    const [currentAccount, setCurrentAccount] = useState();

    let walletProvider;
    useEffect(()=>{
        walletProvider = new BrowserProvider(window.ethereum);
        setCurrentAccount(localStorage.getItem("adress"));
    },[])

    const handleWalletConnect = async () =>{
        const accounts = await walletProvider.send("eth_requestAccounts", []);
        // const accountsMM = await window.ethereum.request({
        //     method: "eth_requestAccounts",
        //     params: [],
        // })
        console.log(accounts[0]);
        setCurrentAccount(accounts[0]);
        localStorage.setItem("adress", accounts[0])
    }

    return (
        <div className={styles.mainContainer}>
             <div className={styles.header}>
                <p className={styles.headerText}>Wallet</p>
             </div>
             
                {currentAccount ?
                    <div className={styles.adressContainer}>

                        <div className={styles.statusContainer}>
                            <p className={styles.statusText}>Wallet status: connected!</p>
                            <Image src={tick} width={26} height={26} alt="Icon that means that your wallet is connected" />
                        </div>

                        <div className={styles.addressContainer}>
                            <p className={styles.addressText}>User: </p>
                            <p className={styles.address}>{currentAccount.substring(0,6)}...{currentAccount.substring(38)}</p>
                        </div>


                    </div> : <div className={styles.mainPart}>

                        <button onClick={handleWalletConnect} className={styles.button}>Connect wallet</button>

                    </div>}
             
        </div>
    );
}
 
export default walletConnect;