import React, { useState, useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, InputBase, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionIcon from '@material-ui/icons/Description';
import CreateUserModal from '../CreateUserModal/CreateUserModal';
import CreateTransactionModal from '../CreateTransactionModal/CreateTransactionModal';
import DeleteUserModal from '../DeleteUserModal/DeleteUserModal';
import ReportDateRangeModal from '../ReportDateRangeModal/ReportDateRangeModal';
import { getUsers } from '../../client/client';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  adminButtonContainer: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  search: {
    position: 'sticky',
    top: 0,
    margin: theme.spacing(1),
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  sticky: { position: 'sticky', top: 0 },
}));

function App() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [openReportDateRangeModal, setOpenReportDateRangeModal] = useState(
    false
  );
  const [openCreateTransactionModal, setOpenCreateTransactionModal] = useState(
    false
  );
  const [selectedUser, setSelectedUser] = useState({});

  const handleGetUsers = () => getUsers().then(({ data }) => setUsers(data));

  useEffect(handleGetUsers, []);

  const handleOpenCreateUserModal = () => setOpenCreateUserModal(true);

  const handleCloseCreateUserModal = () => setOpenCreateUserModal(false);

  const handleSetOpenCreateTransactionModal = (user) => {
    setOpenCreateTransactionModal(true);
    setSelectedUser(user);
  };

  const handleCloseCreateTransactionModal = () => {
    setOpenCreateTransactionModal(false);
    setSelectedUser({});
  };

  const handleOpenReportDateRangeModal = () =>
    setOpenReportDateRangeModal(true);
  const handleCloseReportDateRangeModal = () =>
    setOpenReportDateRangeModal(false);

  const handleOpenDeleteUserModal = () => setOpenDeleteUserModal(true);

  const handleCloseDeleteUserModal = () => setOpenDeleteUserModal(false);

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <div className="App">
      <header className="App-header">
        <Paper className={classes.search}>
          <InputBase
            className={classes.input}
            placeholder="Search Accounts"
            inputProps={{ 'aria-label': 'search accounts' }}
            onChange={handleSearch}
            value={search}
          />
          <SearchIcon />
        </Paper>
        {users
          .filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
          })
          .sort((a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
          .map((user, index) => (
            <Button
              key={user.rank + user.name + index}
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => handleSetOpenCreateTransactionModal(user)}
            >
              {user.rank + ' ' + user.name}
            </Button>
          ))}
        <div className={classes.adminButtonContainer}>
          <Fab
            variant="extended"
            color="secondary"
            className={classes.button}
            onClick={handleOpenCreateUserModal}
          >
            <AddIcon />
            Add Account
          </Fab>
          <Fab
            variant="extended"
            className={classes.button}
            onClick={handleOpenReportDateRangeModal}
          >
            <DescriptionIcon />
            Get Report
          </Fab>
        </div>
        <CreateUserModal
          open={openCreateUserModal}
          handleClose={handleCloseCreateUserModal}
          handleGetUsers={handleGetUsers}
          user={selectedUser}
        />
        <CreateTransactionModal
          open={openCreateTransactionModal}
          handleClose={handleCloseCreateTransactionModal}
          user={selectedUser}
          handleOpenCreateUserModal={handleOpenCreateUserModal}
          handleOpenDeleteUserModal={handleOpenDeleteUserModal}
        />
        <DeleteUserModal
          open={openDeleteUserModal}
          handleClose={handleCloseDeleteUserModal}
          user={selectedUser}
          handleGetUsers={handleGetUsers}
          handleCloseCreateTransactionModal={handleCloseCreateTransactionModal}
        />
        <ReportDateRangeModal
          open={openReportDateRangeModal}
          handleClose={handleCloseReportDateRangeModal}
        />
      </header>
    </div>
  );
}

export default App;
