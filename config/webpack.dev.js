var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    target: 'node',
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'server.js'
    },
    module:{
        rules:[{
            test: /\.js?$/,
            include: [
                path.resolve( __dirname, "../src" )
            ],
            exclude: [
                path.resolve( __dirname, "../node_modules")
            ],
            loader: "babel-loader",
            options:{
                presets: ["es2015","stage-3"]
            }
        }]
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    },
    plugins:[
        new NodemonPlugin()
    ]
}