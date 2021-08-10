const MonacoPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/wasm/[modulehash].wasm',
      },
    })

    if (isServer) {
      return config
    }

    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    })

    config.module.rules.push({
      test: /\.ttf$/,
      use: 'url-loader',
    })

    config.plugins.push(
      new MonacoPlugin({
        languages: ['javascript', 'typescript'],
        filename: 'static/vs/[name].worker.js',
      })
    )

    return config
  },
}
