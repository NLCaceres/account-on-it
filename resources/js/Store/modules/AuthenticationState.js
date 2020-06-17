import authAPI from '../../API/AuthenticationAPI';
import { LOGIN, AUTHENTICATED, LOGGED_IN, LOGIN_ATTEMPT, LOGGED_OUT } from '../MutationTypes';
import { SIGN_IN, SIGN_OUT, AUTHENTICATION_CHECK } from '../ActionTypes';

//! Getters
export const CHECK_AUTHENTICATION = 'CHECK_AUTHENTICATION';

export default {
  namespaced: true,
  state: {
    authenticated: false,
    //* Always a good idea to layout state as much as possible
    user: {
      first_name: "",
      surname: "",
      email: "",
      email_verified: false,
      role: 0,
      account_type: null,
      landlord_id: 0,
    },
    loginAttempts: 0
  },
  getters: {
    [CHECK_AUTHENTICATION]: state => {
      return state.authenticated && state.user;
    }
  },
  mutations: {
    [LOGIN](state, user) {
      state.user = user;
    },
    [AUTHENTICATED](state, authenticated) {
      state.authenticated = authenticated;
    },
    [LOGGED_IN](state, user) {
      state.user = user;
      state.authenticated = true;
    },
    //* Increment UNLESS reset = 0, at which point reset back to 0!
    [LOGIN_ATTEMPT](state, reset = null) {
      reset === 0 ? state.loginAttempts = 0 : state.loginAttempts++;
    },
    [LOGGED_OUT](state) {
      state.user = null;
      state.authenticated = false;
    }
  },
  actions: {
    async [SIGN_IN]({ commit }, user) {
      commit(LOGIN_ATTEMPT); //? Increment to reset if successful
      const response = await authAPI.login(user);
      if (response.status === 200) {
        console.log(response.data.message);
        commit(LOGGED_IN, response.data.user);
        commit(LOGIN_ATTEMPT, 0);
      }
      return response;
    },
    async [SIGN_OUT]({ commit }) {
      const response = await authAPI.logout();
      if (response.status === 200) {
        commit(LOGGED_OUT);
        commit(LOGIN_ATTEMPT, 0); //? Reset in case a new login happens
      }
      return response;
    },
    async [AUTHENTICATION_CHECK]({ commit }) {
      const response = await authAPI.checkAuthentication();
      if (response.status === 200) {
        commit(LOGGED_IN, response.data.user); //? Turn on authentication state
      } else {
        commit(LOGGED_OUT); //? Make sure authentication state is off
      }
    }
  }
}