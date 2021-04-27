/* eslint-disable import/first */
jest.mock('../../client/client.js');
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateUserModal from './CreateUserModal';
import client from '../../client/client';

describe('Create User Modal', () => {
  let handleClose, handleGetUsers, container;

  beforeEach(() => {
    handleClose = jest.fn().mockResolvedValue(undefined);
    handleGetUsers = jest.fn().mockResolvedValue(undefined);
    client.createUser = jest.fn().mockResolvedValue(undefined);
    client.updateUser = jest.fn().mockResolvedValue(undefined);
  });

  describe('When creating a new user', () => {
    beforeEach(() => {
      render(
        <CreateUserModal
          open={true}
          handleClose={handleClose}
          handleGetUsers={handleGetUsers}
          user={{}}
        />
      );
    });

    it('should send correct request', async () => {
      const [
        rankTextField,
        nameTextField,
        initialBalanceTextField,
      ] = screen.getAllByRole('textbox');
      const saveButton = screen.getByRole('button', { name: /save/i });

      fireEvent.change(rankTextField, { target: { value: 'SrA' } });
      fireEvent.change(nameTextField, { target: { value: 'Snuffy' } });
      fireEvent.change(initialBalanceTextField, { target: { value: '-' } });
      fireEvent.change(initialBalanceTextField, {
        target: { value: 'Not A Number' },
      });
      fireEvent.change(initialBalanceTextField, { target: { value: '5.00' } });
      fireEvent.click(saveButton);

      await waitFor(() =>
        Promise.all([
          expect(handleClose).toBeCalledTimes(1),
          expect(handleGetUsers).toBeCalledTimes(1),
          expect(handleClose).toBeCalledTimes(1),
          expect(client.createUser).toBeCalledWith({
            name: 'Snuffy',
            rank: 'SrA',
            balance: 500,
          }),
        ])
      );
    });

    it('should not send an incorrect request', async () => {
      const [rankTextField] = screen.getAllByRole('textbox');
      const saveButton = screen.getByRole('button', { name: /save/i });

      fireEvent.change(rankTextField, { target: { value: 'SrA' } });
      fireEvent.click(saveButton);

      await waitFor(() =>
        Promise.all([
          expect(handleClose).toBeCalledTimes(0),
          expect(handleGetUsers).toBeCalledTimes(0),
          expect(handleClose).toBeCalledTimes(0),
          expect(client.createUser).toBeCalledTimes(0),
        ])
      );
    });
  });

  describe('When editing an existing user', () => {
    beforeEach(() => {
      render(
        <CreateUserModal
          open={true}
          handleClose={handleClose}
          handleGetUsers={handleGetUsers}
          user={{ id: 1, name: 'Shawesome', rank: 'SrA' }}
        />
      );
    });

    it('should send correct request', async () => {
      const [rankTextField, nameTextField] = screen.getAllByRole('textbox');
      const saveButton = screen.getByRole('button', { name: /save/i });

      fireEvent.change(rankTextField, { target: { value: 'SSgt' } });
      fireEvent.change(nameTextField, { target: { value: 'Stuffy' } });
      fireEvent.click(saveButton);

      await waitFor(() =>
        Promise.all([
          expect(handleClose).toBeCalledTimes(1),
          expect(handleGetUsers).toBeCalledTimes(1),
          expect(handleClose).toBeCalledTimes(1),
          expect(client.updateUser).toBeCalledWith(1, {
            rank: 'SSgt',
            name: 'Stuffy',
          }),
        ])
      );
    });
  });
});
