import 'vue-router'

// To ensure it is treated as a module, add at least one `export` statement
export {}

declare module 'vue-router' {
  interface RouteMeta {
    //? These two are required by every route now
    authRequirement: "NO_AUTH_NEEDED" | "LOGGED_OUT_ONLY" | "LOGGED_IN_ONLY" | "ADMIN_ONLY"
    verificationRequirement: "NO_VERIFICATION_NEEDED" | "VERIFIED_ONLY"

    //? These are optional meta tags
    recaptchaRequirement?: "USE_RECAPTCHA"
    title?: string
    transition?: string //TODO: Use to migrate away from a Transition Plugin
  }
}