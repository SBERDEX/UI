import SwapWindow from "@/components/swapWindow/swapWindow";
import styles from "./page.module.css"

const Swap = () => {
    return ( 
        <div className={styles.mainContainer}>
            <SwapWindow />
        </div> 
    );
}
 
export default Swap;