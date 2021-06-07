# How it works

In this section, the technical details of this app are explained. The various tools and modules used in the application are described here as well.

## npm

Node Package Manager (NPM) is a system for distributing packages for applications. It consists of the [website](https://www.npmjs.com/) where you can discover new packages, the registry which holds the packages and their metadata in the cloud, and the Command Line Interface (CLI), which allows you to download and manage the packages locally. [package.json](/package.json) is a file containing metadata for the project like configuration, a list of dependencies, and scripts for the CLI to execute.

## Code standards

[eslint](https://eslint.org/docs/user-guide/getting-started)
[prettier](https://prettier.io/docs/en/why-prettier.html)
[a11y](https://www.a11yproject.com/checklist/#content) (hit on the legal requirements) google lighthouse

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
