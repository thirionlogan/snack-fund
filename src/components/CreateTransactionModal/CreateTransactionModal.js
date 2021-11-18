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
} from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import { createTransaction, getUserById } from '../../client/client';

CreateTransactionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  handleOpenCreateUserModal: PropTypes.func,
  handleOpenDeleteUserModal: PropTypes.func.isRequired,
  handleReloadUsers: PropTypes.func.isRequired,
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

function CreateTransactionModal({
  open,
  handleClose,
  user,
  handleOpenCreateUserModal,
  handleOpenDeleteUserModal,
  handleReloadUsers,
}) {
  const classes = useStyles();
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setAmount('');
    setBalance(user.balance);
  }, [open, user]);

  const handleChangeAmount = ({ target: { value } }) => {
    if (!isNaN(value) || value === ".") setAmount(value.trim());
  };

  const handleSubmit = (multiplier) => {
    if (amount && !isNaN(amount)) {
      createTransaction(user.id, parseFloat(amount).toFixed(2) * multiplier)
        .then(() => getUserById(user.id))
        .then(({ data }) => {
          handleReloadUsers();
          setBalance(data.balance);
        });
    }
  };

  const balanceColor = () => (balance < 0 ? classes.error : classes.success);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper className={classes.paper}>
        <div className={classes.upperControls}>
          <Typography className={classes.typography}>
            You have{' '}
            <Typography component="span" className={balanceColor()}>
              ${(balance / 100).toFixed(2)}
            </Typography>
          </Typography>
          <div>
            <Tooltip title="Edit Account" placement="top" arrow>
              <IconButton aria-label="edit" onClick={handleOpenCreateUserModal} size="large">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Account" placement="top" arrow>
              <IconButton aria-label="delete" onClick={handleOpenDeleteUserModal} size="large">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <TextField
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={amount}
          onChange={handleChangeAmount}
          className={classes.textField}
        />
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            endIcon={<TrendingDownIcon />}
            onClick={() => handleSubmit(-100)}
          >
            Withdraw
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
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
