'use client';
import styles from "./swapWindow.module.css";
import { TextInput, Select, Button } from "react95";
import styled from "styled-components";
import Image from "next/image";
import switchIcon from "../../../public/Icons/switch.png";
import updateIcon from "../../../public/Icons/updateIcon.png";
import gearIcon from "../../../public/Icons/SetGear.png";

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

const SwapButton = styled(Button)`
    height: 60px;
`

const SwapWindow = () => {

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
            <div className={styles.mainContainer}>

                <div className={styles.header}>
                    <p className={styles.headerText}>Swap</p>
                </div>

                <div className={styles.body}>
                    <div className={styles.inputContainer}>
                        <StyledInput fullWidth type="number"  placeholder="Type here..."/>
                        <StyledSelect width={110} options={currenciesFirst} />
                    </div>


                    <SwitchButton variant='flat'>
                        <Image src={switchIcon} width={31} height={32} alt="Switch icon" />
                    </SwitchButton>

                    <div className={styles.inputContainer}>
                        <StyledInput fullWidth type="number"  placeholder="Type here..."/>
                        <StyledSelect  width={110} options={currenciesSecond} />
                    </div>

                    <div className={styles.rate}>
                        <p className={styles.rateText}>{"1"} {"USDT"} = {"80"} {"RUBT"}</p>
                        <Button square>
                            <Image src={updateIcon} width={25} alt="Refrash rate icon"/>
                        </Button>
                    </div>

                    <div className={styles.slippage}>
                        <p className={styles.slippageText}>Slippage tolerance: {0.1}&#37;</p>
                        <Button square variant='flat'>
                            <Image src={gearIcon} width={25} />
                        </Button>
                    </div>

                    <SwapButton><p className={styles.swapButtonText}>Swap</p></SwapButton>

                </div>

            </div>
        </>
    );
}
 
export default SwapWindow;