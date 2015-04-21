import app from 'ampersand-app'
import Router from 'ampersand-router'
import React from 'react'
/* grabs 'export default' class from ./pages/public and names it 'PublicPage' */
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import MessagePage from './pages/message'
import RepoDetail from './pages/repo'
import Layout from './layout'
import qs from 'qs'
import xhr from 'xhr'

/* auth is called at init time, but it returns function that is called when route is accessed */
const auth = function(name) {
	return function() {
		/* check if user is logged in before executing route */
		if (!this[name]) {
			this.redirectTo('404')
		}
		if (app.me.isLoggedIn) {
			this[name].apply(this, arguments)
		}
		else {
			this.redirectTo('/')
		}
	}
}

/* equivalent to module.exports in Node
	client can import this default class from this module and give it a name
	ex: import Router from './router' - see app.js
*/
export default Router.extend({
	/* Page is class, this installs class in layout element and renders to the body */
	renderPage (Page, opts = {}) {
		const Main = (
			/* pass the user object into the Layout */
			<Layout me={app.me}>
				<Page {...opts}/>
			</Layout>
		)

		React.render(Main, document.body)
	},

	routes: {
		"": 'public',
    	'repos': auth('repos', 'super-user'),
    	'repos/:name/:repoName': auth('repoDetail', 'super-user'),
		'login': 'login',
		'logout': 'logout',
		/* define the auth callback route */
		'auth/callback?code=:code': 'authCallback',
		'*404': 'fourOhFour'
	},

	public() {
		React.render(<PublicPage/>, document.body)
	},

	repos () {
		/* note that we don't use tags because we will put them in in renderPage */
		this.renderPage(ReposPage, {repos: app.me.repos})
	},

	repoDetail (name, repoName) {
		const repo = app.me.repos.getByFullName(name + '/' + repoName)
		this.renderPage(RepoDetail, {repo, labels: repo.labels})
	},

	login () {
		window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
			scope: 'user,repo',
			redirect_uri: window.location.origin + '/auth/callback',
			client_id: 'f8dd69187841cdd22a26'
		})
	},

	authCallback (code) {
		/* do ajax call to the auth url with the client id */
		xhr({
			url: 'http://labelr-dev.herokuapp.com/authenticate/' + code,
			json: true
		}, (err, resp, body) => {
			/* if no error, body contains auth token */
			if (err) {
 		    	this.renderPage(MessagePage, {title: 'Sorry', body: 'did not work'})
				console.error('bad auth code')
			}
			console.log('code from redirect ' + body.token)
			/* store the token in the user model, which persists to local storage */
			app.me.token = body.token
			/* finally, we can redirect to the logged in page */
			this.redirectTo('/repos')
		})
		this.renderPage(MessagePage, {title: 'Logging into GitHub', body: '!!'})
	},

	logout () {
		/* make SURE nothing left in local storage */
		window.localStorage.clear()
		window.location = '/'
	},

	fourOhFour () {
		this.renderPage(MessagePage, {title: '404', body: 'nothing to see here'})
	}

})

