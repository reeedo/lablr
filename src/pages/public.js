import app from 'ampersand-app'
import React from 'react'
import LocalLinks from 'local-links'
import InternalNav from '../components/internal-nav'

export default React.createClass({
	render() {
		return (
			<InternalNav>
				<div className='container'>
				  <header role='banner'>
				    <h1>Labelr</h1>
				  </header>
				  <div>
				    <p>We label stuff for you, because, we can&trade;</p>
				    <a href='/login' className='button button-large'>
				      <span className='mega-octicon octicon-mark-github'></span> Login with GitHub
				    </a>
				  </div>
				</div>
			</InternalNav>
		)
	}
})