import React from 'react'
import ampersandReactMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandReactMixin],

  getInitialState () {
    const {color, name} = this.props.label
    return {
      color,
      name
    }
  },

  onEditClick (e) {
    e.preventDefault()

    const {label} = this.props

    label.editing = !label.editing

    if (!label.editing) {
    	/* user canceled editing */

    }
  },

  onChangeName (e) {
  	/* set state, not model value */
  	this.setState({
  		name: e.target.value
  	})
  },

  onChangeColor (e) {
  	/* set state, not model value */
  	this.setState({
  		color: e.target.value
  	})
  },

  onDeleteClick (e) {
    e.preventDefault()
  },

  onFormSubmit (e) {
  	e.preventDefault()

  	const {label} = this.props

  	label.update(this.state)
  	label.editing = false
  },

  render () {
    const {label} = this.props
    /* this.state is set by this.getInitialState() */
    const {color, name} = this.state
    const backgroundColor = `#${color}`
    const styles = {backgroundColor}

    /* can return completely different rendering based on state */
    if (label.editing) {
      return(
        <form className='label' onSubmit={this.onFormSubmit}>
          <span className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
          <input value={name} onChange={this.onChangeName} name='name'/>
          <input value={color} onChange={this.onChangeColor} name='color'/>
          <button type='submit' className='button button-small'>Save</button>
          <button onClick={this.onEditClick} type='button' className='button button-small button-unstyled'>cancel</button>
        </form>
      )
    }

    else {
      /* note double braces: inner set defines value as js object, outer set is react syntax to insert value */
      return (
        <div className='label'>
          <span style={styles} className='label-color'>&nbsp;</span>
          <span>{label.name}</span>
          <button onClick={this.onEditClick} className='octicon octicon-pencil'></button>
          <button onClick={this.onDeleteClick} className='octicon octicon-x'></button>
        </div>
      )
    }

  }
})