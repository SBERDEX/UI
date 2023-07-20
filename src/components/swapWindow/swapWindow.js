'use client';
import styles from "./swapWindow.module.css";
import { TextInput, Select, Button, NumberInput } from "react95";
import styled from "styled-components";
import Image from "next/image";
import switchIcon from "../../../public/Icons/switch.png";
import updateIcon from "../../../public/Icons/updateIcon.png";
import gearIcon from "../../../public/Icons/SetGear.png";
import { useEffect, useState } from "react";

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
    const [slippage, setSlippage] = useState(0.1);
    const [token0, setToken0] = useState(0);
    const [token1, setToken1] = useState(0);

    const [zeroForOne, setZeroForOne] = useState(true);
    const [amount0, setAmount0] = useState(0);
    const [amount1, setAmount1] = useState(0);
    const [tokenIn, setTokenIn] = useState();
    const [manager, setManager] = useState();
    const [quoter, setQuoter] = useState();
    const [loading, setLoading] = useState(false);
    const [addingLiquidity, setAddingLiquidity] = useState(false);
    const [removingLiquidity, setRemovingLiquidity] = useState(false);
    const [tokens, setTokens] = useState();
    const [path, setPath] = useState();
    const [pathFinder, setPathFinder] = useState();

    const currenciesFirst = [
        { value: "usdt", label: "USDT" },
        { value: "eth", label: "ETH" }
    ];

    const currenciesSecond = [
        { value: "eth", label: "ETH" },
        { value: "usdt", label: "USDT" },   
    ];

    const handleNumberInputChange = (value) => {
        // Do something with the updated value
        if(value !== NaN){
            console.log(value)
            setSlippage(value);
        }
    };

    const handleToken0Change = (value) => {
        console.log(value.target.value)
        setToken0(value.target.value);
    }

    const handleToken1Change = (value) => {
        console.log(value.target.value)
        setToken1(value.target.value);
    }

    useEffect(() =>{
        
    })

    return (
        <>
            <div className={styles.mainContainer}>

                <div className={styles.header}>
                    <p className={styles.headerText}>Swap</p>
                </div>

                <div className={styles.body}>
                    <div className={styles.inputContainer}>
                        <StyledInput fullWidth type="number" onChange={handleToken0Change}  placeholder="Enter amount of tokens"/>
                        <StyledSelect width={110} options={currenciesFirst} />
                    </div>


                    <SwitchButton variant='flat'>
                        <Image src={switchIcon} width={31} height={32} alt="Switch icon" />
                    </SwitchButton>

                    <div className={styles.inputContainer}>
                        <StyledInput fullWidth type="number" onChange={handleToken1Change}  placeholder="Enter amount of tokens"/>
                        <StyledSelect  width={110} options={currenciesSecond} />
                    </div>

                    <div className={styles.rate}>
                        <p className={styles.rateText}>{"1"} {"USDT"} = {"80"} {"RUBT"}</p>
                        <Button square>
                            <Image src={updateIcon} width={25} alt="Refrash rate icon"/>
                        </Button>
                    </div>

                    <div className={styles.slippage}>
                        <p className={styles.slippageText}>
                            Slippage tolerance: 
                        </p>
                        {/* <Button square variant='flat'>
                            <Image src={gearIcon} width={25} alt="Slippage settings Icon"/>
                        </Button> */}
                        <NumberInput defaultValue={slippage}  onChange={handleNumberInputChange} width={80}  min={0.1} max={100} step={0.1}/>
                    </div>

                    <SwapButton><p className={styles.swapButtonText}>Swap</p></SwapButton>

                </div>

            </div>
        </>
    );
}
 
export default SwapWindow;