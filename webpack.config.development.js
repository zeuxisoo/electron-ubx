var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var vue = require("vue-loader");
var webpack = require("webpack");
var discardComments = require('postcss-discard-comments');
var StringReplacePlugin = require('string-replace-webpack-plugin');

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
                presets: ['es2015', 'stage-0'],
                plugins: ['transform-runtime']
            }
        }, {
            test: /\.json$/,
            loader: 'json-loader'
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
        }, {
            // Fix
            // - define cannot be used indirect in request/http-signature/jsprim/json-schema package
            // - ref: https://github.com/kriszyp/json-schema/issues/59
            test: /validate.js$/,
            include: /node_modules\/json-schema/,
            loader: StringReplacePlugin.replace({
                replacements: [{
                    pattern: /\(\{define:typeof define!="undefined"\?define:function\(deps, factory\)\{module\.exports = factory\(\);\}\}\)\./ig,
                    replacement: function(match, p1, offset, string) {
                        return false;
                    }
                }]
            })
        }]
    },
    vue: {
        css: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader?sourceMap")
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    postcss: function() {
        return [discardComments({ removeAll: true })]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css", {
            disable: false
        }),
        new StringReplacePlugin()
    ],
    devtool: '#source-map',
    devServer: {
        stats: {
            cached: false
        }
    }
}
