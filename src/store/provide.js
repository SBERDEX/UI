'use client';

import { Provider } from "react-redux";
import {store} from "./store";
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { styleReset } from 'react95';
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'

const GlobalStyles = createGlobalStyle`
  ${styleReset}
`;

const config = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: goerli,
      transport: http()
    }),
  })

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