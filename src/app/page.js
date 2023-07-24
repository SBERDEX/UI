import styles from './styles/page.module.css';
import Image from 'next/image';
import logo from '../../public/Icons/LOGO.png';
import Link from 'next/link';

export default function Home() {
  return (
      <main className={styles.body}>
            <header className={styles.header}>PixelDEX protocol, Landing page - Copyright (C) 2023, MetaZK </header>
        <div className={styles.ramka}>
        <div className={styles.logo}>
            <Image src={logo} width={685} alt="PixelDEX logo" />
        </div>
        <div className={styles.content}><h3>Welcome to PixelDEX!</h3>
                <p>This project was created as part of the De-Fi Blockchain hackathon based on the EVM-compatible ComUnity blockchain. 
                At the moment the functionality is limited to regular swaps and liquidity pools. 
                </p>
                <div className={styles.note}>
                    <p>Using our app on a mobile device? Please switch to desktop view for better usability.</p>
                </div>
              
                {/* <h1><Link className={styles.link} href="/swap">&#8227; Launch App</Link></h1> */}
                <h1><a className={styles.link} href="https://ui-interface.vercel.app/">&#8227; Launch App</a></h1>
                <h1><a className={styles.link} href="https://github.com/SBERDEX">&#8227; Our GitHub</a></h1>
                <h1><a className={styles.link} href="https://docs.google.com/document/d/1vIM0ztFx9_o7lVUaADwDeTqAqXkgK-XAW4jya5ZRJBE/edit?usp=sharing">&#8227; Guide</a></h1>
                <h1><a className={styles.link} href="https://docs.google.com/presentation/d/1ISjhCT6aBnpEKnxTiYrbqRcLVWbgthjJXLcdzbZKqow/edit#slide=id.g25abe6ef1b0_0_135">&#8227; Presentation</a></h1>
        </div>
    </div>
    <h1 className={styles.version}>v01.00</h1>
    </main>
  )
}
