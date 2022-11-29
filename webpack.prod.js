const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
	entry: {
		index: './src/index.js',
		search: './src/search.js',
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash:8].js',
	},
	optimization: {
		minimize: true,
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin()
		]
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /.js*$/,
				use: 'babel-loader',
			},
			{
				test: /\.(css|less)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader',
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
								require('autoprefixer')({
									overrideBrowserslist: ['last 2 versions', '>1%', 'ios 7']
								})
							]
						}
					}
				},
				{
					loader: 'px2rem-loader',
					options: {
						remUnit: 75,
						remPrecision: 8
					}
				}
				],
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
		new MiniCssExtractPlugin({
			filename: '[name][contenthash:8].css'
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'index.html'),
			filename: 'index.html',
			inject: true,
			minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true,
				removeComments: false
			}
		})
	]
}
