const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
	entry: {
		index: './src/index.js',
		search: './src/search.js',
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash:8].js',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /.js*$/,
				use: 'babel-loader',
			},
			{
				test: /\.(css|less)$/,
				use: ['style-loader', 'css-loader', 'less-loader'],
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
		new CleanWebpackPlugin()
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		hot: true
	}
}
