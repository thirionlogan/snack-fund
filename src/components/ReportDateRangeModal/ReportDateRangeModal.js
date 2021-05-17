import React from 'react';
import { Button, Paper, Modal } from '@material-ui/core';
import DatePicker from '@material-ui/lab/DatePicker';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { getReport } from '../../client/client';

ReportDateRangeModal.propTypes = {
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
}));

function ReportDateRangeModal({ open, handleClose }) {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper className={classes.paper}>
        <h2 id="simple-modal-title">Report Dates</h2>
        <div>
          <DatePicker label="Start Date" />
          <DatePicker label="End Date" />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          // onClick={handleConfirm}
        >
          Save
        </Button>
      </Paper>
    </Modal>
  );
}

export default ReportDateRangeModal;
