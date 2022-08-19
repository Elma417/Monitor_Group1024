
const path = require('path');
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);
module.exports = {
    mode: 'production',
    entry: resolvePath('./index.js'),
    output: {
        filename: 'mini-monitor.js',
        path: resolvePath('./dist'),
        library: {
            name: 'mini-monitor',
            type: 'umd'
        }
    },
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    devtool: 'source-map'
}