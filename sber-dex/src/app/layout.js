import './styles/globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: ' ',
  description: ' ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />  
      </body>
    </html>
  )
}
