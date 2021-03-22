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
import { createUser } from '../../client/client';

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
  const [amount, setAmount] = useState('0.00');
  const [name, setName] = useState('');
  const [rank, setRank] = useState('');

  useEffect(() => {
    setAmount('0.00');
  }, [open]);

  const handleChangeAmount = ({ target: { value } }) => {
    if (!isNaN(value) || value === '-') setAmount(value);
  };

  const handleChangeName = ({ target: { value } }) => setName(value);
  const handleChangeRank = ({ target: { value } }) => setRank(value);

  const handleSubmit = () => {
    if (!isNaN(amount) && name && rank)
      createUser({ name, rank, balance: amount * 100 }).then(handleClose);
  };

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
            fullWidth
            onChange={handleChangeRank}
          />
          <TextField
            label='Name'
            variant='filled'
            className={classes.textField}
            fullWidth
            onChange={handleChangeName}
          />
          <TextField
            label='Initial Balance'
            variant='filled'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>$</InputAdornment>
              ),
            }}
            value={amount}
            onChange={handleChangeAmount}
            className={classes.textField}
            fullWidth
          />
        </div>
        <Button
          variant='contained'
          color='primary'
          size='large'
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
