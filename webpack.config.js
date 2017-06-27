var webpack = require("webpack");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname + "dist/assets",
		filename: "bundle.js",
		publicPath: "assets"
	},
	devServer: {
		inline: true,
		contentBase: './dist',
		port: 4000,
		historyApiFallback : true
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				use: "babel-loader"
			},
			{
		        test: /\.svg$/,
		        loader: 'svg-inline-loader'
			},
			{
		    	test: /\.scss$/,
      			loader: 'style-loader!css-loader!sass-loader'
		    }
		]
	}
}
