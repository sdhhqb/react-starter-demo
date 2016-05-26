var webpack = require("webpack");
var path = require("path");

var config = {
	entry: './js/index.js',

	output: {
		path: './build/',
		filename: 'bundle.js',
		publicPath: '/build/',
		chunkFilename: "[id].bundle.js"
	},

	module: {
		loaders: [
			{
				test: /\.js$/, 
				include: [
					path.resolve(__dirname, "js")
				],
				exclude: [
					path.resolve(__dirname, "build"),
					path.resolve(__dirname, "node_modules")
				],
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	},

	plugins: []
};



// 生产环境打包时，可以增加一些配置，比如 代码压缩，source-map，文件名添加hash等。
var env = process.env.NODE_ENV;
console.log("node env: \x1b[32m" + env + "\x1b[0m");
if (env === 'production') {
	// 将代码中的process.env.NODE_ENV替换为production，方便webpack压缩代码
	config.plugins.push(
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		})
	);
	// 压缩代码
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);
	// 开启sourcemap
	config.devtool = "source-map";
	// publicPath改为相对路径，发布时build可能不在根目录下
	config.output.publicPath = "./build/";
	// 开启文件名添加hash
	// config.output.filename = "[hash].bundle.js";
	// config.output.chunkFilename = "[id].[hash].bundle.js";
}

module.exports = config;