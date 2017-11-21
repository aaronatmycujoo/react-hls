const webpack = require('webpack')
const path = require('path')

module.exports = {
    debug: true,
    devtool: '#eval-source-map',
    context: path.join(__dirname),

    entry: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './dev.js'],

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/js/',
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel'],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: [
                    'style-loader',
                    ['css-loader', {
                        modules: true,
                        localIdentName: '[name]__[local]--[hash:base64:3]',
                    }],
                    'cssnext-loader'
                ],
            }
        ],
    },
};
