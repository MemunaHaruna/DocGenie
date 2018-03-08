[![Build Status](https://travis-ci.org/memunaharuna/DocGenie.svg?branch=staging)](https://travis-ci.org/memunaharuna/DocGenie)[![Coverage Status](https://coveralls.io/repos/github/memunaharuna/DocGenie/badge.png?branch=staging)](https://coveralls.io/github/memunaharuna/DocGenie?branch=staging)[![Code Climate](https://codeclimate.com/github/memunaharuna/DocGenie/badges/gpa.svg)](https://codeclimate.com/github/memunaharuna/DocGenie)

# DocGenie
A document management system that allows users create documents, set access privileges for their documents, view other users' public and role-level documents, save private for-your-eyes-only documents and also edit or delete your saved documents.

### About the application

#### API Features

The following features make up the Document Management System API:

##### Authentication

* Uses JSON Web Token (JWT) for authentication.
* Generates a token upon successul login / account creation and returns it to the client.
* Verifies the token to ensures a user is authenticated to access some endpoints.

##### Users

* Allows users to be created.
* Allows users to login and obtain a token
* Allows authenticated users to retrieve and edit their information only.
* Ensures all users can be retrieved and modified by an admin user.

##### Roles

* Ensures that users have roles.
* Ensures user roles could be admin or regular.
* Ensures roles can be created, retrieved, updated and deleted by an admin user.
* Ensures a non-admin user cannot create, retrieve, modify, or delete roles.

##### Documents

* Allows new documents to be created by authenticated users.
* Ensures all documents have access roles defined as public or private.
* Allows admin users to create, retrieve, modify, and delete documents.
* Allows the admin user to retrieve all documents, except private documents.
* Allows documents to be retrieved by its owners.
* Ensures users can delete, and update documents that they own.
* Allows users to retrieve all documents they own.

##### Search

* It allows users to search public/role documents that belong to other users (as well as documents that belong to the user).
* It allows admin to search for a particular user.

##### Tech Stack

* **React** - A javascript library for building user interfaces

* **React-router** - A javascript library for routing in react applications

* **Redux** - A predictable state container for JavaScript apps.

* **Materialize** - A great UI boilerplate for modern web apps

* **Node.js** - A server-side JavaScript runtime engine built on Chrome's V8 JavaScript engine

* **Express** - A node.js framework for routing

* **Webpack** - A file bundler and task runner

* **Sequelize** - A promise-based ORM for Node.js and io.js.

* **JWT** - Used to authenticate users, to enable them access the app routes

* **Postgresql**: object-relational database management system (ORDBMS)

* **ESlint** - Javscript linting utility

* **Babel** - A community driven tool that allows you write latest versions of javascript.

* **Bcrypt** - A password hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher.

##### Test Dependencies

* **Mocha**: A feature-rich JavaScript test framework running on Node.js and in the browser.

* **Chai**: A BDD/TDD assertion library for node and the browser that can be paired with any javascript testing framework.

* **Enzyme**: Enzyme is a JavaScript Testing utility for React

* **Sinon**: Standalone test spies, stubs and mocks for JavaScript. Works with any unit testing framework.

##### How To Use
* Visit <http://docgenie.herokuapp.com/> to use this app online.

OR Install and use locally

##### How To Install

`N.B: DocGenie requires Node.js v4+ to run`

* Clone/download this repository then run the following commands:
```
$ cd DocGenie
$ npm install
$ npm run start:dev
$ npm test
```

##### Run in Postman

* Download and install Postman and check the API Documentation for the endpoints.

##### API Documentation

The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and error messages.
You can find the full API documentation here: <https://memunaharuna.github.io/slate>

##### Authentication

* Users are assigned a token on signup or signin. This token is needed for subsequent HTTP requests to the API for authentication and can be attached as values to the header's x-access-token or authorization key. API requests made without authentication will fail with the status code `401: Unauthorized Access`.

##### Limitations:

- The limitations to the DocGenie Application are as follows:

* Users cannot upload images in their documents.
* Users cannot share documents with people on social platforms like Twitter, Facebook, etc

##### Contributing

- Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:

* Fork this repository to your own account.
* Download/Clone your own forked repository to your local machine.
* Create a new branch: `git checkout -b new-branch-name`.
* Install the dependencies using `npm install`.
* Rename .env_example to .env and add the required information.
* Run `npm run start:dev` to start the application in development mode.
* To run application unit tests: `npm test`.
* To run end-to-end tests: `npm run e2e-test`
* Work on a new feature and push to your remote branch: `git push origin your-branch-name`
* Raise a pull request to the staging branch of this repo.
* For the branch-naming, commit messages and pull request conventions used for this project, kindly check the wiki
of this repo here: <https://github.com/andela-mharuna/DocGenie/wiki>
* This project uses javascript ES6 and follows the airbnb style-guide: <https://github.com/airbnb/javascript>

