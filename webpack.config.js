const webpack = require('webpack')
const path = require('path')

module.exports = {
    debug: true,
    devtool: '#eval-source-map',
    context: path.join(__dirname, 'src'),

    entry: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './dev'],

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
        ],
    },
};
