import React, { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Modal,
  IconButton,
  TextField,
  Tooltip,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
    minWidth: theme.spacing(17),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 8px',
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
  upperControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textField: { margin: theme.spacing(1) },
  typography: { display: 'flex' },
}));

function CreateTransactionModal({ open, handleClose, user }) {
  const classes = useStyles();
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const refreshBalance = () => {
      if (user.id)
        getUserById(user.id).then(({ data }) => {
          setBalance(data.balance);
        });
    };

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
    if (!isNaN(value)) setAmount(value);
  };

  const handleSubmit = (multiplier) => {
    if (!isNaN(amount))
      createTransaction(
        user.id,
        parseFloat(amount).toFixed(2) * multiplier
      ).then(refreshBalance);
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
        <div className={classes.upperControls}>
          <Typography className={classes.typography}>
            You have{' '}
            <Typography className={balanceColor()}>
              ${(balance / 100).toFixed(2)}
            </Typography>
          </Typography>
          <div>
            <Tooltip title='Edit User' placement='top' arrow>
              <IconButton aria-label='edit'>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete User' placement='top' arrow>
              <IconButton aria-label='delete'>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <TextField
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
          value={amount}
          onChange={handleChangeAmount}
          className={classes.textField}
        />
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant='contained'
            color='secondary'
            endIcon={<TrendingDownIcon />}
            onClick={() => handleSubmit(-100)}
          >
            Withdraw
          </Button>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            endIcon={<TrendingUpIcon />}
            onClick={() => handleSubmit(100)}
          >
            Deposit
          </Button>
        </div>
      </Paper>
    </Modal>
  );
}

export default CreateTransactionModal;
