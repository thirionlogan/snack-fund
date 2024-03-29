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
import CountUp from 'react-countup'

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
  },
  paper: {
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
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
  textField: { margin: theme.spacing(1, 0) },
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
        <Typography variant="h6" fontWeight={300} display="flex" >Hello&nbsp;<Typography variant="h6" leftMargin='1em'>{`${user.rank} ${user.name}!`}</Typography></Typography>
          <div>
            <Tooltip title="Edit Account" placement="top" arrow>
              <IconButton aria-label="edit" onClick={handleOpenCreateUserModal} color="primary" size="large" >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Account" placement="top" arrow>
              <IconButton aria-label="delete" onClick={handleOpenDeleteUserModal} color="primary" size="large" >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Typography className={classes.typography}>
            You have&nbsp;
            <Typography component="span" className={balanceColor()}>
              {open && <CountUp end={balance / 100} prefix='$' duration={0.5} decimals='2' preserveValue useEasing />}
            </Typography>
          </Typography>
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
