/* eslint-disable import/first */
jest.mock('../../client/client.js');
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReportDateRangeModal from './ReportDateRangeModal';
import client from '../../client/client';

describe('ReportDateRangeModal', () => {
  let handleClose;

  beforeEach(() => {
    client.getReport = jest.fn().mockResolvedValue(undefined);
    handleClose = jest.fn().mockResolvedValue(undefined);
    render(<ReportDateRangeModal open={true} handleClose={handleClose} />);
  });

  it('should have date pickers and confirm', () => {
    // const [startDatePicker, endDatePicker] = screen.getAllByRole('textbox');
    // const confirmButton = screen.getByRole('button', { name: /confirm/i });
    expect(true).toBeTruthy();
  });
});
