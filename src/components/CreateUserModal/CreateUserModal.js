import React, { useState, useEffect } from 'react';
import {
  Button,
  Paper,
  Modal,
  TextField,
  InputAdornment,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import SaveIcon from '@mui/icons-material/Save';
import PropTypes from 'prop-types';
import { createUser, updateUser } from '../../client/client';

CreateUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  handleGetUsers: PropTypes.func.isRequired,
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
  const [amount, setAmount] = useState('0.00');
  const [name, setName] = useState(user.name || '');
  const [rank, setRank] = useState(user.rank || '');

  useEffect(() => {
    setAmount('0.00');
    setName(user.name || '');
    setRank(user.rank || '');
  }, [open, user]);

  const handleChangeAmount = ({ target: { value } }) => {
    if (!isNaN(value) || value === '-') setAmount(value.trim());
  };

  const handleChangeName = ({ target: { value } }) => setName(value);
  const handleChangeRank = ({ target: { value } }) => setRank(value);

  const handleSubmit = () => {
    if (user.id && name && rank) {
      updateUser(user.id, { name: name.trim(), rank: rank.trim() })
        .then(handleClose)
        .then(handleGetUsers);
    } else if (!isNaN(amount) && name && rank) {
      createUser({ name: name.trim(), rank: rank.trim(), balance: amount * 100 })
        .then(handleClose)
        .then(handleGetUsers);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper className={classes.paper}>
        <h2 id="simple-modal-title">
          {user.id ? 'Edit Account' : 'Add Account'}
        </h2>
        <div>
          <TextField
            label="Rank"
            variant="filled"
            className={classes.textField}
            fullWidth
            onChange={handleChangeRank}
            value={rank}
          />
          <TextField
            label="Name"
            variant="filled"
            className={classes.textField}
            fullWidth
            onChange={handleChangeName}
            value={name}
          />
          {!user.id ? (
            <TextField
              label="Initial Balance"
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              value={amount}
              onChange={handleChangeAmount}
              className={classes.textField}
              fullWidth
            />
          ) : null}
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Paper>
    </Modal>
  );
}

export default CreateUserModal;
