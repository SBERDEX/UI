'use client';
import styles from "./swapWindow.module.css"
import { TextInput, Select } from "react95";
import styled from "styled-components";

const StyledInput = styled(TextInput)`
    height: 50px;
    font-family: 'Grotesque';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
`

const StyledSelect = styled(Select)`
    height: 50px;
    font-family: 'Grotesque';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
    color: #000000;
`

const SwapWindow = () => {
    const currencies = [
        { value: "usdt", label: "USDT" },
        { value: "eth", label: "ETH" }
    ];

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.header}>
                    <p className={styles.headerText}>Swap</p>
                </div>

                <div className={styles.body}>
                    <div className={styles.inputContainer}>
                        <StyledInput fullWidth type="number"  placeholder="Type here..."/>
                        <StyledSelect width={110} options={currencies} />
                    </div>
                </div>

                
            </div>
        </>
    );
}
 
export default SwapWindow;