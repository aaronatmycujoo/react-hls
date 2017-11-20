const webpack = require('webpack')
const path = require('path')

let config = require('./webpack.config.js')

config.entry = [
  path.join(__dirname, 'src', 'index.js')
]

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }.
    minimize: true,
  })
)

module.exports = config
