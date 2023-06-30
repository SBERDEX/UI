'use client';
import styles from "./priceRange.module.css"
import styled from "styled-components";
import { NumberInput, Button } from "react95"

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

const PriceRange = () => {
    return ( 
        <>
            <p className={styles.mainText}>Set a price range:</p>
            <p className={styles.smallText}>Max price</p>
            <StyledNumberInput width={376} defaultValue={1995}/>
            <p className={styles.smallText}>Min price</p>
            <StyledNumberInput width={376} defaultValue={2010}/>
            <StyledButton fullWidth>Full range</StyledButton>
        </> 
    );
}
 
export default PriceRange;