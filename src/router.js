import app from 'ampersand-app'
import Router from 'ampersand-router'
import React from 'react'
/* grabs 'export default' class from ./pages/public and names it 'PublicPage' */
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import Layout from './layout'
import qs from 'qs'

/* equivalent to module.exports in Node
	client can import this default class from this module and give it a name
	ex: import Router from './router' - see app.js
*/
export default Router.extend({
	/* Page is class, this installs class in layout element and renders to the body */
	renderPage (Page, opts) {
		const Main = (
			<Layout>
				<Page/>
			</Layout>
		)

		React.render(Main, document.body)
	},

	routes: {
		"": 'public',
		'repos': 'repos',
		'login': 'login',
		'auth/callback?code=:code': 'authCallback'
	},

	public() {
		React.render(<PublicPage/>, document.body)
	},

	repos () {
		/* note that we don't use tags because we will put them in in renderPage */
		this.renderPage(ReposPage)
	},

	login () {
		window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
			scope: 'user,repo',
			redirect_uri: window.location.origin + '/auth/callback',
			client_id: 'f8dd69187841cdd22a26'
		})
	},

	authCallback (code) {
		console.log('code from redirect', code)
		this.repos()
	}
})

