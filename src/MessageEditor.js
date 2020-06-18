import React from 'react'
import TextField from '@material-ui/core/TextField'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withSnackbar } from 'notistack'

import MessageInput from './MessageInput.js'
import GaugeInput from './GaugeInput.js'
import ImportButton from './ImportButton.js'


const api = require('./api.js')

class MessageEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      gauges: [],
      pass: "",
      types: ["warning", "success", "error"],
      alerts: ["Please enter a password.", "Database updated!", "Database could not  be updated!"]
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id && this.props.id) {
      this.setState({
        messages: [],
        gauges: []
      })
      api.fetch(`glyphs/${this.props.id}/messages`)
      .then(messages => this.setState({ messages: messages }))

      api.fetch(`glyphs/${this.props.id}/gauges`)
      .then(gauges => this.setState({ gauges: gauges }))
    }
  }

  updateMessages = () => {
    this.setState({
      messages: [],
      gauges: []
    })
    api.fetch(`glyphs/${this.props.id}/messages`)
    .then(messages => this.setState({ messages: messages }))

    api.fetch(`glyphs/${this.props.id}/gauges`)
    .then(gauges => this.setState({ gauges: gauges }))
  }

  showAlert = (response) => {
    let variant;
    if (response.errors) {
      (this.state.pass === "") ? variant = "warning": variant = "error"
    } else {
      variant = "success"
    }

    this.props.enqueueSnackbar(this.state.alerts[this.state.types.indexOf(variant)], { variant })
  }



  render() {
    const { messages, gauges } = this.state

    const addVMessage = () => {
      api.post(`glyphs/${this.props.id}/messages/`, {"pass" : this.state.pass, "text" : "Default message", "probability" : 0}).then(result => {
        if (!result.errors) {
          this.setState({ messages: [...messages, {"text" : "Default message", "probability" : 0}]})
        }
        this.showAlert(result)
      })
    }

    return (
      <div className="MessageEditor">
        <Grid container alignItems="center" spacing={1} style={{'margin-top': '1%', 'margin-bottom': '1%'}}>
          <Grid item>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              size="small"
              variant="outlined"
              onBlur={(event) => {this.setState({ pass: event.target.value })}}
            />
          </Grid>
          <ImportButton
            addToSnackbar={this.showAlert}
            pass={this.state.pass}
            update={this.updateMessages}
          />
        </Grid>
        <div>
        {messages.map((m, index) =>
          <MessageInput
            index={index + 1}
            id={this.props.id}
            text={m.text}
            prob={m.probability}
            pass={this.state.pass}
            addToSnackbar={this.showAlert}
            />
        )}
          <Button variant="contained" onClick={addVMessage}>Add Message To View</Button>
        </div>
        {gauges.map((g, index) =>
            <GaugeInput
              index={index + 1}
              id={this.props.id}
              gauge={g}
              pass={this.state.pass}
              addToSnackbar={this.showAlert}
            />
        )}
      </div>
    )
  }
}

export default withSnackbar(MessageEditor)
