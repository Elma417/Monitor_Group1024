const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const UploadSourceMapPlugin = require("upload-sourcemap-plugin");

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
		// new UploadSourceMapPlugin(),
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
};
