import { render, screen, fireEvent } from '@testing-library/react';
import DeleteUserModal from './DeleteUserModal';
import client from '../../client/client';

jest.mock('../../client/client.js');

describe('Delete User Modal', () => {
  const handleClose = jest.fn();
  const user = {
    id: 1,
    name: 'Shawesome',
    rank: 'SrA',
  };
  beforeEach(() => {
    render(
      <DeleteUserModal open={true} handleClose={handleClose} user={user} />
    );
  });
  it('should delete user when delete is clicked', () => {
    const deleteButton = screen.getByText('Delete');

    fireEvent.click(deleteButton);

    expect(client.deleteUser).toBeCalledWith(1);
    expect(handleClose).toBeCalled();
  });

  it("shouldn't delete user when delete is clicked", () => {
    const cancelButton = screen.getByText('Cancel');

    fireEvent.click(cancelButton);

    expect(client.deleteUser).not.toBeCalled();
    expect(handleClose).toBeCalled();
  });
});
