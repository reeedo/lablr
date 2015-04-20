
var React = require('react');

var Hello = React.createClass({
	render: function() {
		return <h1>Hello from react</h1>
	}
});

/* <Hello/> is replaced by the render return value above */
React.render(<Hello name="larry"/>, document.body);


