import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
      id: `${this.props.id}`,
      index: `${this.props.index}`,
      prob: [],
      success: false,
      error: false,
      warning: false,
      gauge: this.props.gauge
    }
  }

  handleOnChange = event => {
    console.log('Click');
    console.log(event.target.value);
  };

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
      return;
    }
    if (this.state.error) {
      this.setState({error: false})
    } else if (this.state.warning){
      this.setState({warning: false})
    } else {
      this.setState({success: false})
    }
  }

  render() {
    const { classes } = this.props;
    let { gauge, prob } = this.state;

    if (gauge.messages) {
      gauge.messages.map((m => prob.push(m.probability)))
    }

    const updateProb = event => {
      prob[event.target.id][event.target.getAttribute('bin')] = event.target.value
    }

    const addMessage = () => {
      api.post(`glyphs/${this.state.id}/gauges/${this.state.index}/messages`,
        {"pass" : this.props.pass, "text" : 'Default message', "probability" : [0,0,0,0,0]}
      ).then(result => {console.log(result)})

      if (!gauge.messages) {
        gauge[ "messages" ] = [];
      }
      gauge.messages.push({"text" : 'Default gauge message', "probability" : [0,0,0,0,0]})
      this.forceUpdate();
    }

    const updateMessage = event => {
      api.post(`glyphs/${this.state.id}/gauges/${this.state.index}/messages/${event.target.id + 1}`,
        {"pass" : this.props.pass, "text" : event.target.value, "probability" : prob[event.target.id]}
      ).then(result => {this.open(result)})
    }

    if (gauge.messages) {
      console.log('Messages attached')
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
              {gauge.messages.map((m, index) =>
                <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    id={index}
                    label={`Message ${this.props.index}`}
                    defaultValue={m.text}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    size="small"
                    multiline
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
      );
    } else {
      console.log('No messages yet')
      return (
        <div>
          <ExpansionPanel style={{width: '50%', border: '1px solid rgba(0, 0, 0, .125)', marginTop: 10}}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              Gauge {this.state.index}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Button variant="contained" onClick={addMessage} style={{width: '25%'}}>Add Message</Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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
      );
    }

  }
}

GaugeInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GaugeInput);