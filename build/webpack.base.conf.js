const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/',
};

const pages = [];

fs
	.readdirSync(path.resolve(__dirname, '..', 'src', 'pages'))
	.filter((file) => {
		return file.indexOf('base') !== 0
	})
	.forEach((file) => {
		pages.push(file.split('/', 2))
	});

module.exports = {
	externals: {
		paths: PATHS,
	},

	entry: {
		index: `${PATHS.src}/index.js`,
	},

	output: {
		filename: `${PATHS.assets}js/[name].[hash].js`,
		path: PATHS.dist,
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node-modules/',
			},

			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					pretty: true,
				},
			},

			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: `[name].[ext]`,
					outputPath: 'assets/fonts',
				},
			},

			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'assets/images',
				},
			},

			// {
			//   loader: 'image-webpack-loader',
			//   options: {
			//     mozjpeg: {
			//       progressive: true,
			//       quality: 65
			//     }
			//   }
			// },

			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {sourceMap: true},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {path: `./postcss.config.js`},
						},
					},
					{
						loader: 'sass-loader',
						options: {sourceMap: true},
					},
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								`${PATHS.src}/assets/scss/utils/vars.scss`,
								`${PATHS.src}/assets/scss/utils/mixins.scss`,
							],
						},
					},
				],
			},

			{
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {sourceMap: true},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {path: `./postcss.config.js`},
						},
					},
				],
			},
		],
	},

	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),

		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			outputPath: './assets/css',
		}),

		new CopyWebpackPlugin([
			{from: `${PATHS.src}/${PATHS.assets}images`, to: `${PATHS.assets}images`},
			{from: `${PATHS.src}/static`, to: ''},
		]),

		new HtmlWebpackPlugin({
			filename: `index.html`,
			template: `${PATHS.src}/index.pug`,
		}),

		...pages.map(fileName => new HtmlWebpackPlugin({
			filename: `${fileName}.html`,
			template: `./src/pages/${fileName}/${fileName}.pug`,
			// minify: true,
			hash: true,
		})),
	],
};