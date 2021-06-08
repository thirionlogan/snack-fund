# How it works

In this section, the technical details of this app are briefly explained. Suppose you would like to know more about a library or tool. In that case, it is highly recommended that you look up the documentation yourself. The various tools and modules used in the application are described here as well.

## npm

Node Package Manager (NPM) is a system for distributing packages for applications. It consists of the [website](https://www.npmjs.com/) where you can discover new packages, the registry which holds the packages and their metadata in the cloud, and the Command Line Interface (CLI), which allows you to download and manage the packages locally. [package.json](/package.json) is a file containing metadata for the project like configuration, a list of dependencies, and scripts for the CLI to execute.

## Code Standards

Code standards are enforced through linting software. Linting software scans the project's files and enforces standard rules on the code. [Eslint](https://eslint.org/docs/user-guide/getting-started) is a common linter that we use to enforce code standards (like maximum cyclomatic complexity), [prettier](https://prettier.io/docs/en/why-prettier.html) is a plugin for eslint that enforces code styling (such as indentation and spacing), [a11y](https://www.a11yproject.com/checklist/#content) is another plugin that enforces accessibility standards.

(hit on the legal requirements) google lighthouse

## Testing Tools

Testing tools help enable [Test Driven Development](/docs/XP.md#test-driven-development) for components and enforce code coverage. [Jest](https://jestjs.io/) is a common Javascript testing framework that we use to mock functions to replicate the app functionality. [Supertest](https://www.npmjs.com/package/supertest) allows for HTTP and API tests to be run on the backend to check functionality. The [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is a very lightweight solution for testing React components and allows testing to reproduce functionality better as the user will see it.

## Client Side

The [frontend](/src) directory contains all of the code that is ran by the user's browser. In [components](/src/components)directory contains all of the react components in the app. Finally, the [client](src\client\client.js) module contains all of the functions used to communicate with the backend.

### Dependencies

[index.html](public\index.HTML) is the HTML file sent to the browser when the user navigates to the website.
[React.js](https://reactjs.org/) is used to dynamically render HTML at the element with the ID of "root." [Material UI](https://material-ui.com/) provides basic react components with a common design style. [Axios.js](https://www.npmjs.com/package/axios) is used by the [client](src\client\client.js) to send requests to the backend.

## Server Side

The [backend](/server) directory contains all of the code ran via Node.js. The [app.js](/server/app/app.js) is the root of the entire backend. There, it uses [express.js](https://expressjs.com/) to recieve network traffic and passes information to [services](/server/services).

### Database

[Services](/server/services) interface with the database through the code found in [this](/server/data) directory. [Sqlite3](https://www.sqlite.org/index.html) is an SQL client used to connect to the database and execute raw SQL queries. [Knex.js](http://knexjs.org/) is a query building library that interfaces with the client and enables querying using javascript. [Bookshelf.js](https://bookshelfjs.org/) is a JavaScript [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) that uses knex.js to map queries to object models.
