/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        networkName: "goerli",
    },
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    }
      
}

module.exports = nextConfig

  
