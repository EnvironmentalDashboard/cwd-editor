import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'

const api = require('./api.js');

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  textField: {
    width: '60%',
    marginRight: 15
  },
  expansionPanelDetails: {
    display: 'flex',
    flexDirection: 'column'
  }
});

class GaugeInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      index: this.props.index,
      gauge: this.props.gauge,
      messages: this.props.gauge.messages
    }
  }

  render() {
    const { classes } = this.props
    let { gauge, messages } = this.state

    const updateProb = event => {
      const id = event.target.id
      const val = event.target.value
      let p = this.state.messages[id].probability;

      p[event.target.getAttribute('bin')] = parseInt(val);

      this.setState(prevState => ({
        messages: {
          ...prevState.messages, [id]:
            {"text": prevState.messages[id].text, "probability": p}
        }
      }))
    }

    const updateText = event => {
      const id = event.target.id
      const val = event.target.value

      this.setState(prevState => ({
        messages: {
          ...prevState.messages, [id]:
            {"text": val, "probability": prevState.messages[id].probability}
        }
      }))
    }

    const addMessage = () => {
      api.post(`glyphs/${this.state.id}/gauges/${this.state.index}/messages`,
        {"pass" : this.props.pass, "text" : "Default gauge message", "probability" : [0,0,0,0,0]}
      ).then(result => {
        if (!result.errors) {
          const messages = (this.state.gauge.messages || []
          ).concat({"text" : "Default gauge message", "probability" : [0,0,0,0,0]});
          this.setState(prevState => ({
            gauge: {
              ...prevState.gauge, messages: messages
            }
          }))
          this.setState({messages: this.state.gauge.messages})
        }
        this.props.funct(result)
      })
    }

    const updateMessage = event => {
      const index = event.target.id

      api.post(`glyphs/${this.state.id}/gauges/${this.state.index}/messages/${event.target.id + 1}`,
        {"pass" : this.props.pass, "text" : messages[index].text, "probability" : messages[index].probability}
      ).then(result => {this.props.funct(result)})
    }

      return (
        <div>
          <ExpansionPanel style={{width: '50%', border: '1px solid rgba(0, 0, 0, .125)', marginTop: 10}}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              Gauge {this.state.index}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              {gauge.messages && gauge.messages.map((m, index) =>
                <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    id={index}
                    label={`Message ${index + 1}`}
                    defaultValue={m.text}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    size="small"
                    multiline
                    onChange={updateText}
                    onBlur={updateMessage}
                  />
                  {m.probability.map((prob, num) =>
                    <TextField
                      type="number"
                      style={{width: 65}}
                      id={index}
                      inputProps={{'bin': num}}
                      label={`Bin ${num + 1}`}
                      variant="outlined"
                      size="small"
                      margin="normal"
                      defaultValue={prob}
                      onChange={updateProb}
                      onBlur={updateMessage}
                    />
                  )}
                </form>
              )}
              <Button variant="contained" onClick={addMessage} style={{width: '25%'}}>Add Message</Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      );


  }
}

GaugeInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GaugeInput)
