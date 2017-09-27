var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./app.js",
    output: {
        path: path.join(__dirname, './client/build/scripts/'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js$/, loader : 'babel-loader' }
        ]
    }
};



