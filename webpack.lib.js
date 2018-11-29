'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        authentication: './src/components/authentication.jsx'
    },
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
        path: path.resolve(__dirname, './lib'),
        library: 'authentication',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|mts|js|jsx|mjs)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                loader: require.resolve('ts-loader')
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: require.resolve('file-loader'),
                options: {
                    name: 'media/[name].[ext]',
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    resolve: {
        extensions: [ '.mjs', '.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.json', '.web.jsx', '.jsx' ]
    },
    plugins: [
        new CleanWebpackPlugin(['lib']),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].chunk.css',
        })
    ]
}