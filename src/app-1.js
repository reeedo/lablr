import React from 'react'
import styles from './styles/main.styl'

const Hello = React.createClass({
	render () {
		return <div className="hello">Hello {this.props.name}</div>;
	}
})

React.render(<Hello name="larry"/>, document.body)
