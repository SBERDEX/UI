/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        networkName: "goerli",
    },
    rules: [
        // Другие правила...
        
        {
          test: /\.woff2$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        }
      ]
      
}

module.exports = nextConfig

module.exports = {
    // Другие настройки Next.js...
  
    webpack: (config, { dev, isServer }) => {
      // Другие настройки Webpack...
  
      // Настройки для загрузчиков
      config.module.rules.push({
        test: /\.woff2$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      });
  
      // Вернуть измененную конфигурацию Webpack
      return config;
    }
  };
  
