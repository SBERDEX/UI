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

export const Siberium = {
  id: 43_114,
  name: 'Siberium',
  network: 'siberium',
  nativeCurrency: {
    decimals: 18,
    name: 'SIBR',
    symbol: 'SIBR',
  },
  rpcUrls: {
    public: { http: ['https://rpc.test.siberium.net'] },
    default: { http: ['https://rpc.test.siberium.net'] },
  },
  blockExplorers: {
    etherscan: { name: 'Siberium', url: 'https://explorer.test.siberium.net/' },
    default: { name: 'Siberium', url: 'https://explorer.test.siberium.net/' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
}


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
            <WagmiConfig config={config}>
                <GlobalStyles />
                <ThemeProvider theme={original}>
                    {children}
                </ThemeProvider>      
            </WagmiConfig>
   
        </Provider>
    )
}