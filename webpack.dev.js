/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-05-20 13:48:08
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-12 09:44:08
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const TohoLogPlugin = require('toho-log-plugin');
const { commonModule, commonPlugin } = require('./webpack.common');

let plugins = commonPlugin;

// plugins.push(new webpack.HotModuleReplacementPlugin());
// plugins.push(new webpack.NamedModulesPlugin());
plugins.push(new TohoLogPlugin({ defaultWords: true }));

const devServerOptions = {
	port: 9099,
	// hot: true,
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
		// 'webpack/hot/only-dev-server',
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