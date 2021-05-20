import { OPEN_POPUP, CHANGE_POPUP_VIEW} from "../ActionTypes";
import { OPENING_POPUP, CHANGE_TO_FORGOT_PASS, CHANGE_TO_LOGIN_FORM, CHANGE_TO_NEW_USER} from "../MutationTypes";

export const LOGIN_POPUP_MODULE = 'loginPopup'

export const GO_FORGOT_PASS_FORM = "FORGOT_PASS"
export const GO_NEW_USER_FORM = "NEW_USER"
export const GO_LOGIN_FORM = "LOGIN"

export default {
  namespaced: true,
  state: {
    loginForm: true,
    forgotPasswordForm: false,
    newUserForm: false,
  },
  getters: {

  },
  mutations: {
    [CHANGE_TO_FORGOT_PASS](state) {
      state.forgotPasswordForm = !state.forgotPasswordForm;
      state.loginForm = false;
      state.newUserForm = false;
    },
    [CHANGE_TO_NEW_USER](state) {
      state.newUserForm = !state.newUserForm;
      state.forgotPasswordForm = false;
      state.loginForm = false;
    },
    [CHANGE_TO_LOGIN_FORM](state) {
      state.loginForm = !state.loginForm;
      state.forgotPasswordForm = false;
      state.newUserForm = false;
    },
  },
  actions: {
    [CHANGE_POPUP_VIEW]({commit}, nextPage) {
      if (nextPage === GO_FORGOT_PASS_FORM) {
        commit(CHANGE_TO_FORGOT_PASS);
      } else if (nextPage === GO_NEW_USER_FORM) {
        commit(CHANGE_TO_NEW_USER);
      } else {
        commit(CHANGE_TO_LOGIN_FORM);
      }
    }
  }
}