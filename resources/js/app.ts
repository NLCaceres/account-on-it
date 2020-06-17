//! Load all App Dependencies Here!

//! jQuery + SemanticUI
window.$ = window.jQuery = require("jquery"); 
//? Globals ARE considered bad (in particular by TS) BUT this enables semantic's js so global.d.ts to mod Window is required
require("semantic-ui-css/semantic.js");

//! Axios set up
import axios from "axios"; //? Could import like jQuery making it a global window var but this works just as well (in this case)
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.MIX_BASE_URL || "http://127.0.0.1:8000/";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

//! Vue Setup
//window.Vue = require("vue"); // Global declaration
import Vue from "vue";

//? Don't need to double 'Vue.use(Vuex)', just do it all in the store dir below
import store from "./Store"; //? Specifying the dir grabs index.js in it

import router from "./Routes"; // Imports still work though! Which you use is part preference and needs

// Vue.component("example-component", require("./components/ExampleComponent.vue").default); //? Webpack Default Export Loading (ES6 auto grabs default)
// ! 2nd param here is the template+script from a vue file serving as component with name/id = <example-component/>

//! Global Declaration Example for Vue Components - Usable Everywhere
//@params (ID, optionsObj) - optionsObj = helper func, props, filters, or even child components!
// Vue.component("personal-access-tokens", require("./Components/passport/PersonalAccessTokens").default); //? Laravel Passport useful premade Vue components

//? MUST DECLARE ALL MODELS LIKE THIS USED IN COMPONENTS 
//? or get 'componentNormalizer declaration file missing' / 'implicit any' err
//! Models 
require('./Models/UserClass');
require('./Models/EnumRole');
require('./Models/EnumAccountType');

// ! Forms
Vue.component(
    "landlord-form",
    require("./Views/Landlords/FormLandlord").default
);
Vue.component(
    "property-form",
    require("./Views/Properties/FormProperty").default
);
Vue.component(
    "user-form",
    require("./Views/Users/FormUser").default
);

//! Main SPA
import App from "./views/App.vue";

//? Code block below grabs components from dir to globally register
// Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
//@params (dir, useSubdirs, regexp, mode) for require.context()
const navLinkComponents = require.context(
    "./Views/NavLinks",
    false,
    /\.vue$/i
); //? Normal ex. No subdir search
navLinkComponents.keys().map(key => {
    const id = key.split('/').pop()?.split('.')[0];
    if (id) Vue.component(id, navLinkComponents(key).default)
});
const helperComponents = require.context(
    "./Components",
    true,
    /^(?!\.\/Bootstrap\/).*\.vue$/
); //? Regex 3rd param to exclude dirs also!
helperComponents.keys().map(key => {
    const id = key.split('/').pop()?.split('.')[0];
    if (id) Vue.component(id, helperComponents(key).default);
});

//? Create Vue app instance, attach to index.html, and add any other objects/options needed
// new Vue({
//     store,
//     router,
//     el: "app",
//     components: { App }, // Shorthand for "App": App in objects
// });
new Vue({
    store,
    router,
    el: "#app", //? If available will mount or query to find the element 
    render: h => h(App), //? H is actually CreateElement function (common shorthand for some reason)
})//.$mount('#app'); //? If el not immediately available, $mount() is useful to manually mount

$(".ui.dropdown").dropdown();
$(".ui.modal").modal();
