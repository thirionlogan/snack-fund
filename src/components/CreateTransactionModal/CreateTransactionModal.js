import React, { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Modal,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { createTransaction, getUserById } from '../../client/client';

CreateTransactionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  success: { color: theme.palette.success.main, marginLeft: '0.25em' },
  error: { color: theme.palette.error.main, marginLeft: '0.25em' },
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
    display: 'flex',
    flexDirection: 'column',
  },
  textField: { margin: theme.spacing(1) },
  typography: { display: 'flex' },
}));

function CreateTransactionModal({ open, handleClose, user }) {
  const classes = useStyles();
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setAmount('');
    refreshBalance();
  }, [open, user]);

  const refreshBalance = () => {
    if (user.id)
      getUserById(user.id).then(({ data }) => {
        setBalance(data.balance);
      });
  };

  const handleChangeAmount = ({ target: { value } }) => {
    if (!isNaN(value) || value === '-') setAmount(value);
  };

  const handleSubmit = () => {
    if (!isNaN(amount))
      createTransaction(user.id, amount * 100).then(refreshBalance);
  };

  const balanceColor = () => (balance < 0 ? classes.error : classes.success);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <Paper className={classes.paper}>
        <Typography className={classes.typography}>
          You have{' '}
          <Typography className={balanceColor()}>
            ${(balance / 100).toFixed(2)}
          </Typography>
        </Typography>
        <TextField
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
          value={amount}
          onChange={handleChangeAmount}
          className={classes.textField}
        />
        <Button
          variant='contained'
          color='primary'
          endIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          Send Transaction
        </Button>
      </Paper>
    </Modal>
  );
}

export default CreateTransactionModal;
