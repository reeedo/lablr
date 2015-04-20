import React from 'react'
import app from 'ampersand-app'
import LocalLinks from 'local-links'

export default React.createClass({
	/* listener for any click event */
	onClick (event) {
		/* protects from stuff like ctrl-click, etc, and makes sure link is not external */
		const pathname = LocalLinks.getLocalPathname(event)

		if (pathname) {
			event.preventDefault()
			/* navigate */
			app.router.history.navigate(pathname)
		}
	},
	render() {
		return (
			<div onClick={this.onClick}>
				{this.props.children}
			</div>
		)
	}
})