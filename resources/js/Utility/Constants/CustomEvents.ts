import _Vue from "vue";

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

export default function CustomEventsPlugin(Vue: typeof _Vue, options?: any): void {
  //? Simplest way to define a plugin and handle constants with Typescript 
  //? (otherwise defining) them in created() hook would work just fine
  //? The options can be filled in later with specifics or as it's own class/interface

  //? Must be used with 'this' keyword in a SFC (so instance, not a global one according to Vue)
  Vue.prototype.CustomEvents = {
    UPDATE_VIEW: 'update:view',
    UPDATE_PAGE: 'update:page',
    
    SHOW_PASS: 'update:showPass',

    CLOSE_POPUP: 'close-popup',

    GO_BACK: 'go-back', //* Not sure how useful it is, since Vue Router Hooks are a thing!

    AFTER_ENTER: 'after-enter',

    BEFORE_ENTER: 'before-enter',

    CHANGE_SORT: 'change-sort',
  }
}