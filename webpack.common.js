/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-17 17:23:54
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-07 15:37:44
 */
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	commonModule: {
		rules: [
			{
				test: /\.(png|jpg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				},
			},
		]
	},
	commonPlugin: [
		new htmlWebpackPlugin({ // 生成html
			template: './src/index.html',
			hash: true,
			minify: {
				minifyJS: true,
				minifyCSS: true,
				removeComments: true,
				collapseWhitespace: true,
			}
		}),
		new CopyWebpackPlugin([
			{
				from: __dirname + '/src/assets',
				to: __dirname + '/dist/assets'
			},
			{
				from: __dirname + '/mock',
				to: __dirname + '/dist/mock'
			},
			{
				from: __dirname + '/thirdModules',
				to: __dirname + '/dist/thirdModules'
			},
			{
				from: __dirname + '/src/guide',
				to: __dirname + '/dist/guide'
			}
		])
	]
};