import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const api = require('./api.js')

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: '30%',
    marginRight: 15
  }
})

class MessageInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      index: this.props.index,
      prob: this.props.prob,
      text: this.props.text
    }
  }

  updateText = event => {
    this.setState({
      text: `${event.target.value}`
    })
  }

  updateProb = event => {
    this.setState({
      prob: `${event.target.value}`
    })
  }

  updateMessage = event => {
    api.post(`glyphs/${this.state.id}/messages/${this.state.index}`,
      {"pass" : this.props.pass, "text" : this.state.text, "probability" : this.state.prob}
    ).then(result => {this.props.funct(result)})
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label={`Message ${this.props.index}`}
            defaultValue={this.props.text}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            size="small"
            onChange={this.updateText}
            onBlur={this.updateMessage}
            multiline
          />
          <TextField
            type="number"
            style={{width: 75}}
            id="outlined-basic"
            label={`Prob ${this.props.index}`}
            variant="outlined"
            size="small"
            margin="normal"
            defaultValue={this.props.prob}
            onChange={this.updateProb}
            onBlur={this.updateMessage}
          />
        </form>
      </div>
    )
  }
}

MessageInput.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MessageInput)
