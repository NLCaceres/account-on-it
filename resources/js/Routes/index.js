import Vue from "vue";
import VueRouter from "vue-router";

import LandlordRoutes from "./LandlordRoutes";
import TenantRoutes from "./TenantRoutes";
import PropertyRoutes from "./PropertyRoutes";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";

import { RECAPTCHA_REQUIRED, NO_VERIFICATION_NEEDED, NO_AUTH_NEEDED } from "./MetaTags";

import { CheckAuthRequirements, IsRecaptchaVisible, CheckVerificationRequirements, MainBeforeEachFn } from "./GlobalBeforeGuards";

Vue.use(VueRouter);

export const StandardRoutes = [
  {
    path: "/",
    name: "Home",
    components: {
      wide: () => import(/* webpackChunkName: "HomePage" */ "../Views/Home/HomePage.vue")
    },
    meta: { title: "Home", recaptchaRequirement: RECAPTCHA_REQUIRED, 
      authRequirement: NO_AUTH_NEEDED, verificationRequirement: NO_VERIFICATION_NEEDED }
  },
  {
    path: "/not-found",
    name: "404",
    component: () => import(/* webpackChunkName: "404Component" */ "../Components/GenericViews/NotFound.vue"), 
      /* helperComponents('./Components/GenericViews/NotFound.vue').default */
    meta: { title: "Account Sign Up", recaptchaRequirement: RECAPTCHA_REQUIRED,
      authRequirement: NO_AUTH_NEEDED, verificationRequirement: NO_VERIFICATION_NEEDED }
  },
  { path: "*", redirect: "/not-found" }
]

import Component from 'vue-class-component'

//? Register the router hooks with their names so visible to TS
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

//? Concat is typically better when large data sets (vs '...' spread operator)
export const FullRoutes = StandardRoutes.concat(LandlordRoutes, TenantRoutes, PropertyRoutes, UserRoutes, AuthRoutes)

const Router = new VueRouter({
  mode: "history",
  routes: FullRoutes
});

//? Any other versions of the global beforeEach will be called after and once the component changes 
//? Consequently the App component version is not immediately called until the user clicks a link
//? Only 1 next func can be accessible. It MUST be present or no routing occurs. Any other accessible ones will override rest
Router.beforeEach((to, from, next) => MainBeforeEachFn(to, from, next));

export default Router;