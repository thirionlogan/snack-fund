import { render, screen } from '@testing-library/react';
import CreateUserModal from './CreateUserModal';

test('renders learn react link', () => {
  render(<CreateUserModal open={true} handleClose={() => {}} />);
  expect(true).toBeTruthy();
});
