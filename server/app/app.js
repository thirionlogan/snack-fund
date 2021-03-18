const express = require('express');
const errorHandler = require('../middleware/errorHandler');
const { createTransaction } = require('../services/transactionService');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../services/userService');

const app = express();

app.use(express.json());
app.use(errorHandler);

// user
app.get('/user', (req, res) => {
  getUsers()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

app.get('/user/:userId', (req, res) => {
  getUserById(req.params.userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
});

app.post('/user', (req, res) => {
  createUser(req.body)
    .then(({ id }) => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(422);
    });
});

app.patch('/user/:userId', (req, res) => {
  updateUser(req.params.userId, req.body)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

app.delete('/user/:userId', (req, res) => {
  deleteUser(req.params.userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

//transaction
app.post('/transaction/:userId', (req, res) => {
  createTransaction(req.params.userId, req.body.amount)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

app.use((req, res, next) => {
  res.status(404).send('resource not found');
});

module.exports = app;
