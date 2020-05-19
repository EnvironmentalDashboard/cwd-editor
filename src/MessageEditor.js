import React from 'react';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button'

import MessageInput from './MessageInput.js'
import GaugeInput from './GaugeInput.js'


const api = require('./api.js');

class MessageEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      gauges: [],
      pass: ""
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id && this.props.id) {
      this.setState({
        messages: [],
        gauges: []
      });
      api.fetch(`glyphs/${this.props.id}/messages`)
      .then(messages => this.setState({ messages: messages }));

      api.fetch(`glyphs/${this.props.id}/gauges`)
      .then(gauges => this.setState({ gauges: gauges }));
    }
  }

  render() {
    let { messages, gauges } = this.state;

    const addVMessage = () => {
      api.post(`glyphs/${this.props.id}/messages/`, {"pass" : this.state.pass, "text" : "Default message", "probability" : 0}).then(result => {
        if (!result.errors) {
          this.setState({ messages: [...messages, {"text" : "Default message", "probability" : 0}]})
        }
      })
    }

    const passChange = (event) => {
      this.setState({ pass: event.target.value })
    }

    return (
      <div className="MessageEditor">
          <TextField
            id="outlined-password-input"
            label="Enter Password to Update Messages"
            type="password"
            size="small"
            margin="normal"
            variant="outlined"
            style={{width: '16%'}}
            onChange={passChange}
          />
        <div>
        {messages.map((m, index) =>
          <MessageInput
            index={index + 1}
            id={this.props.id}
            text={m.text}
            prob={m.probability}
            pass={this.state.pass}/>
        )}
          <Button variant="contained" onClick={addVMessage}>Add Message To View</Button>
        </div>
        {gauges.map((g, index) =>
            <GaugeInput
              index={index + 1}
              id={this.props.id}
              gauge={g}
              pass={this.state.pass}
            />
        )}
      </div>
    )
  }
}

export default MessageEditor;
