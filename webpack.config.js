
module.exports = {
	entry: './index.js',
	module: {
		loaders: [
			{ test: /\.(txt|csv|dat)$/, loader: 'raw-loader' },
		],
		noParse: /js-priority-queue/,
	},
	devServer: {
		inline: true,
		port: 8081,
	},
}

