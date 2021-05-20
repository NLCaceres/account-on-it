import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//! Modules w/ namespace constants
import app, { APP_MODULE } from './modules/AppState';

import authentication, { AUTH_MODULE } from './modules/AuthenticationState';

import landlords, { LANDLORD_MODULE } from './modules/LandlordState';

import tenants, { TENANT_MODULE } from './modules/TenantState';

import loginPopup, { LOGIN_POPUP_MODULE } from "./modules/LoginPopupState";

import intersectionAPI, { INTERSECTION_MODULE } from './modules/IntersectionState';

//! Store
export function DefaultStore() {
  return {
    //? Simple imports as always! Vuex Dir structure doesn't necessarily need to follow Vue's 
    //? .. = next to in the following
    //? (./Store/index .. ./Store/modules, etc) but up to the dev!
    //? Counter-ex: (./Store/index .. ./Store/auth => ./Store/auth/index.js .. ./Store/auth/actions.js .. ./Store/auth/mutators.js, etc);
    //? Diff being each module gets its own dir w/ separate files for mutations & actions probably
    //? Since they can get big. Finally index.js imports and coordinates those other files
    modules: { app, authentication, landlords, tenants, loginPopup, intersectionAPI },

    //? Strict mode ensures you can only mutate state via designated mutations! Will crash if your code mutates state outside of them
    //* When local, it'll be strict mode (good for dev)
    strict: process.env.APP_ENV === 'local' //? Not needed in production, since it's slow
  }
}

export default new Vuex.Store(DefaultStore());
