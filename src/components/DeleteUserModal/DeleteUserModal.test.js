/* eslint-disable import/first */
jest.mock('../../client/client.js');

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteUserModal from './DeleteUserModal';
import client from '../../client/client';

describe('Delete User Modal', () => {
  let handleClose, handleGetUsers, handleCloseCreateTransactionModal;
  const user = {
    id: 1,
    name: 'Shawesome',
    rank: 'SrA',
  };
  const expectedText = 'Are you sure you want to delete SrA Shawesome?';

  beforeEach(() => {
    handleClose = jest.fn().mockResolvedValue(undefined);
    handleGetUsers = jest.fn().mockResolvedValue(undefined);
    handleCloseCreateTransactionModal = jest.fn().mockResolvedValue(undefined);
    client.deleteUser = jest.fn().mockResolvedValue(undefined);

    render(
      <DeleteUserModal
        open={true}
        handleClose={handleClose}
        user={user}
        handleGetUsers={handleGetUsers}
        handleCloseCreateTransactionModal={handleCloseCreateTransactionModal}
      />
    );
  });
  it('should delete user when delete is clicked', async () => {
    const deleteButton = screen.getByText('Delete');
    const messageText = screen.getByText(expectedText);

    fireEvent.click(deleteButton);
    await waitFor(() =>
      Promise.all([
        expect(messageText).toBeInTheDocument(),
        expect(client.deleteUser).toBeCalledWith(1),
        expect(handleGetUsers).toBeCalledTimes(1),
        expect(handleClose).toBeCalledTimes(1),
        expect(handleCloseCreateTransactionModal).toBeCalledTimes(1),
      ])
    );
  });

  it("shouldn't delete user when delete is clicked", async () => {
    const cancelButton = screen.getByText('Cancel');
    const messageText = screen.getByText(expectedText);

    fireEvent.click(cancelButton);

    expect(messageText).toBeInTheDocument();
    expect(client.deleteUser).not.toBeCalled();
    expect(handleClose).toBeCalled();
  });
});
