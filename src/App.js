import React from 'react';
import MultipleChoice from './MultipleChoice'
import Checkbox from './Checkbox'

export default class App extends React.Component {
  state = {
    checked: false,
  }

  render() {
    return (
        <Checkbox
          text="A checkbox"
          onChange={e => this.setState({ checked: e.target.checked })}
          checked={this.state.checked} />
    );
  }
}
