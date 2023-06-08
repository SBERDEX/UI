import styles from "./walletConnect.module.css";

const walletConnect = () => {
    return (
        <div className={styles.mainContainer}>
             <div className={styles.header}>
                <p className={styles.headerText}>Wallet</p>
             </div>

             <div className={styles.mainPart}>
                <button className={styles.button}>Connect wallet</button>
             </div>
        </div>
    );
}
 
export default walletConnect;