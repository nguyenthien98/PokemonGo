//webpack.config.js
var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'client'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/react']
                    }
                }
            ],
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    }
}