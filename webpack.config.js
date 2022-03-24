const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (extention) => isDev ? `[name].${extention}` : `[name].[contenthash].${extention}`;

module.exports = {
    context: path.resolve(__dirname),
    mode: 'development',
    entry: ["@babel/polyfill", './src/index.tsx'],
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
    },
    devServer:{
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port:3000
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: 'index.html',
            minify:{
                collapseWhitespace: isProd
            }
        }),

        new ForkTsCheckerWebpackPlugin(),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\/.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.scss$/,
                exclude: '/node_modules/',
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader',
                ]
            },  
            {
                test: /\/.(jpg|jpeg|png)$/,
                loader: "file-loader",
                options: {
                    name: `[path][name].[ext]`,
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules/',
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                  transpileOnly: true
                }
            },            
        ],
    },
    resolve: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.css',
          '.scss',
        ],
        alias: {
          'react-dom': '@hot-loader/react-dom'
        }
    },
}