const merge = require('webpack-merge');
const commonConfig = require('./common.config.js');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');

module.exports = merge(commonConfig, {
    devtool: "source-map",
    plugins: [
        new CompressionPlugin({
            compressionOptions: {
                numiterations: 15
            },
            algorithm(input, compressionOptions, callback) {
                return zopfli.gzip(input, compressionOptions, callback);
            }
        })
    ]
});
