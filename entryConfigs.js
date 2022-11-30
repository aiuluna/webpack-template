const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const setMPA = () => {
	const entry = {};
	const htmlWebpackPlugins = []

	const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js').replace(/\\/g, '/'));

	Object.keys(entryFiles).map(idx => {
		const entryFile = entryFiles[idx];
		const match = entryFile.match(/src\/pages\/(.*)\/index.js$/)
		const pageName = match[1].toLowerCase()
		entry[pageName] = entryFile;

		htmlWebpackPlugins[idx] = new HtmlWebpackPlugin({
			template: entryFile.replace('index.js', 'index.html'),
			filename:`${pageName}.html`,
			chunks: [pageName],
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

	})

	return { entry, htmlWebpackPlugins };
}

module.exports = setMPA()
