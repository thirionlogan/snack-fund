/* eslint-disable import/first */
jest.mock('../../client/client.js');
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReportDateRangeModal from './ReportDateRangeModal';
import moment from 'moment';
import client from '../../client/client';

describe('ReportDateRangeModal', () => {
  let handleClose;

  beforeEach(() => {
    client.getReport = jest.fn().mockResolvedValue(undefined);
    handleClose = jest.fn().mockResolvedValue(undefined);
    render(<ReportDateRangeModal open={true} handleClose={handleClose} />);
  });

  it('should select dates and pull correct report period', () => {
    const startDatePicker = screen.getByDisplayValue(
      new RegExp(moment().subtract(1, 'months').format('yyyy-MM-DD'))
    );
    const endDatePicker = screen.getByDisplayValue(
      new RegExp(moment().format('yyyy-MM-DD'))
    );

    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    fireEvent.change(startDatePicker, { target: { value: '2021-04-01' } });
    fireEvent.change(endDatePicker, { target: { value: '2021-04-20' } });
    fireEvent.click(confirmButton);

    expect(client.getReport).toBeCalledWith('2021-04-01', '2021-04-20');
  });
});
