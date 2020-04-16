import React from 'react';

const api = require('./api.js');

class MessageEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      api.fetch(`glyphs/${this.props.id}/messages`)
      .then(messages => this.setState({ messages: messages }))
    }
  }
}
