import Router from 'ampersand-router'

/* equivalent to module.exports in Node*/
export default Router.extend({
	routes: {
		"": 'public',
		'repos': 'repos'
	},

	public() {
		console.log('public page')
	},

	repos () {
		console.log('repos page')
	}
})

