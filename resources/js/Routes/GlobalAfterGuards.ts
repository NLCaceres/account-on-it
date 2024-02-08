//? Since Vue-Router 4 acts a bit differently than Vue-Router 3,
//? AfterEach guards are recommended for small changes like the page title or even more importantly Transitions!
import { type RouteLocationNormalized } from "vue-router";
import { DEFAULT_COMPONENT_TRANSITION } from "@/Utility/Constants/Transitions";
import { RECAPTCHA_REQUIRED } from "./MetaTags";

//? If needed, can use a 3rd param (failure: NavigationFailure) to detect when a user is going to be forced to remain on the current page
export async function MainAfterEachNavGuard(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  UpdateTitle(to, from);
  UpdateTransitionEffect(to, from);
  UpdateRecaptchaVisibility(to, from);
}

//* Handles Window Title based on VueRouter meta title value
export function UpdateTitle(to: RouteLocationNormalized, from: RouteLocationNormalized): void {
  //? If this app supported NestedRoutes i.e. a RouteRecord in any of the Routes.ts files that used the `children` prop
  //? THEN `to.matched` array prop would make sense to check, since the parent and its child (or even grandchild) would all be in `matched`
  // const nearestWithTitle = to.matched.slice() //? slice() used like this returns a copy of the array
  //   .reverse() //? This would make getting `matched` last index the MOST relevant match to what is seen 
  //   .find(r => r.meta && r.meta.title); //? SINCE directly using `to.meta` contains ALL `matched` indices meta tags
  document.title = to.meta.title ? to.meta.title : (import.meta.env.VITE_APP_NAME ?? "");
};

export function UpdateTransitionEffect(to: RouteLocationNormalized, from: RouteLocationNormalized): void {
  //* All routes have a meta key for transition names which will trigger various transitions
  let transitionName = to.meta.transition ?? from.meta.transition;

  //* W/ > 6 transitions, switch would probably be best
  if (transitionName === "slide") {
    const toDepth = to.path.split("/").length; //? Split at delimiter into array (/landlords -> [white-space,landlords])
    const fromDepth = from.path.split("/").length; //? '/' home route still makes 2 indices, both are just whitespace!
    transitionName = (toDepth < fromDepth || to.path === "/") ? "slide-right" : "slide-left";
  }

  //* Select a transition from VueRoutes or our default 'fade' transition
  transitionName = transitionName ?? DEFAULT_COMPONENT_TRANSITION;
  to.meta.transition = transitionName;
};

export function UpdateRecaptchaVisibility(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  const recaptchaRequirement = to.meta?.recaptchaRequirement;

  const recaptchaReqSatisfied = recaptchaRequirement !== undefined && recaptchaRequirement === RECAPTCHA_REQUIRED;
  $('div.grecaptcha-badge').toggle(recaptchaReqSatisfied); //? False value with jQuery Toggle will hide the block
}
