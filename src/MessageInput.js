import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField'

const api = require('./api.js')

const styles = theme => ({
  container: {
    display: 'flex'
  },
  textField: {
    flexGrow: 24,
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
      {"pass" : this.props.pass, "text" : this.state.text, "probability" : Number(this.state.prob)}
    ).then(result => {this.props.addToSnackbar(result)})
  }

  deleteMessage = event => {
    api.post(`glyphs/${this.state.id}/messages/${this.state.index}`,
      {"pass" : this.props.pass, "text" : " ", "probability" : 0}
    ).then(result => {this.props.addToSnackbar(result)})
    var elem = document.getElementById("row");
    if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div id="row">
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
          />
          <TextField
            type="number"
            style={{width: 65, minWidth: 52}}
            id="outlined-basic"
            label={`Prob ${this.props.index}`}
            variant="outlined"
            size="small"
            margin="normal"
            defaultValue={this.props.prob}
            onChange={this.updateProb}
            onBlur={this.updateMessage}
          />
          <IconButton aria-label="delete"
            onClick={this.deleteMessage}
            className={classes.margin}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </form>
      </div>
    )
  }
}

MessageInput.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MessageInput)
