//! Load all App Dependencies Here!

//! jQuery for SemanticUI
window.$ = window.jQuery = require('jquery');
require('semantic-ui-css/semantic.js')

//! Axios set up
import axios from 'axios'; //? Could import like jQuery making it a global window var but this works just as well (in this case)
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.MIX_BASE_URL || 'http://127.0.0.1:8000/';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Vue = require("vue"); // Global declaration

import Vuex from 'vuex';
Vue.use(Vuex);
import store from './Store'; //? Actually imports index.js in the directory asked for! (and index exports our store!)

import VueRouter from "vue-router"; // Imports still work though! Which you use is part preference and needs
Vue.use(VueRouter);

// Vue.component("example-component", require("./components/ExampleComponent.vue").default); //? Webpack Default Export Loading (ES6 auto grabs default)
// ! 2nd param here is the template+script from a vue file serving as component with name/id = <example-component/>

//! Global Declaration Example for Vue Components - Usable Everywhere
//@params (ID, optionsObj) - optionsObj = helper func, props, filters, or even child components!
// Vue.component("personal-access-tokens", require("./Components/passport/PersonalAccessTokens").default); //? Laravel Passport useful premade Vue components

// ! Routes with their views inside
import LandlordRoutes from "./Routes/Landlord_Routes";
Vue.component('landlord-form', require('./Views/Landlords/LandlordForm').default);
import TenantRoutes from "./Routes/Tenant_Routes";
import PropertyRoutes from "./Routes/Property_Routes";
Vue.component('property-form', require('./Views/Properties/PropertyForm').default);
import UsersView from "./views/Users";

//! Main SPA
import App from "./views/App";
import Home from "./views/Home";

//? Code block below grabs components from dir to globally register
// Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
//@params (dir, useSubdirs, regexp, mode) for require.context()
const navLinkComponents = require.context('./Views/NavLinks', false, /\.vue$/i); //? Normal ex. No subdir search
navLinkComponents.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], navLinkComponents(key).default));
const helperComponents = require.context('./Components', true, /^(?!\.\/Bootstrap\/).*\.vue$/); //? Regex 3rd param to exclude dirs also!
helperComponents.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], helperComponents(key).default));

const router = new VueRouter({
    // ? Could also separate router itself into a different dir, export there and import it here
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/users",
            name: "Users",
            component: UsersView
        },
        {
            path: "/login",
            name: "Login",
            component: () => import( /* webpackChunkName: "LoginComponent" */ "./Components/SemanticUI/Login/SuiLoginView.vue")
        },
        { path: "/not-found", name: "404", component: () => import( /* webpackChunkName: "404Component" */ "./Components/SemanticUI/GenericViews/NotFound.vue")/* helperComponents('./Components/GenericViews/NotFound.vue').default */ },
        { path: "*", redirect: "/not-found" }
    ].concat(LandlordRoutes, TenantRoutes, PropertyRoutes)
});

//? Create Vue app instance, attach to index.html, and add any other objects needed
const app = new Vue({
    el: "#app",
    components: { App }, // Shorthand for "App": App in objects
    store,
    router
});

$(".ui.dropdown").dropdown();
$('.ui.modal').modal();
