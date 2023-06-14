'use client';
import styles from "./walletConnect.module.css";
import { useEffect, useState } from "react";
import defaultProvider from "../../abi/defaultProvider";
import Image from "next/image";
import tick from "../../../public/Icons/StatusCheck.png"
import { BrowserProvider } from "ethers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAccount } from "@/store/accountSlice";
import walletProvider from "@/abi/walletProvider";

const walletConnect = () => {
    const currentAccount = useSelector(state => state.account.account);
    const dispatch = useDispatch();

    useEffect(() =>{
        getCurrentWalletConnected();
        walletListener();
    },[currentAccount])

    const handleWalletConnect = async () =>{
        const accounts = await walletProvider?.send("eth_requestAccounts", []);
        dispatch(setAccount(accounts[0]));
    }

    const getCurrentWalletConnected = async () =>{
        const accounts = await walletProvider?.send("eth_accounts", []);
        if(accounts && accounts.length > 0){
            dispatch(setAccount(accounts[0]));
        } else{
            dispatch(setAccount(""));
        }
    }

    const walletListener = async () =>{
        if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
            window.ethereum.on("accountChanged", (accounts) =>{
                dispatch(setAccount(accounts[0]));
            });
        } else{
            dispatch(setAccount(""))
        }
    }

    return (
        <div className={styles.mainContainer}>
             <div className={styles.header}>
                <p className={styles.headerText}>Wallet</p>
             </div>
             
                {(currentAccount && currentAccount.length > 0) ?
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