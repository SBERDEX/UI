'use client';
import styles from "./swapWindow.module.css"
import { TextInput, Select, Button } from "react95";
import styled from "styled-components";
import Image from "next/image";
import switchIcon from "../../../public/Icons/switch.png";

const StyledInput = styled(TextInput)`
    height: 50px;
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
    color: #000000;
`

const SwitchButton = styled(Button)`
    height: 50px;
    width: 40px;
    margin-bottom: 15px;
    margin-left: 170px;
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
                        <StyledSelect defaultValue={0} width={110} options={currencies} />
                    </div>


                    <SwitchButton>
                        <Image src={switchIcon} width={31} height={32} alt="Switch icon" />
                    </SwitchButton>

                    <div className={styles.inputContainer}>
                        <StyledInput fullWidth type="number"  placeholder="Type here..."/>
                        <StyledSelect defaultValue={1}  width={110} options={currencies} />
                    </div>

                    <div className={styles.rate}>
                        <p className={styles.rateText}>{"1"} {"USDT"} = {"80"} {"RUBT"}</p>
                    </div>

                </div>

            </div>
        </>
    );
}
 
export default SwapWindow;