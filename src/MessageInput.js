import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

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
      text: this.props.text,
      success: false,
      error: false,
      warning: false
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

  open = (result) => {
    console.log(result)
    if (result.errors) {
      if (this.props.pass === "") {
        this.setState({warning: true})
      } else {
        this.setState({error: true})
      }
    } else {
      this.setState({success: true})
    }
  }

  close = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    if (this.state.error) {
      this.setState({error: false})
    } else if (this.state.warning){
      this.setState({warning: false})
    } else {
      this.setState({success: false})
    }
  }

  updateMessage = event => {
    api.post(`glyphs/${this.state.id}/messages/${this.state.index}`,
      {"pass" : this.props.pass, "text" : this.state.text, "probability" : this.state.prob}
    ).then(result => {this.open(result)})
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
        <Snackbar open={this.state.success} autoHideDuration={3000} onClose={this.close}>
          <Alert variant="filled" severity="success" onClose={this.close}>
            Database updated!
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.warning} autoHideDuration={3000} onClose={this.close}>
          <Alert variant="filled" severity="warning" onClose={this.close}>
            Please enter a password.
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.error} autoHideDuration={3000} onClose={this.close}>
          <Alert variant="filled" severity="error" onClose={this.close}>
            Database could not be updated!
          </Alert>
        </Snackbar>
      </div>
    )
  }
}

MessageInput.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MessageInput)
