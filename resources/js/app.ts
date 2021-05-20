//? Load all App Dependencies Here!

//! jQuery + SemanticUI
window.$ = window.jQuery = require("jquery"); //? Globals ARE considered bad (in particular by TS)
require("fomantic-ui-css/semantic.js"); //? BUT SemanticJS expects it so adding $ and jQuery to Window in Global.d.ts helps
require("hammerjs");

//! Axios set up
import axios from "axios"; //? Could import like jQuery making it a global window var but this works just as well (in this case)
axios.defaults.withCredentials = true; //? Useful for cross origin requests
axios.defaults.baseURL = process.env.MIX_BASE_URL || "http://127.0.0.1:8000/";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json"; //* Ensures that Laravel never sends back a new html file

//? MUST DECLARE ALL MODELS USED IN COMPONENTS LIKE THIS
//? or will get 'componentNormalizer declaration file missing' / 'implicit any' err msg
//! Models 
require('./Models/UserClass');
require('./Models/TenantClass');
require('./Models/LandlordClass');

//! API
require('./API/UserAPI');
require('./API/LandlordAPI');
require('./Models/InterfaceLaravelResponse');
require('./Models/InterfaceLaravelError');

//! Vue Setup
//window.Vue = require("vue"); //? Global declaration (but doesn't play nicely w/ Typescript)
import Vue from "vue";

//? Calling 'Vue.use(Vuex)' in each index file below is good enough!
import store from "./Store"; //? Specifying the dir grabs index.js in it
import router from "./Routes"; //? Whether you use import or require is up to you! (though TS seems to prefer import)

//! Constants
import CustomEvents from './Utility/Constants/CustomEvents';
import Transitions from './Utility/Constants/Transitions';

//! Plugins
Vue.use(CustomEvents);
Vue.use(Transitions);

//! Main SPA
import App from "./Views/App.vue";

//? Global Declaration for Vue Components - Usable throughout App, no further importing necessary
//@params (ID, optionsObj) - optionsObj = template+script, helper func, props, filters, or even child/local components!
// Vue.component("personal-access-tokens", require("./Components/passport/PersonalAccessTokens").default); //? Laravel Passport's premade Vue components
//? The above makes -> <example-component></example-component> 

//@params (dir, useSubdirs, regexp, mode) for require.context()
//? Regexp 3rd param can exclude dirs also!
const helperComponents = require.context(
    "./Components", //* Easier to just load this set of directories rather than eliminate dirs like below
    true,
    /\.vue$/i // /^(?!\.\/Bootstrap\/).*\.vue$/ //? This other one looks for './Bootstrap/subdir' and gets rid of it
  );
  helperComponents.keys().map(key => {
    const id = key.split('/').pop()?.split('.')[0];
    if (id) Vue.component(id, helperComponents(key).default); //? Webpack Default Export Loading (ES6 import auto-grabs default)
  }); //* Grabs 

//? Create Vue app instance, attach to index.html, and add any other objects/options needed
new Vue({
    store,
    router,
    el: "#app", //? If available will mount or query to find the element 
    render: h => h(App), //? H is actually CreateElement function (common shorthand for some reason)
})//.$mount('#app'); //? If el not immediately available, $mount() is useful to manually mount

//! Semantic UI Init
$(".ui.modal").modal();
