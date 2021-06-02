# Snack Fund

1. [Getting set up](#getting-set-up)
1. [Scripts](#available-scripts)
1. [Best Practices](#best-practices)
1. [How it works](#how-it-works)

## Getting Set up

- Pull the app from github with `git clone https://github.com/thirionlogan/snack-fund.git`
- Navigate to th project directory with `cd snack-fund`
- Install all of the dependencies with `npm install`
- Migrate the database with `npm run migrate`
- Seed the database with `npm run seed`
- Start the back end with `npm run server`
- Start the front end with `npm run start`

# Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run server`

Runs the back end

### `npm run migrate`

Runs all database migrations that haven't been ran yet.

### `npm run rollback`

Rolls back all database migrations. **This will delete all data in the database.**

### `npm run seed`

Seeds a migrated database with some sample data. **This will delete all previous data.**

# Best Practices

- [TDD](https://www.guru99.com/test-driven-development.html#7)
- Agile/XP
- testing paradigms
- pairing
- code standards
- git practices
- team meetings
  - IPM
  - Retro
  - Stand up
- the backlog
  - stories
  - wireframes / designs
- accessibility
- security
- pipelines / continuous integration

# How it works

- package.json
  - modules/dependencies
    - Babel/webpack
    - what is the difference between dependencies and dev dependencies
  - scripts
- libraries for code standards
  - [eslint](https://eslint.org/docs/user-guide/getting-started)
  - [prettier](https://prettier.io/docs/en/why-prettier.html)
  - [a11y](https://www.a11yproject.com/checklist/#content)
  <!-- TODO google lighthouse -->
- testing tools
  - Jest
  - supertest
  - react testing library
- [frontend](/src)
  - [components](/src/components)
  - client
  - main dependencies
    - [React.js](https://reactjs.org/)
      - how [index.js](/src/index.js) injects react into [index.html](/public/index.html)
    - [Material UI](https://material-ui.com/)
    - [axios.js](https://www.npmjs.com/package/axios)
- [backend](/server)
  - [app.js](/server/app/app.js)
  - [database management](/server/data)
  - the concept of [middleware](/server/middleware)
  - [services](/server/services)
  - main dependencies
    - [express.js](https://expressjs.com/)
    - [bookshelf.js](https://bookshelfjs.org/)
    - [knex.js](http://knexjs.org/)
    - [sqlite3](https://www.sqlite.org/index.html)
    - [xlsx](https://www.npmjs.com/package/xlsx)
