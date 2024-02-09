// window.Date = Date; //TODO: Likely not needed since Jest/Vitest are generally very good about mocking Date/Timers
// global.axios = require('axios'); //TODO: Likely not needed, especially if using fetch over axios
global.$ = global.jQuery = require("jquery");
require("fomantic-ui-css/semantic.js");

//? JSDom does not support Browser's IntersectionObserver so we can shim it ourselves!
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {}
  disconnect() { return null; }
  observe(element, initObject) { return null; }
  unobserve(element) { return null; }
};
