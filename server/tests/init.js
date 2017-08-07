// require dotenv so that sequelize recognizes env variables in .env file
const dotenv = require('dotenv');

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

// invoke dotenv config method
dotenv.config();

// JSDOM mocks the browser API for mocha and enzyme
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = document.defaultView;


// loops through all keys of document.defaultView and attaches each of those
// properties to the global object
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

// attaches HTMLElement to global object
global.HTMLElement = window.HTMLElement;

// mocks JQuery
global.$ = () => ({
  modal: () => null,
  dropdown: () => null,
  sideNav: () => null,
  froalaEditor: () => ({ data: () => ({ $el: 'whatever' }) }),
  on: () => null,
});

// mocks localStorage
global.localStorage = {
  getItem() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGVJZCI6MSwiaWF0IjoxNDk4Nzc5ODY1LCJleHAiOjE0OTg4NjYyNjV9.kAL9MtQNzhCwifkegup-DAeQllXi7bMoXvdMYHEQLrc';
  },
  setItem() {
    return null;
  },
  removeItem() {
    return null;
  }
};
