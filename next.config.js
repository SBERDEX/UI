/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        networkName: "goerli",
        factoryAddress: '0x0630e95DEcF7A8C171f41CD36f29741cE2Bb0b49',
        quoterAddress: '0x772e6e8abA0d91E599514ADF40f505D9FDc06d7c',

        ABIs: {
            'ERC20': require('./src/abi/ERC20.json'),
            'Factory': require('./src/abi/Factory.json'),
            'Manager': require('./src/abi/Manager.json'),
            'Pool': require('./src/abi/Pool.json'),
            'Quoter': require('./src/abi/Quoter.json')
          }
    },
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    }
      
}

module.exports = nextConfig

  
