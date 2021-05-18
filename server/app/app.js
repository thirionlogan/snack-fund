const express = require('express');
const cors = require('cors');
const stream = require('stream');
const errorHandler = require('../middleware/errorHandler');
const { createTransaction } = require('../services/transactionService');
const { getReport } = require('../services/reportService');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../services/userService');

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost:3001',
      'https://localhost:3001',
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  })
);

app.use(errorHandler);

// user
app.get('/user', (req, res) => {
  getUsers()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

app.get('/user/:userId', (req, res) => {
  getUserById(req.params.userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
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

// transaction
app.post('/transaction/:userId', (req, res) => {
  createTransaction(req.params.userId, req.body.amount)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

// report
app.get('/report/:startDate/:endDate', (req, res) => {
  getReport(req.params.startDate, req.params.endDate)
    .then((report) => {
      const fileName =
        'snackfundReport' + new Date().toISOString().slice(0, 10) + '.xlsx';
      res.set('Content-disposition', 'attachment; filename=' + fileName);
      res.set('Content-Type', 'text/plain');
      res.status(200);
      const readStream = new stream.PassThrough();
      readStream.end(report);
      readStream.pipe(res);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

module.exports = app;
