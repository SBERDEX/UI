'use client';

import { Provider } from "react-redux";
import {store} from "./store";
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { styleReset } from 'react95';
import { WagmiConfig, configureChains, chain, createConfig } from 'wagmi'
import { createClient, createPublicClient, http } from 'viem'
import { goerli } from "viem/chains";
import {publicProvider} from 'wagmi/providers/public'
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';
// import defaultProvider from "@/abi/defaultProvider";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
`;

const {chains, publicClient} = configureChains(
    [goerli], 
    [publicProvider()]
)

const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({chains: [chains]}),
    ],
    publicClient
})

// const config = createConfig({
//     client
// })

export function Providers({children}){
    return(
        <Provider store={store}>
            <WagmiConfig config={config}   >
                <GlobalStyles />
                <ThemeProvider theme={original}>
                    {children}
                </ThemeProvider>      
            </WagmiConfig>
   
        </Provider>
    )
}