import { Location, NavigationGuardNext, Route } from "vue-router";

import { ADMIN_ONLY, LOGGED_IN_ONLY, LOGGED_OUT_ONLY, NO_AUTH_NEEDED, NO_VERIFICATION_NEEDED, RECAPTCHA_REQUIRED, VERIFIED_ONLY } from "./MetaTags";
import Store from "../Store";
import { CHECK_AUTHENTICATION, CHECK_VERIFICATION, IS_ADMIN } from "../Store/GetterTypes";
import { AUTH_MODULE } from "../Store/modules/AuthenticationState";
import { AUTHENTICATION_CHECK } from "../Store/ActionTypes";

export const helperFuncs = { CheckAuthRequirements, CheckVerificationRequirements, IsRecaptchaVisible }

export const LogInPath = {path: '/login', name:"Login" ,hash: "", query: {}, params: {}};

export async function MainBeforeEachFn(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  //! Handle direction of app
  let nextPath; //* Final value is where the user is headed next
  nextPath = await helperFuncs.CheckAuthRequirements(to, from);
  nextPath = await helperFuncs.CheckVerificationRequirements(to, from);
  
  //* Seemingly best way to avoid infinite reloads with next() below
  //* If nextPath is different than it's been changed either due to lack of auth or lack of verification 
  if (nextPath.path !== to.path) next(nextPath); //* so a redirect is likely
  else next(); //* Otherwise an empty call to next() is the "okay sign" to continue normal nav to desired url

  //! UI
  helperFuncs.IsRecaptchaVisible(to, from);
}

export async function CheckAuthRequirements(to: Route, from: Route): Promise<Location> {
  const metaAuthRequirement = to.meta?.authRequirement 
  const toPath = to as Location;
  const fromPath = from as Location;

  if (metaAuthRequirement === NO_AUTH_NEEDED) return toPath;

  else if (metaAuthRequirement === LOGGED_OUT_ONLY) {
    if (!Store.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`]) return toPath; 
  } 

  else if (metaAuthRequirement === LOGGED_IN_ONLY) {
    //? When user first visits site, fromPath is ALWAYS '/' regardless of what's typed in browser!
    //? Interestingly, toPath is what the user typed in, '/login', 'home', '404' etc!
    //* Following line handles when a user refreshes page 
    if (from.path === '/') await Store.dispatch(`${AUTH_MODULE}/${AUTHENTICATION_CHECK}`); 
    if (Store.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`]) return toPath; 
    else return LogInPath;
  } 

  else if (metaAuthRequirement === ADMIN_ONLY) {
    //? Awaiting an async func that doesn't return anything is still possible! All async funcs will return a promise regardless! 
    if (from.path === '/') await Store.dispatch(`${AUTH_MODULE}/${AUTHENTICATION_CHECK}`);
    //? Making sure that these getters have a value to check!
    if (Store.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`] && Store.getters[`${AUTH_MODULE}/${IS_ADMIN}`]) return toPath; 
  } 
  
  return fromPath; //* Made it here, just go back
}

export function CheckVerificationRequirements(to: Route, from: Route): Location {
  const verificationRequirement = to.meta?.verificationRequirement;
  const toPath = to as Location;
  const fromPath = from as Location;

  if (verificationRequirement === NO_VERIFICATION_NEEDED) { //* No Verification req so good to go
    return toPath;
  }
  else if (verificationRequirement === VERIFIED_ONLY) { //* Needs verification so check it!
    if (Store.getters[`${AUTH_MODULE}/${CHECK_VERIFICATION}`]) return toPath;
  }
  return fromPath; //* Default - Don't allow!
}

export function IsRecaptchaVisible(to: Route, from: Route) {
  const recaptchaRequirement = to.meta?.recaptchaRequirement; 
  
  const recaptchaReqSatisfied = recaptchaRequirement !== undefined && recaptchaRequirement === RECAPTCHA_REQUIRED;
  $('div.grecaptcha-badge').toggle(recaptchaReqSatisfied); //? False value with jQuery Toggle will hide the block
}