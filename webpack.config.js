const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	 devServer: {
      contentBase: './dist',
      hot: true,
    },
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(svg)$/,
				use: ['file-loader'],
			},
		],
	},
	resolve: {
		alias: {
			'components': path.resolve(__dirname, 'src/components/'),
			'utilities': path.resolve(__dirname, 'src/utilities/'),
		},
		extensions: ['.js', '.jsx'],
	}
};