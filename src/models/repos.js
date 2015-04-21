import Collection from 'ampersand-rest-collection'
import githubMixin from '../helpers/github-api-mixin'
import Repo from './repo'

export default Collection.extend(githubMixin, {
	url: 'https://api.github.com/user/repos',

	model: Repo,

	getByFullName (fullName) {
		/* if key is same as variable name, can use ust variable name */
		/* 'let' allows the value to be changed, as opposed to 'const' which doesn't */
		let model = this.findWhere({ full_name: fullName})
		/* if couldn't find it, create a dummy for it */
		if (!model) {
			model = new Repo({ full_name: fullName })
		}
		/* make sure data is current */
		model.fetch()
		return model
	}
})