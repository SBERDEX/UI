import styles from './styles/page.module.css'
import WalletConnect from "../components/wallet/walletCnnect"

export default function Home() {
  return (
      <main>
        <h1 style={{color: 'pink'}}>I am not Uniswap</h1>
        <h1 style={{color: '#008000'}}>Sorry mamma Imma SberDex</h1>

        <WalletConnect />
      </main>
  )
}
