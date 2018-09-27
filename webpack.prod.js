/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-05-20 13:48:08
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-27 16:18:36
 */
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const WebpackOnBuildPlugin = require('on-build-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TohoLogPlugin = require('toho-log-plugin');
const { commonModule, commonPlugin } = require('./webpack.common');

const dev = !!process.argv.toString().includes('development');

let plugins = commonPlugin;

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

plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

plugins.push(new TohoLogPlugin({ dev }));

!dev && plugins.push(new CleanWebpackPlugin(['dist'], {
	verbose: false
}));

const options = {
	mode: dev ? 'development' : 'production',
	// watch: dev,
	devServer: {
		port: 9099
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devtool: dev ? 'source-map' : '',
	entry: {
		main: __dirname + '/src',
	},
	output: {
		path: __dirname + '/dist/lib/main',
		filename: '[name].js',
		chunkFilename: dev ? 'main/vendor/[name].[chunkHash:8].js' : 'main/vendor/[name].js'
	},
	plugins,
	module: commonModule
};

dev && webpack(options).watch({}, () => {});

!dev && webpack(options).run();