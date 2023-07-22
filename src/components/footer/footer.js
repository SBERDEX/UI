'use client';
import styles from "./footer.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Footer = () => {
    const walletStatus = useSelector(state => state.isConnected.isConnected);
    const router = useRouter();
    const currentPage = router.pathname;


    return ( 
            <>
            {currentPage && (                               
                 <div className={styles.mainContainer}>
                <p className={styles.footerText}>PixelDEX by MetaZK</p>
                <div className={styles.walletStatus}>
                    {walletStatus ? <p className={styles.walletStatusText}>Wallet Connected</p> : <p className={styles.walletStatusText}>Wallet is not Connected</p>}
                    
                </div>
                </div>)}

            </>
     );
}
 
export default Footer;