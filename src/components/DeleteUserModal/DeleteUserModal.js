import React from 'react';
import { Button, Paper, Modal, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { deleteUser } from '../../client/client';

DeleteUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleGetUsers: PropTypes.func.isRequired,
  handleCloseCreateTransactionModal: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  caption: {
    textAlign: 'center',
    marginTop: '15%',
  },
  paper: {
    position: 'absolute',
    minHeight: 200,
    width: 400,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textField: { margin: theme.spacing(1) },
}));

function DeleteUserModal({
  open,
  handleClose,
  handleGetUsers,
  handleCloseCreateTransactionModal,
  user,
}) {
  const classes = useStyles();

  const handleDeleteUser = () => {
    deleteUser(user.id)
      .then(handleGetUsers)
      .then(handleClose)
      .then(handleCloseCreateTransactionModal);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper className={classes.paper}>
        <Typography className={classes.caption} gutterBottom>
          Are you sure you want to delete {user.rank + ' ' + user.name}?
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            onClick={handleDeleteUser}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="default"
            size="large"
            className={classes.button}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </Paper>
    </Modal>
  );
}

export default DeleteUserModal;
