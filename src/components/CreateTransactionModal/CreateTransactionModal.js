import React from 'react';
import {
  Button,
  Paper,
  Modal,
  TextField,
  InputAdornment,
  Typography,
  Icon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

CreateTransactionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object,
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

function CreateTransactionModal({ open, handleClose, user }) {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <Paper className={classes.paper}>
        <Typography>You have ${(user.balance / 100).toFixed(2)}</Typography>
        <TextField
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
        />
        <Button variant='contained' color='primary' endIcon={<Icon>send</Icon>}>
          Send Transaction
        </Button>
      </Paper>
    </Modal>
  );
}

export default CreateTransactionModal;
