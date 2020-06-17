import landlordsAPI from '../API/LandlordAPI';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//! Modules w/ namespace constants
import app from './modules/AppState';
export const APP_MODULE = 'app';

import authentication from './modules/AuthenticationState';
export const AUTH_MODULE = 'authentication';

import landlords from './modules/LandlordState';
export const LANDLORD_MODULE = 'landlords';

import tenants from './modules/TenantState';
export const TENANT_MODULE = 'tenants';

//! Store
export default new Vuex.Store({
  //? Simple imports as always! Vuex Dir structure doesn't necessarily need to follow Vue's 
  //? .. = next to
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