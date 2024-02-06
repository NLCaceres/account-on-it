import { RECAPTCHA_REQUIRED, LOGGED_OUT_ONLY, NO_VERIFICATION_NEEDED, LOGGED_IN_ONLY } from "./MetaTags";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/Components/Login/SuiLoginView.vue"),
    meta: { title: "Login", authRequirement: LOGGED_OUT_ONLY }
  },
  {
    path: "/forgot-password",
    name: "ForgotPass",
    component: () => import("@/Components/Login/SuiForgotPassword/SuiForgotPasswordView.vue"),
    meta: { title: "Forgot Password", authRequirement: LOGGED_OUT_ONLY }
  },
  {
    path: "/sign:_(-)?up", //? Optional dash thanks to new Vue-Router optionals. Syntax = Colon + underscore + parentheses, i.e. :_(-)?
    name: "SignUp",
    component: () => import("@/Views/Users/NewUser.vue"),
    alias: ["/registration"],
    meta: { title: "Account Sign Up", authRequirement: LOGGED_OUT_ONLY }
  },
  { //* Need finishVerification page only! The resendVerification can be a button in profile, and initial verification on registration
    path: "/email/verify/:id/:hash",
    name: "FinishVerification",
    component: () => import ("@/Views/Users/NewUser.vue"),
    meta: { title: "Finish Verifying Account", authRequirement: LOGGED_IN_ONLY }
  }
]

routes.map((route) => {
  route.meta.recaptchaRequirement = RECAPTCHA_REQUIRED;
  route.meta.verificationRequirement = NO_VERIFICATION_NEEDED;
})

export default routes;