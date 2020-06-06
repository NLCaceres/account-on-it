import landlordsAPI from '../API/landlords';
import Vue from 'vue'
import Vuex from 'vuex'

//! Modules w/ namespace constants
import app from './modules/app';
export const APP_MODULE = 'app';

import authentication from './modules/authentication';
export const AUTH_MODULE = 'authentication';

import landlords from './modules/landlords';
export const LANDLORD_MODULE = 'landlords';

import tenants from './modules/tenants';
export const TENANT_MODULE = 'tenants';

Vue.use(Vuex);

//! Store
export default new Vuex.Store({
  //? Simple imports as always! app structure doesn't necessarily need to follow Vue's 
  //? (./Store/index .. ./Store/modules, etc) but up to the dev!
  //? Counter-ex: (./Store/index .. ./Store/auth => ./Store/auth/index.js .. ./Store/auth/actions.js .. ./Store/auth/mutators.js, etc);
  //? Diff being each module gets its own dir w/ separate files for mutations & actions probably
  //? Since they can get big. Finally index.js imports and coordinates those other files
  modules: {
    app, authentication, landlords, tenants
  },
  //? Strict mode ensures you can only mutate state via designated mutations! Will crash if your code mutates state outside of them
  strict: process.env.APP_ENV === 'local' //? Not needed in production, since it's slow
})