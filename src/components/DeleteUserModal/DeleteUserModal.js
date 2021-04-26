import React, { useState, useEffect } from 'react';
import {
  Button,
  Paper,
  Modal,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import { createUser, updateUser } from '../../client/client';

CreateUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: {
    id: PropTypes.string,
    name: PropTypes.string,
    rank: PropTypes.string,
  },
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
  textField: { margin: theme.spacing(1) },
}));

function CreateUserModal({ open, handleClose, handleGetUsers, user }) {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <Paper className={classes.paper}>
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.button}
        >
          Save
        </Button>
      </Paper>
    </Modal>
  );
}

export default CreateUserModal;
