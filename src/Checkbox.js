import React from 'react'
import PropTypes from 'prop-types'

export default class Checkbox extends React.Component {
  render () {
    return (
      <label>
        <input type='checkbox'
               checked={Boolean(this.props.checked)}
               onChange={this.props.onChange} />
        { this.props.text }
      </label>
    )
  }
}

Checkbox.propTypes = {
  text: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}
