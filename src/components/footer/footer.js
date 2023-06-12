import styles from "./footer.module.css";
import Image from "next/image";
import logo from "../../../public/Icons/MZKb.png"

const Footer = () => {
    return ( 
        <div className={styles.mainContainer}>
                <Image src={logo} width={128} height={110} alt="Logo"/>
                <p className={styles.footerText}>SBERDEX by MetaZK</p>
                <p className={styles.footerText}>2023</p>
        </div>
     );
}
 
export default Footer;