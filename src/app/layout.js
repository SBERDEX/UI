import './styles/globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/footer'
import { Providers } from '../store/provide'
import Header from '@/components/header/header'
import StyledComponentsRegistry from './registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: ' ',
  description: ' ',
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body className={inter.className}>
          <Providers>
            <Header />
            {children}
            <Footer /> 
          </Providers>
        </body>
      </StyledComponentsRegistry>
    </html>
  )
}
