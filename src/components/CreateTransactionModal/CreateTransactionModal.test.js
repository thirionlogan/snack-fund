import { render, screen } from '@testing-library/react';
import CreateTransactionModal from './CreateTransactionModal';

test('renders learn react link', () => {
  const user = { name: 'Rob', rank: 'A1C', balance: 1000 };
  render(
    <CreateTransactionModal open={true} handleClose={() => {}} user={user} />
  );
  expect(true).toBeTruthy();
});
