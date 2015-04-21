import app from 'ampersand-app'

export default {
	/* config used for any ajax call, this adds a header */
	ajaxConfig () {
		return {
			headers: {
				/* note parameterized string syntax with backticks! */
				'Authorization': `token ${app.me.token}`
			}
		}
	}
}