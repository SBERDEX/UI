'use client';

import { Provider } from "react-redux";
import {store} from "./store";
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { MenuList, MenuListItem, Separator, styleReset } from 'react95';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
`;

export function Providers({children}){
    return(
        <Provider store={store}>
            <GlobalStyles />
            <ThemeProvider theme={original}>
                {children}
            </ThemeProvider>
        </Provider>
    )
}