import { App, type Plugin } from "vue";

//TODO: Might be completely replaceable by the Vue 3 emits option
//TODO: Look for $emit and document what components can emit i.e.
//* export default { emits: ["UPDATE_VIEW", "UPDATE_PAGE"] }
export interface CustomEventsConstants {
  UPDATE_VIEW: string
  UPDATE_PAGE: string

  SHOW_PASS: string

  CLOSE_POPUP: string

  GO_BACK: string

  AFTER_ENTER: string

  BEFORE_ENTER: string

  CHANGE_SORT: string
}

//? Vue 3 slightly changed plugin definitions by suggesting this syntax rather than a formal Javascript function definition
//? Creating an object with an install key also works, e.g. const somePlugin = { install: (app, options) => {} }
const CustomEventsPlugin: Plugin = (app: App, options: any) => {
  //? Vue 3 also slightly changed augmenting global constants in the Vue instance by adding the app's config.globalProperties
  app.config.globalProperties.CustomEvents = {
    UPDATE_VIEW: 'update:view',
    UPDATE_PAGE: 'update:page',
    
    SHOW_PASS: 'update:showPass',

    CLOSE_POPUP: 'close-popup',

    GO_BACK: 'go-back', //* Not sure how useful it is, since Vue Router Hooks are a thing!

    AFTER_ENTER: 'after-enter',

    BEFORE_ENTER: 'before-enter',

    CHANGE_SORT: 'change-sort',
  };
}
export default CustomEventsPlugin;