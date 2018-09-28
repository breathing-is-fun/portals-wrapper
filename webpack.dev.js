/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-05-20 13:48:08
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-28 16:43:38
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const TohoLogPlugin = require('toho-log-plugin');
const { logInfo, commonModule, commonPlugin, onCompile } = require('./webpack.common');

let plugins = commonPlugin;

plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new webpack.NamedModulesPlugin());
plugins.push(new TohoLogPlugin({ dev: true }));

plugins.push(
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
		}
	])
);

const devServerOptions = {
	port: 9099,
	hot: true,
	host: 'localhost',
	noInfo: true,
	clientLogLevel: 'error',
	contentBase: path.join(__dirname, 'src'),
};

const webpackConfig = {
	mode: 'development',
	watch: false,
	devtool: 'source-map',
	entry: [
		'webpack-dev-server/client?http://' + devServerOptions.host + ':' + devServerOptions.port,
		'webpack/hot/only-dev-server',
		__dirname + '/src',
	],
	output: {
		filename: '[name].js',
		chunkFilename: 'vendor/[name].[chunkHash:8].js'
	},
	plugins,
	module: commonModule
};

const compiler = webpack(webpackConfig);

const server = new webpackDevServer(compiler, devServerOptions);

server.listen(devServerOptions.port, devServerOptions.host);