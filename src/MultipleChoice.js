import React from 'react'
import PropTypes from 'prop-types'

export default class MultipleChoice extends React.Component {
  state = {
    // Represents the currently selected choice.
    // It's falsy if there's nothing selected.
    selectedChoice: undefined,
  }

  // Just updates our selectedChoice to whatever is passed in.
  onClickChoice (choice) {
    this.setState({
      selectedChoice: choice,
    })
  }

  render () {
    return (
      <div>
        <h3>{ this.props.question }</h3>
        <ul>
          {
            // Give each choice a <li>, highlighting the selected choice.
            Object.keys(this.props.choices).map(choice => (
              <li key={choice} style={{
                background: choice === this.state.selectedChoice
                  ? '#81ff98' // Just some color, picked arbitrarily
                  : 'transparent',
              }}>
                <label>
                  <input type='checkbox'
                         // The checkbox of the selected choice should be checked
                         checked={choice === this.state.selectedChoice}
                         // Updates the selection when a choice is clicked
                         onClick={() => this.onClickChoice(choice)} />
                  <strong>{ choice }</strong>
                </label>
                <p>{ this.props.choices[choice] }</p>
              </li>
            ))
          }
        </ul>

        { (typeof this.state.selectedChoice === 'string') && (this.state.selectedChoice in this.props.choices) && (
          <p>
            You've selected <strong>{ this.state.selectedChoice }</strong>
          </p>
        )}
      </div>
    )
  }
}

MultipleChoice.propTypes = {
  // The "node" PropType is anything that can be rendered as a React element
  choices: PropTypes.objectOf(PropTypes.node).isRequired,

  question: PropTypes.node.isRequired,
}