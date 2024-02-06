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
  const nearestWithTitle = to.matched.slice() //? Returns arr copy
    .reverse() //? Why reverse? We get deepest part of url first! Setting up find to quickly grab
    .find(r => r.meta && r.meta.title); //* Match end of url 'deeply/nested/url' to grab the `url` section
  document.title = nearestWithTitle ? (nearestWithTitle.meta.title as string) : (import.meta.env.VITE_APP_NAME ?? "");
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
