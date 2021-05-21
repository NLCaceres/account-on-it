//? In order to get jQuery and other globals to work, they should be loaded here
//? Whether using mochapack or jest (Jest does NOT use webpack, so webpack configs won't help it)
require('jsdom-global')();
const file = require('laravel-mix/src/File')
global.File = file; //? Fixes weird issue as mochapack detects paths
window.Date = Date;

global.expect = require('expect');
global.axios = require('axios');
global.$ = global.jQuery = require("jquery");
require("fomantic-ui-css/semantic.js");

//? JsDom above does not support Browser's mutationObserver so we can shim it ourselves!
//? If we want a true shim 'npm i -D mutationobserver-shim' and load it here
global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {}
  disconnect() { return null; }
  observe(element, initObject) { return null; }
  unobserve(element) { return null; }
};

//? NOTE: Beware circular dependencies!
//? One file imports a few functions
//? You're testing those functions
//? You import that file that imported those functions!
//? Mochapack throws off a weird error along the lines of "Cannot set property 'babel-loader!vue-loader!filename" of undefined"