const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { entry, htmlWebpackPlugins } = require('./entryConfigs');

module.exports = {
	entry,
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash:8].js',
	},
	mode: 'development',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /.js*$/,
				use: 'babel-loader',
			},
			{
				test: /\.(css|less)$/,
				use: ['style-loader', 'css-loader', 'less-loader',
					{
						loader: 'px2rem-loader',
						options: {
							remUnit: 75,
							remPrecision: 8
						}
					}],
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							name: 'img/[name][hash:8].[ext]'
						},
					}
				],
			}
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
		...htmlWebpackPlugins
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		hot: true
	}
}
