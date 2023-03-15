module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,txt,png,jpg,html,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};