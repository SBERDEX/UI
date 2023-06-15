'use client';

import { Provider } from "react-redux";
import {store} from "./store";
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

export function Providers({children}){
    return(
        <Provider store={store}>
            <ThemeProvider theme={original}>
            {children}
            </ThemeProvider>
        </Provider>
    )
}