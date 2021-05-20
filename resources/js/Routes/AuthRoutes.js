import { RECAPTCHA_REQUIRED, LOGGED_OUT_ONLY, NO_VERIFICATION_NEEDED, LOGGED_IN_ONLY } from "./MetaTags";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "LoginComponent" */ "../Components/Login/SuiLoginView.vue"),
    meta: { title: "Login", recaptchaRequirement: RECAPTCHA_REQUIRED,
      authRequirement: LOGGED_OUT_ONLY, verificationRequirement: NO_VERIFICATION_NEEDED }
  },
  {
    path: "/forgot-password",
    name: "ForgotPass",
    component: () => import(/* webpackChunkName: "ForgotPasswordForm" */ "../Components/Login/SuiForgotPassword/SuiForgotPasswordView.vue"),
    meta: { title: "Forgot Password", recaptchaRequirement: RECAPTCHA_REQUIRED,
      authRequirement: LOGGED_OUT_ONLY, verificationRequirement: NO_VERIFICATION_NEEDED }
  },
  { //? Vue-Router uses pathToRegexp to process it's routes allowing some nice regexp-like mods
    path: "/sign(-)?up", //* Optional dash thanks to regexp. //? Parentheses required
    name: "SignUp",
    component: () => import(/* webpackChunkName: "NewUserView" */ "../Views/Users/NewUser.vue"),
    alias: ["/registration"],
    meta: { title: "Account Sign Up", recaptchaRequirement: RECAPTCHA_REQUIRED,
      authRequirement: LOGGED_OUT_ONLY, verificationRequirement: NO_VERIFICATION_NEEDED }
  },
  { //* Need finishVerification page only! The resendVerification can be a button in profile, and initial verification on registration
    path: "/email/verify/:id/:hash",
    name: "FinishVerification",
    component: () => import (/* webpackChunkName: "FinishVerificationView" */ "../Views/Users/NewUser.vue"),
    meta: { title: "Finish Verifying Account", recaptchaRequirement: RECAPTCHA_REQUIRED, 
      authRequirement: LOGGED_IN_ONLY, verificationRequirement: NO_VERIFICATION_NEEDED }
  }
]
// routes.map((route) => {
//   route.meta.authRequirement = LOGGED_OUT_ONLY;
//   route.meta.verificationRequirement = NO_VERIFICATION_NEEDED; 
//   route.meta.recaptchaRequirement = RECAPTCHA_REQUIRED;
// })

export default routes;