import React from 'react';

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
        {messages.map(m => m.text)}

        {/* Maybe make a GaugeDisplay comment or something... */}
        {gauges.map(g => g.url)}
      </div>
    )
  }
}

export default MessageEditor;
