import React from 'react';
import { Button, Paper, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

import PropTypes from 'prop-types';
CreateUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    width: 400,
    // backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
  textField: { margin: theme.spacing(1) },
}));

function CreateUserModal({ open, handleClose }) {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <Paper className={classes.paper}>
        <h2 id='simple-modal-title'>Add User</h2>
        <div>
          <TextField
            label='Rank'
            variant='filled'
            className={classes.textField}
          />
          <TextField
            label='Name'
            variant='filled'
            className={classes.textField}
          />
        </div>
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Paper>
    </Modal>
  );
}

export default CreateUserModal;
