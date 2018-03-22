const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/js/app.js',
	// output: {
	// 	path: path.resolve(__dirname, 'dist'),
	// 	filename: 'bundle.js',
	// 	publicPath: '/dist'
	// },
	// target: 'node',
	// externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.sass$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	]
};