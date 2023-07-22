'use client'
import WalletConnect from "../wallet/walletCnnect";
import swapIcon from "../../../public/Icons/SwapIcon.png";
import liqIcon from "../../../public/Icons/LiqRubIcon.png";
import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation';


const Header = () => {
    const router = useRouter();
    const currentPage = router.pathname;
    console.log(currentPage)

    return ( 
    <> 
        {
            currentPage && (
                <div className={styles.mainContainer}>
                <div className={styles.linkContainer}>
                    <Link href="/liquidity">
                            <Image src={liqIcon} height={126} width={126} alt="liquidity icon"/>
                            <p className={styles.liqText}>Liquidity</p>
                    </Link>
    
                    <Link href="/swap">
                            <Image src={swapIcon} height={120} width={120} alt="swap icon"/>
                            <p className={styles.swapText}>Swap</p>
                    </Link>
                </div>
                <WalletConnect />
            </div>
            )
        }

    </> 
    );
}
 
export default Header;