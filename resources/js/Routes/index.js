import { createRouter, createWebHistory } from "vue-router";
import { RECAPTCHA_REQUIRED, NO_VERIFICATION_NEEDED, NO_AUTH_NEEDED } from "./MetaTags";
import LandlordRoutes from "./LandlordRoutes";
import TenantRoutes from "./TenantRoutes";
import PropertyRoutes from "./PropertyRoutes";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";
import { MainBeforeEachFn } from "./GlobalBeforeGuards";
import { MainAfterEachNavGuard } from "./GlobalAfterGuards";

//! defineAsyncComponents NOT needed here. VueRouter uses a similar syntax BUT none of these components in ANY routes are asyncComponents
export const StandardRoutes = [
  {
    path: "/",
    name: "Home",
    components: { //? `wide` key is used to find the <router-view name="wide"> to inject the HomePage into App.vue
      wide: () => import("@/Views/Home/HomePage.vue")
    },
    meta: {
      title: "Home", recaptchaRequirement: RECAPTCHA_REQUIRED,
      authRequirement: NO_AUTH_NEEDED, verificationRequirement: NO_VERIFICATION_NEEDED
    }
  },
  {
    path: "/not-found",
    name: "404",
    component: () => import("@/Components/GenericViews/NotFound.vue"),
    meta: {
      title: "Account Sign Up", recaptchaRequirement: RECAPTCHA_REQUIRED,
      authRequirement: NO_AUTH_NEEDED, verificationRequirement: NO_VERIFICATION_NEEDED
    }
  },
  { path: "/:pathMatch(.*)", redirect: "/not-found" }
]

//? Concat is typically better when large data sets (vs '...' spread operator)
export const FullRoutes = StandardRoutes.concat(LandlordRoutes, TenantRoutes, PropertyRoutes, UserRoutes, AuthRoutes)
const router = new createRouter({
  history: createWebHistory(),
  routes: FullRoutes
});

//? Any other calls to the global beforeEach will be called after this one
//? BUT the component's beforeRouteLeave guard will be called before the global beforeEach calls
router.beforeEach((to, from) => MainBeforeEachFn(to, from));
router.afterEach((to, from) => { MainAfterEachNavGuard(to, from) });

export default router;