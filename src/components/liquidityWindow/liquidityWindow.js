import styles from "./liquidityWindow.module.css"
import Pairs from "./liquidityWindowComponents/pairs/pairs";
import PriceRange from "./liquidityWindowComponents/priceRange/priceRange";

const LiquidityWindow = () => {

    return ( 
        <div className={styles.mainContainer}>

            <div className={styles.header}>
                <p className={styles.headerText}>Liquidity and pools</p>
            </div>

            <div className={styles.body}>

                <div className={styles.section} id="pairs">
                    <Pairs />
                </div>

                <div className={styles.section} id="pools">
                    <p className={styles.mainText}>Your active pools:</p>
                </div>

                <div className={styles.section} id="fee">
                    <p className={styles.mainText}>Fee tier:</p>
                </div>

                <div className={styles.section} id="price">
                    <PriceRange />
                </div>

            </div>

        </div> 
    );
}
 
export default LiquidityWindow;