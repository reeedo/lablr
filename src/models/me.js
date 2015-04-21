import Model from 'ampersand-model'
import githubMixin from '../helpers/github-api-mixin'
import Repos from './repos'

/* note mixin is overridden by anything in the later definition */
export default Model.extend(githubMixin, {
	/*  */
	url: 'https://api.github.com/user',

	collections: {
		repos: Repos
	},

	/* called when model is created
		sets auth token if it already exists
		installs handler when token changes
		'change:token' is called whenever model 'token' property is set
	*/
	initialize () {
		const token = window.localStorage.token

		if (token) {
			this.token = token
		}

		this.on('change:isLoggedIn', this.fetchAll)
		
		this.on('change:token', () => {
			window.localStorage.token = this.token
		})

	},
	/* can't just add props, need to predefine them with type */
	props: {
		token: 'string',
		login: 'string'
	},
	/* derived props are named, depend on other props, and have derivation function,
		value is cached until a dependency changes.
	 */
	derived: {
		isLoggedIn: {
			deps: ['token'],
			fn () {
				return !!this.token
			}
		}
	},

	fetchAll () {
		if (this.isLoggedIn) {
			this.fetch()
			this.repos.fetch()
		}
	}
})