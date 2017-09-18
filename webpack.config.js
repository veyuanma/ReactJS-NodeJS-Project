var path = require('path');

var APP_DIR = path.join(__dirname, './client/src');

console.log("curr dir is " + __dirname);

module.exports = {
    entry: "./app.js",
    output: {
        path: path.join(__dirname, './client/build/scripts/'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /.js$/, loader : 'babel-loader' }
        ]
    }
};



