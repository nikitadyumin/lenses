var Webpack = require('webpack');
module.exports = {
    entry: "./src/index.js",
    output: {
        libraryTarget: "umd",
        path: './dist',
        filename: "lens.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};