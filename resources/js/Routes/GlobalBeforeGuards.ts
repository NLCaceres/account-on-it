import { RouteLocationNormalized, RouteLocationPathRaw } from "vue-router";
import { ADMIN_ONLY, LOGGED_IN_ONLY, LOGGED_OUT_ONLY, NO_AUTH_NEEDED, NO_VERIFICATION_NEEDED, RECAPTCHA_REQUIRED, VERIFIED_ONLY } from "./MetaTags";
import Store from "../Store";
import { CHECK_AUTHENTICATION, CHECK_VERIFICATION, IS_ADMIN } from "../Store/GetterTypes";
import { AUTH_MODULE } from "../Store/modules/AuthenticationState";
import { AUTHENTICATION_CHECK } from "../Store/ActionTypes";

//TODO: Move Helpers to their own file
export const helperFuncs = { CheckAuthRequirements, CheckVerificationRequirements, IsRecaptchaVisible }

export const LogInPath: RouteLocationPathRaw = { path: "/login" }; //TODO: Probably don't need this export since it's not imported anywhere

export async function MainBeforeEachFn(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  //! Handle direction of app
  let nextPath: RouteLocationPathRaw; //* Final value is where the user is headed next
  //* If `nextPath` is different than `to`, it's been changed either due to lack of auth or lack of verification
  //? So in Vue-Router 4, simply return a RouteLocation(PathRaw/NamedRaw) or string, all of which need EITHER a path or a name, e.g. "/login" or "Login"
  nextPath = await helperFuncs.CheckAuthRequirements(to, from);
  //? If nextPath set to anything other than original destination, THEN immediately redirect to prevent being overwritten by CheckVerification
  if (nextPath.path !== to.path) { return nextPath };

  nextPath = helperFuncs.CheckVerificationRequirements(to, from);
  if (nextPath.path !== to.path) { return nextPath };

  //! UI
  helperFuncs.IsRecaptchaVisible(to, from); //TODO: Move to GlobalAfterGuard
  return true; //? Returning `true`, `undefined`, or nothing, validates the nav, calling Vue-Router 3's old next() under the hood
}

export async function CheckAuthRequirements(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  const metaAuthRequirement = to.meta?.authRequirement;

  if (metaAuthRequirement === NO_AUTH_NEEDED) { return { path: to.path }; }

  else if (metaAuthRequirement === LOGGED_OUT_ONLY) {
    if (!Store.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`]) { return { path: to.path }; }
  } 

  else if (metaAuthRequirement === LOGGED_IN_ONLY) {
    //? When user first visits site, fromPath is ALWAYS '/' regardless of what's typed in browser!
    //? Interestingly, toPath is what the user typed in, '/login', 'home', '404' etc!
    //* Following line handles when a user refreshes page 
    if (from.path === '/') { await Store.dispatch(`${AUTH_MODULE}/${AUTHENTICATION_CHECK}`); }
    if (Store.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`]) { return { path: to.path }; }
    else { return LogInPath; }
  } 

  else if (metaAuthRequirement === ADMIN_ONLY) {
    if (from.path === '/') { await Store.dispatch(`${AUTH_MODULE}/${AUTHENTICATION_CHECK}`); }
    //? Making sure that these getters have a value to check!
    if (Store.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`] && Store.getters[`${AUTH_MODULE}/${IS_ADMIN}`]) { return { path: to.path }; }
  }

  return { path: from.path }; //* Made it here, just go back
}

export function CheckVerificationRequirements(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  const verificationRequirement = to.meta?.verificationRequirement;

  if (verificationRequirement === NO_VERIFICATION_NEEDED) {
    return { path: to.path };
  }
  else if (verificationRequirement === VERIFIED_ONLY) { //* Needs verification so check the user's verification!
    if (Store.getters[`${AUTH_MODULE}/${CHECK_VERIFICATION}`]) { return { path: to.path }; }
  }
  return { path: from.path }; //* Default - Don't allow the user to go to the `to` link!
}

export function IsRecaptchaVisible(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  const recaptchaRequirement = to.meta?.recaptchaRequirement; 
  
  const recaptchaReqSatisfied = recaptchaRequirement !== undefined && recaptchaRequirement === RECAPTCHA_REQUIRED;
  $('div.grecaptcha-badge').toggle(recaptchaReqSatisfied); //? False value with jQuery Toggle will hide the block
}
