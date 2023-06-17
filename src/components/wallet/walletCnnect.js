'use client';
import styles from "./walletConnect.module.css";
import { useEffect } from "react";
// import Image from "next/image";
// import tick from "../../../public/Icons/StatusCheck.png"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAccount } from "@/store/accountSlice";
import walletProvider from "@/abi/walletProvider";
import { Button } from "react95";
import styled from 'styled-components';
import defaultProvider from "@/abi/defaultProvider";
import { formatEther } from "ethers";
import { setBalance } from "@/store/balanceSlice";

const StyledButton = styled(Button)`
  height: 60px;
`

const walletConnect = () => {
    const currentAccount = useSelector(state => state.account.account);
    const currentBalance = useSelector|(state => state.balance.balance);
    const dispatch = useDispatch();

    useEffect(()=>{
          (async () => {
              try{
                getCurrentWalletConnected();
                walletListener();
                  if(currentAccount){
                      dispatch(setBalance(await getBalance()));
                  }
              }
              catch(error){
                  console.error(error);
              }
          })()

    },[currentAccount])

    const getBalance = async () =>{
      const balance = await defaultProvider.getBalance(currentAccount);
      return formatEther(balance);
    }

    const handleWalletConnect = async () =>{
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            try {
              const accounts = await walletProvider.send(
                "eth_requestAccounts",
                []
              );
              dispatch(setAccount(accounts[0]));
              console.log(accounts[0]);
            } catch (err) {
              console.error(err.message);
            }
          } else {
            alert("Please install MetaMask");
          }
    }

    const getCurrentWalletConnected = async () =>{
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            try {
              const accounts = await walletProvider.send(
                "eth_accounts",
                []
              );
              if (accounts.length > 0) {
                dispatch(setAccount(accounts[0]));
                console.log(accounts[0]);
              } else {
                console.log("Connect to MetaMask using the Connect button");
              }
            } catch (err) {
              console.error(err.message);
            }
          } else {
            alert("Please install MetaMask");
          }
    }

    const walletListener = async () =>{
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            window.ethereum.on("accountsChanged", (accounts) => {
              dispatch(setAccount(accounts[0]));
              console.log(accounts[0]);
            });
          } else {
            dispatch(setAccount(""));
            alert("Please install MetaMask");
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
                            <p className={styles.statusText}>Balance: </p>
                            <p className={styles.address}>{currentBalance} eth</p>
                        </div>

                        <div className={styles.addressContainer}>
                            <p className={styles.addressText}>User: </p>
                            <p className={styles.address}>{currentAccount.substring(0,6)}...{currentAccount.substring(38)}</p>
                        </div>

                    </div> : <div className={styles.mainPart}>

                        <StyledButton variant='raised' size='lg' primary fullWidth onClick={handleWalletConnect}><p className={styles.button}>Connect wallet</p></StyledButton>

                    </div>}
        </div>
    );
}
 
export default walletConnect;