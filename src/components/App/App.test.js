/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable import/first */
jest.mock('../../client/client.js');
import React from 'react';
import {
  act,
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import App from './App';
import client from '../../client/client';
import ThemeWrapper from '../ThemeWrapper/ThemeWrapper'

describe('App', () => {
  beforeEach(() => {
    client.getUsers = jest.fn().mockResolvedValue({
      data: [
        { id: 3, name: 'Mark', rank: 'GS10' },
        { id: 4, name: 'Mark', rank: 'Amn' },
        { id: 1, name: 'Snuffy', rank: 'A1C' },
        { id: 2, name: 'Shawesome', rank: 'SrA' },
      ],
    });
    client.getUserById = jest.fn().mockResolvedValue({
      data: {
        id: 2,
        name: 'Shawesome',
        rank: 'SrA',
        balance: 1000,
      },
    });
    act(() => {
      render(
        <ThemeWrapper>
          <App />
        </ThemeWrapper>
      );
    });
  });

  it('should load the list of accounts', async () => {
    await waitFor(() => expect(client.getUsers).toBeCalled());
    const snuffy = screen.getByRole('button', { name: /a1c snuffy/i });
    const shawesome = screen.getByRole('button', { name: /sra shawesome/i });
    const civMark = screen.getByRole('button', { name: /gs10 mark/i });
    const milMark = screen.getByRole('button', { name: /amn mark/i });

    await waitFor(() =>
      Promise.all([
        expect(snuffy).toBeInTheDocument(),
        expect(shawesome).toBeInTheDocument(),
        expect(civMark).toBeInTheDocument(),
        expect(milMark).toBeInTheDocument(),
      ])
    );
  });

  it('should open createTransactionModal when account is clicked', async () => {
    let createTransactionModal;
    await waitFor(() => expect(client.getUsers).toBeCalled());
    const shawesome = screen.getByRole('button', { name: /sra shawesome/i });

    expect(screen.queryByText(/you have/i)).toBeNull();

    await act(async () => {
      fireEvent.click(shawesome);
      createTransactionModal = await screen.findByText(/you have/i);
    });
    expect(createTransactionModal).toBeInTheDocument();
  });

  it('should narrow the list on search', async () => {
    await waitFor(() => expect(client.getUsers).toBeCalled());
    const search = screen.getByRole('textbox', { name: /search accounts/i });
    await waitFor(() => expect(screen.getAllByRole('button')).toHaveLength(6));
    fireEvent.change(search, { target: { value: 'S' } });
    await waitFor(() => expect(screen.getAllByRole('button')).toHaveLength(4));
  });

  it('should get a report', async () => {
    await waitFor(() => expect(client.getUsers).toBeCalled());
    const getReport = screen.getByRole('button', { name: /get report/i });
    fireEvent.click(getReport);
    const ReportDateRangeModal = screen.getByText(/report date/i);
    await waitFor(() => expect(ReportDateRangeModal).toBeInTheDocument());
  });
});
