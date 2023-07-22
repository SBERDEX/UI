'use client';
import styles from "./pairs.module.css"
import styled from "styled-components";
import { Select, TextInput } from "react95";

const StyledInput = styled(TextInput)`
    height: 50px;
    width: 290px;
    font-family: 'Grotesque';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 15px;
`

const StyledSelect = styled(Select)`
    height: 50px;
    font-family: 'Grotesque';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
`

const Pairs = () => {

    const currenciesFirst = [
        { value: "usdt", label: "USDT" },
        { value: "eth", label: "ETH" }
    ];

    const currenciesSecond = [
        { value: "eth", label: "ETH" },
        { value: "usdt", label: "USDT" },   
    ];

    return ( 
        <>
                <p className={styles.mainText}>Select pair and deposit amounts:</p>
                <div>
                    <div className={styles.smallTextWrap}>
                        <p className={styles.smallText}>Token A</p>
                        <p className={styles.smallText}>Balance: {"1000"}</p>
                    </div>
                    
                    <div className={styles.inputWrap}>
                        <StyledInput type="number"  placeholder="" />
                        <StyledSelect options={currenciesFirst}  />
                    </div>

                    <div className={styles.smallTextWrap}>
                        <p className={styles.smallText}>Token B</p>
                        <p className={styles.smallText}>Balance: {"1000"}</p>
                    </div>
                    
                    <div className={styles.inputWrap}>
                        <StyledInput type="number"  placeholder="" />
                        <StyledSelect options={currenciesSecond}  />
                    </div>
                </div>
        </> 
    );
}
 
export default Pairs;