import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckIcon from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'

const api = require('./api.js');

const DIALOG_TITLE = 'Upload Messages';

export default function SplitButton(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState('append');
  const [selectedFile, setSelectedFile] = React.useState();

  const handleClick = () => {
    api.postFormData(`glyphs/import/`,
{"pass" : props.pass, "type" : selectedType}, selectedFile
    ).then(result => {
      props.addToSnackbar(result);
      if (!result.errors) props.update();
    })
  };

  const handleRadioClick = (event) => {
    setSelectedType(event.target.value);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const fileSelected = (event) => {
    props.addToSnackbar({"file": event.target.files[0].name});
    setSelectedFile(event.target.files[0]);
  }

  return (
    <Grid item xs={6}>
      <Button color="primary" variant="contained" startIcon={<CloudUploadIcon />} onClick={handleToggle}>{DIALOG_TITLE}</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{DIALOG_TITLE}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            {/* Note: this really should use onChange and have linked state to above, but this is super inefficient. */}
            <FormControl style={{marginBottom: 20}}>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                size="small"
                variant="outlined"
                onBlur={props.handlePassword}
                defaultValue={props.pass}
              />
            </FormControl>
            <FormControl style={{marginBottom: 20}}>
              <label htmlFor="contained-button-file">
                <Button color="primary" variant="contained" component="span" startIcon={selectedFile ? <CheckIcon /> : null}>Attach File</Button>
              </label>
              <input
               id="contained-button-file"
               style={{display: 'none'}}
               multiple
               type="file"
               onChange={fileSelected}
              />
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Type</FormLabel>
              <RadioGroup aria-label="type" name="type" value={selectedType} onChange={handleRadioClick}>
                <FormControlLabel value="append" control={<Radio color="primary" />} label="Append" />
                <FormControlLabel value="overwrite" control={<Radio color="primary" />} label="Overwrite" />
              </RadioGroup>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle}>Cancel</Button>
          <Button onClick={handleClick} disabled={!selectedFile}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
