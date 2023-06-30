import styles from "./page.module.css"
import LiquidityWindow from "@/components/liquidityWindow/liquidityWindow";

const Loquidity = () => {
    return ( 
        <div className={styles.mainContainer}>
            <LiquidityWindow /> 
        </div>
    );
}
 
export default Loquidity;