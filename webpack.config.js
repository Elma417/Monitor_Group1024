const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UploadSourceMapPlugin = require("monitor-upload-sourcemap-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const process = require("process");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 10, // 小于10KB图片，转base64编码
				},
			},
		],
	},
	devtool: "source-map",
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "public/"),
					to: path.resolve(__dirname, "dist/"),
					globOptions: {
						ignore: ["**/*.ejs"],
					},
					noErrorOnMissing: true,
				},
			],
			options: {
				concurrency: 100,
			},
		}),
		new HtmlWebpackPlugin({ template: "./public/index.ejs" }),
		new CleanWebpackPlugin(),
		new UploadSourceMapPlugin({
			enable: process.env.NODE_ENV === "production",
			uploadURL: "http://182.61.146.211:7001/logstore/uploadMap",
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		compress: true,
		port: 5173,
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
		},
	},
	externals: {
		jquery: "jQuery",
	},
	optimization: {
		minimize: true, // 可省略，默认最优配置：生产环境，压缩 true。开发环境，不压缩 false
		minimizer: [
			new TerserPlugin({
				parallel: true, // 可省略，默认开启并行
				terserOptions: {
					toplevel: true, // 最高级别，删除无用代码
					ie8: true,
					safari10: true,
				},
			}),
		],
	},
};
