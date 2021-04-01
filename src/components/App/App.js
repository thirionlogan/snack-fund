import { useState, useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, InputBase } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionIcon from '@material-ui/icons/Description';
import CreateUserModal from '../CreateUserModal/CreateUserModal';
import CreateTransactionModal from '../CreateTransactionModal/CreateTransactionModal';
import { getUsers } from '../../client/client';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  search: {
    margin: theme.spacing(1),
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

function App() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [openCreateTransactionModal, setOpenCreateTransactionModal] = useState(
    false
  );
  const [selectedUser, setSelectedUser] = useState({});

  const handleGetUsers = () => getUsers().then(({ data }) => setUsers(data));

  useEffect(handleGetUsers, []);

  const handleOpenCreateUserModal = () => {
    setOpenCreateUserModal(true);
  };

  const handleCloseCreateUserModal = () => {
    setOpenCreateUserModal(false);
  };

  const handlesetOpenCreateTransactionModal = (user) => {
    setOpenCreateTransactionModal(true);
    setSelectedUser(user);
  };

  const handleCloseCreateTransactionModal = () => {
    setOpenCreateTransactionModal(false);
    setSelectedUser({});
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <Paper className={classes.search}>
          <InputBase
            className={classes.input}
            placeholder='Search Users'
            inputProps={{ 'aria-label': 'search users' }}
            onChange={handleSearch}
            value={search}
          />
          <SearchIcon />
        </Paper>

        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={handleOpenCreateUserModal}
        >
          Add User
        </Button>
        <Button
          variant='contained'
          className={classes.button}
          startIcon={<DescriptionIcon />}
          href='http://localhost:3001/report'
        >
          Get Report
        </Button>
        {users
          .filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
          })
          .sort((a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
          .map((user) => (
            <Button
              key={user.name}
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={() => handlesetOpenCreateTransactionModal(user)}
            >
              {user.rank + ' ' + user.name}
            </Button>
          ))}
        <CreateUserModal
          open={openCreateUserModal}
          handleClose={handleCloseCreateUserModal}
          handleGetUsers={handleGetUsers}
        />
        <CreateTransactionModal
          open={openCreateTransactionModal}
          handleClose={handleCloseCreateTransactionModal}
          user={selectedUser}
        />
      </header>
    </div>
  );
}

export default App;
