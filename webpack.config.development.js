var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var vue = require("vue-loader");
var webpack = require("webpack");
var discardComments = require('postcss-discard-comments');

var buildPath = path.join(__dirname, "build");

module.exports = {
    target: "atom",
    entry: "./app/app.js",
    output: {
        path: buildPath,
        filename: "bundle.js",
        publicPath: 'http://localhost:2992/build/',
        pathinfo: true
    },
    module: {
        loaders: [{
            test: require.resolve('jquery'),
            loader: 'expose-loader?jQuery'
        }, {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            query: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader?sourceMap")
        }, {
            test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=image/svg+xml"
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader?sourceMap!less-loader?sourceMap")
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    vue: {
        css: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader?sourceMap")
    },
    postcss: function() {
        return [discardComments({ removeAll: true })]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css", {
            disable: false
        })
    ],
    devtool: '#source-map',
    devServer: {
        stats: {
            cached: false
        }
    }
}
