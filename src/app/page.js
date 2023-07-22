import styles from './styles/page.module.css';
import Image from 'next/image';
import logo from '../../public/Icons/LOGO.png';

export default function Home() {
  return (
      <main className={styles.body}>
            <header className={styles.header}>PixelDEX protocol, Landing page - Copyright (C) 2023, MetaZK </header>
        <div className={styles.ramka}>
        <div className={styles.logo}>
            <Image src={logo}  alt="PixelDEX logo" />
        </div>
        <div className={styles.content}><h3>Welcome to PixelDEX!</h3>
                <p>This project was created as part of the De-Fi Blockchain hackathon based on the EVM-compatible ComUnity blockchain. 
                At the moment the functionality is limited to regular swaps and liquidity pools. 
                </p>
                <div className={styles.note}>
                    <p>Using our app on a mobile device? Please switch to desktop view for better usability.</p>
                </div>
              
                <h1><a className={styles.link} href="">&#8227; Launch App</a></h1>
                <h1><a className={styles.link} href="">&#8227; Our GitHub</a></h1>
                <h1><a className={styles.link} href="">&#8227; Socials</a></h1>
        </div>
    </div>
    <h1 className={styles.version}>v01.00</h1>
    </main>
  )
}
