const merge = require('webpack-merge');
const commonConfig = require('./common.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(commonConfig, {
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    }
});
