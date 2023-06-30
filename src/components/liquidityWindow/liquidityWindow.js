'use client';
import styles from "./liquidityWindow.module.css"
import styled from "styled-components";
import { NumberInput, Button } from "react95"
import Pairs from "./liquidityWindowComponents/pairs/pairs";

const StyledNumberInput = styled(NumberInput)`
    font-family: 'Grotesque';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 32px;
`

const StyledButton = styled(Button)`
    font-family: 'Grotesque';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
`

const LiquidityWindow = () => {
    const currenciesFirst = [
        { value: "usdt", label: "USDT" },
        { value: "eth", label: "ETH" }
    ];

    const currenciesSecond = [
        { value: "eth", label: "ETH" },
        { value: "usdt", label: "USDT" },   
    ];

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
                    <p className={styles.mainText}>Set a price range:</p>
                    <p className={styles.smallText}>Max price</p>
                    <StyledNumberInput width={376} defaultValue={1995}/>
                    <p className={styles.smallText}>Min price</p>
                    <StyledNumberInput width={376} defaultValue={2010}/>
                    <StyledButton fullWidth>Full range</StyledButton>
                </div>

            </div>

        </div> 
    );
}
 
export default LiquidityWindow;