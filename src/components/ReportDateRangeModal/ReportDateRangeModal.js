import React, { useState } from 'react';
import { Button, Paper, Modal, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import moment from 'moment';
import PropTypes from 'prop-types';

ReportDateRangeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  datepickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  const [startDate, setStartDate] = useState(
    moment().subtract(1, 'months').format('yyyy-MM-DD')
  );
  const [endDate, setEndDate] = useState(moment().format('yyyy-MM-DD'));

  const handleChangeStartDate = ({ target: { value } }) => {
    setStartDate(value);
  };
  const handleChangeEndDate = ({ target: { value } }) => {
    setEndDate(value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper className={classes.paper}>
        <h2 id="simple-modal-title">Report Dates</h2>
        <div className={classes.datepickerContainer}>
          <TextField
            type="date"
            label="Start Date"
            value={startDate}
            onChange={handleChangeStartDate}
            InputLabelProps={{ shrink: true }}
            inputProps={{ max: endDate }}
          />
          <TextField
            type="date"
            label="End Date"
            value={endDate}
            onChange={handleChangeEndDate}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: startDate, max: moment().format('yyyy-MM-DD') }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          href={`http://localhost:3001/report/${startDate}/${endDate}`}
        >
          Confirm
        </Button>
      </Paper>
    </Modal>
  );
}

export default ReportDateRangeModal;
