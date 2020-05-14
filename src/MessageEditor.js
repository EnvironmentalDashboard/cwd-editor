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
      gauges: []
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
      api.post(`glyphs/${this.props.id}/messages/`, {"pass" : this.inputRef.value, "text" : 'Default message', "probability" : 0}).then(result => {console.log(result)})
      messages.push({"text" : 'Default message', "probability" : 0})
      this.forceUpdate();
    }

    const password = () => {
      this.forceUpdate();
    }

    return (
      <div className="MessageEditor">
        <form>
          <TextField
            id="outlined-password-input"
            label="Enter Password to Update Messages"
            type="password"
            size="small"
            margin="normal"
            variant="outlined"
            style={{width: '16%'}}
            inputRef={ref => { this.inputRef = ref; }}
            onBlur={password}
          />
        </form>
        <div>
        {messages.map((m, index) =>
          <MessageInput
            index={index + 1}
            id={this.props.id}
            text={m.text}
            prob={m.probability}
            pass={this.inputRef.value}/>
        )}
          <Button variant="contained" onClick={addVMessage}>Add Message To View</Button>
        </div>
        {/* Maybe make a GaugeDisplay comment or something... */}
        {gauges.map((g, index) =>
          <div>
            <GaugeInput
              index={index + 1}
              id={this.props.id}
              gauge={g}
              pass={this.inputRef.value}
            />
          </div>
        )}
      </div>
    )
  }
}

export default MessageEditor;
