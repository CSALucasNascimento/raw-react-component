'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        authentication: './src/index.tsx'
    },
    output: {
        filename: 'static/js/[name].[contenthash].js',
        chunkFilename: 'static/js/[name].[contenthash].chunk.js',
        path: path.resolve(__dirname, './dist'),
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
                    name: 'static/media/[name].[hash:8].[ext]',
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.mjs', '.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.json', '.web.jsx', '.jsx' ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'public/index.html',
        })
    ]
}