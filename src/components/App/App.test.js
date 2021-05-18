/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable import/first */
jest.mock('../../client/client.js');
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';
import client from '../../client/client';

jest.mock(
  '../CreateUserModal/CreateUserModal.js',
  () => ({ handleClose, handleGetUsers }) => {
    handleGetUsers().then(handleClose);
    return <div>Create User Modal</div>;
  }
);
jest.mock(
  '../CreateTransactionModal/CreateTransactionModal.js',
  () => ({ handleOpenDeleteUserModal }) => {
    handleOpenDeleteUserModal();
    return <div>Create Transaction Modal</div>;
  }
);
jest.mock(
  '../DeleteUserModal/DeleteUserModal.js',
  () => ({ handleCloseCreateTransactionModal, handleClose }) => {
    return (
      <button
        onClick={() => {
          handleCloseCreateTransactionModal();
          handleClose();
        }}
      >
        Delete User Modal
      </button>
    );
  }
);

jest.mock(
  '../ReportDateRangeModal/ReportDateRangeModal.js',
  () => ({ open, handleClose }) => {
    handleClose();
    return <div>Report Date Range Modal</div>;
  }
);

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
    render(<App />);
  });

  it('should load the app', async () => {
    await waitFor(() => expect(client.getUsers).toBeCalled());
    const snuffy = screen.getByRole('button', { name: /a1c snuffy/i });
    const shawesome = screen.getByRole('button', { name: /sra shawesome/i });
    const addUser = screen.getByRole('button', { name: /add account/i });

    fireEvent.click(addUser);
    const createUserModal = screen.getByText('Create User Modal');
    await waitFor(() => expect(createUserModal).toBeInTheDocument());

    fireEvent.click(shawesome);
    const createTransactionModal = screen.getByText('Create Transaction Modal');
    await waitFor(() => expect(createTransactionModal).toBeInTheDocument());

    const deleteUserModal = screen.getByText('Delete User Modal');
    await waitFor(() => expect(deleteUserModal).toBeInTheDocument());
    fireEvent.click(deleteUserModal);

    await waitFor(() =>
      Promise.all([
        expect(snuffy).toBeInTheDocument(),
        expect(shawesome).toBeInTheDocument(),
      ])
    );
  });

  it('should narrow the list on search', async () => {
    await waitFor(() => expect(client.getUsers).toBeCalled());
    const search = screen.getByRole('textbox', { name: /search accounts/i });
    await waitFor(() => expect(screen.getAllByRole('button')).toHaveLength(7));
    fireEvent.change(search, { target: { value: 'S' } });
    await waitFor(() => expect(screen.getAllByRole('button')).toHaveLength(5));
  });

  it('should get a report', async () => {
    const getReport = screen.getByRole('button', { name: /get report/i });
    fireEvent.click(getReport);
    const ReportDateRangeModal = screen.getByText('Report Date Range Modal');
    await waitFor(() => expect(ReportDateRangeModal).toBeInTheDocument());
  });
});
