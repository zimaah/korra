module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,txt,png,jpg,html,json}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};