import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, InputBase } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import CreateUserModal from './components/CreateUserModal/CreateUserModal';
import { useState } from 'react';

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
  const [users, setUsers] = useState([
    { id: 1, rank: 'SrA', name: 'Thirion' },
    { id: 2, rank: 'SrA', name: 'Shaw' },
    { id: 3, rank: 'SSgt', name: 'Monroe' },
    { id: 4, rank: 'TSgt', name: 'Drevon' },
    { id: 5, rank: 'A1C', name: 'Wilson' },
    { id: 6, rank: 'TSgt', name: 'Messler' },
  ]);
  const [search, setSearch] = useState('');
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [openCreateTransactionModal, setOpenCreateTransactionModal] = useState(
    false
  );
  const [selectedUser, setSelectedUser] = useState({});

  const handleOpenCreateUserModal = () => {
    setOpenCreateUserModal(true);
  };

  const handleCloseCreateUserModal = () => {
    setOpenCreateUserModal(false);
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
            >
              {user.rank + ' ' + user.name}
            </Button>
          ))}
        <CreateUserModal
          open={openCreateUserModal}
          handleClose={handleCloseCreateUserModal}
          handleOpen={handleOpenCreateUserModal}
        />
      </header>
    </div>
  );
}

export default App;
