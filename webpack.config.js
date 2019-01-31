const devMode = process.env.NODE_ENV !== 'production'
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    entry: "./src/index.tsx",
    output: {
        //path: path.resolve(__dirname, "dist"),
        filename: "./rm-cs-bundle-[hash:6].js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    devServer: {
        open: false,
        host: 'local.lazada.test',
        port: 8080,
        overlay: true,
        disableHostCheck: true,
        historyApiFallback: {
            rewrites: [
                { from: /\/m\//, to: '/m' },  // For all unknown path starting with "/m/", fallback to /m
                { from: /\.css$/, to: '/rm-cs-bundle-[hash:6].css' },   // For nginx host page ("/customer-support/")
                { from: /\.js$/, to: '/rm-cs-bundle-[hash:6].js' }
            ]
        }
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".scss"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            {
                test: /\.html$/,
                use: 'raw-loader'
            },

            // style-loader: creates style tags from JS strings
            //   css-loader: translates CSS into JS strings
            //  sass-loader: translates Sass into CSS
            //   node-sassr: Sass compiler used by the loader above
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:6]',
                        }
                    },
                    "sass-loader"
                ]
            },

            {
                test: /\.(jpg|png|gif|svg|pdf|ico)$/,
                use: [
                    { loader: 'url-loader' }
                ]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'm/index.html',
            template: './mobile.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            template: './desktop.html',
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: "rm-cs-bundle-[hash:6].css",
            chunkFilename: "[name].css"
        }),
        new CopyWebpackPlugin([
            { from: './lib/**/*', to: './' }
        ])
    ],

    externals: {
        Mtop: 'mtop'
    }
};