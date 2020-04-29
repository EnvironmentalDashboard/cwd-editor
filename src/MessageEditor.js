import React from 'react';
import TextField from '@material-ui/core/TextField';

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
    const { messages, gauges } = this.state;

    return (
      <div className="MessageEditor">
        <form>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            size="small"
            margin="normal"
            variant="outlined"
          />
        </form>
        {messages.map((m, index) =>
          <form> <TextField
                    id="outlined-basic"
                    label={`Message ${index + 1}`}
                    variant="outlined"
                    size="small"
                    margin="normal"
                    defaultValue={m.text}
                  />
                  <TextField
                    type="number"
                    style={{width: 75}}
                    id="outlined-basic"
                    label={`Prob ${index + 1}`}
                    variant="outlined"
                    size="small"
                    margin="normal"
                    defaultValue={m.probability}
                  />
          </form>)}

        {/* Maybe make a GaugeDisplay comment or something... */}
        {gauges.map(g => g.url)}
      </div>
    )
  }
}

export default MessageEditor;
