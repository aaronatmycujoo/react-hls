const browserSync = require('browser-sync')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('./webpack.config')
const bundler = webpack(webpackConfig)

browserSync({
    server: {
        baseDir: __dirname,
        middleware: [
            webpackDevMiddleware(bundler, {
                // IMPORTANT: dev middleware can't access config, so we should provide publicPath by ourselves
                publicPath: webpackConfig.output.publicPath,
                stats: { colors: true }

                // for other settings see
                // http://webpack.github.io/docs/webpack-dev-middleware.html
            }),
            webpackHotMiddleware(bundler)
        ]
    },
    files: ['index.html', './src/**/*']
});
