/* eslint-disable import/first */
jest.mock('../../client/client.js');
import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import CreateTransactionModal from './CreateTransactionModal';
import client from '../../client/client';
import ThemeWrapper from '../ThemeWrapper/ThemeWrapper'

describe('Create Trabsaction Modal', () => {
  const user = { id: 1, name: 'Rob', rank: 'A1C', balance: 1000 };
  const handleReloadUsers = jest.fn();
  let handleClose, handleOpenCreateUserModal, handleOpenDeleteUserModal;

  beforeEach(() => {
    handleClose = jest.fn().mockResolvedValue(undefined);
    handleOpenCreateUserModal = jest.fn().mockResolvedValue(undefined);
    handleOpenDeleteUserModal = jest.fn().mockResolvedValue(undefined);
    client.createTransaction = jest.fn().mockResolvedValue(undefined);
    client.getUserById = jest.fn().mockResolvedValue({ data: user });
  });

  describe('When the user is selected', () => {
    beforeEach(async () => {
      await act(() => {
        render(
          <ThemeWrapper>
            <CreateTransactionModal
              open={true}
              user={user}
              handleClose={handleClose}
              handleOpenCreateUserModal={handleOpenCreateUserModal}
              handleOpenDeleteUserModal={handleOpenDeleteUserModal}
              handleReloadUsers={handleReloadUsers}
            />
          </ThemeWrapper>
        );
      });
    });

    it('should deposit amount', () => {
      const messageText = screen.getByText('You have');
      const amountText = screen.getByText(/\$10\.00/i);
      const amountInput = screen.getByRole('textbox');
      const depositButton = screen.getByRole('button', { name: /deposit/i });

      fireEvent.change(amountInput, { target: { value: 'not a number' } });
      fireEvent.change(amountInput, { target: { value: '5' } });
      fireEvent.click(depositButton);

      expect(messageText).toBeInTheDocument();
      expect(amountText).toBeInTheDocument();
      expect(client.createTransaction).toBeCalledWith(1, 500);
    });

    it('should withdraw amount', () => {
      const messageText = screen.getByText('You have');
      const amountText = screen.getByText(/\$10\.00/i);
      const amountInput = screen.getByRole('textbox');
      const withdrawButton = screen.getByRole('button', { name: /withdraw/i });

      fireEvent.change(amountInput, { target: { value: '5' } });
      fireEvent.click(withdrawButton);

      expect(client.createTransaction).toBeCalledWith(1, -500);
      expect(messageText).toBeInTheDocument();
      expect(amountText).toBeInTheDocument();
    });

    it('should allow the character . as a valid first character', () => {
      const amountInput = screen.getByRole('textbox');

      fireEvent.change(amountInput, { target: { value: '.' } });

      expect(amountInput.value).toBe(".");
    });

    it('should not create an incorrect transaction', async () => {
      const messageText = screen.getByText('You have');
      const amountText = screen.getByText(/\$10\.00/i);
      const depositButton = screen.getByRole('button', { name: /deposit/i });
      const withdrawButton = screen.getByRole('button', { name: /withdraw/i });

      fireEvent.click(depositButton);
      fireEvent.click(withdrawButton);

      await waitFor(() =>
        Promise.all([
          expect(messageText).toBeInTheDocument(),
          expect(amountText).toBeInTheDocument(),
          expect(client.createTransaction).not.toBeCalled(),
        ])
      );
    });
  });

  describe('When there is no selected user', () => {
    beforeEach(() => {
      render(<ThemeWrapper>
        <CreateTransactionModal
          open={true}
          user={{}}
          handleClose={handleClose}
          handleOpenCreateUserModal={handleOpenCreateUserModal}
          handleOpenDeleteUserModal={handleOpenDeleteUserModal}
          handleReloadUsers={handleReloadUsers}
        /></ThemeWrapper>
      );
    });
    it('should not load', () => {
      expect(client.getUserById).not.toBeCalled();
    });
  });

  describe('When the user has a negative balance', () => {
    beforeEach(() => {
      client.getUserById = jest
        .fn()
        .mockResolvedValueOnce({ data: { ...user, balance: -1000 } });
      render(<ThemeWrapper>
        <CreateTransactionModal
          open={true}
          user={{ ...user, balance: -1000 }}
          handleClose={handleClose}
          handleOpenCreateUserModal={handleOpenCreateUserModal}
          handleOpenDeleteUserModal={handleOpenDeleteUserModal}
        /></ThemeWrapper>
      );
    });
    it('should deposit amount', async () => {
      const messageText = screen.getByText('You have');
      const amountText = screen.getByText(/\$-10\.00/i);

      await waitFor(() =>
        Promise.all([
          expect(messageText).toBeInTheDocument(),
          expect(amountText).toBeInTheDocument(),
        ])
      );
    });
  });
});
