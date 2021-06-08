# Snack Fund

1. [Getting set up](#getting-set-up)
1. [Scripts](#available-scripts)
1. [Extreme Programming](/docs/XP.md)
1. [How it works](/docs/How_it_works.md)

## Getting Set up

- Pull the app from Github with `git clone https://github.com/thirionlogan/snack-fund.git`
- Navigate to the project directory with `cd snack-fund`
- Install all of the dependencies with `npm install`
- Set up git hooks with `npm run hooks`
- Migrate the database with `npm run migrate`
- Seed the database with `npm run seed`
- Start the back end with `npm run server`
- Start the front end with `npm run start`

# Available Scripts

These scripts can be run in the project directory.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

This script launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

This script builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run server`

Runs the back end

### `npm run migrate`

This script runs all database migrations.

### `npm run rollback`

This script rolls back all database migrations. **This will delete all data in the database.**

### `npm run seed`

This script seeds a migrated database with some sample data. **This will delete all previous data.**

### `npm run hooks`

Sets up git hooks on your machine so that all code committed meets standards and all code pushed passes all tests.
