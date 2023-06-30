'use client';
import styles from "./footer.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";

const Footer = () => {
    const currentAccount = useSelector(state => state.account.account);

    return ( 
        <div className={styles.mainContainer}>
                <p className={styles.footerText}>SBERDEX by MetaZK</p>
                <div className={styles.walletStatus}>
                    {currentAccount.length > 0 ? <p className={styles.walletStatusText}>Wallet Connected</p> : <p className={styles.walletStatusText}>Wallet is not Connected</p>}
                    
                </div>
        </div>
     );
}
 
export default Footer;