import { login, logout, checkAuthentication } from "@/API/AuthenticationAPI";
import { LOGIN, AUTHENTICATED, LOGGED_IN, LOGIN_ATTEMPT, LOGGED_OUT } from "../MutationTypes";
import { SIGN_IN, SIGN_OUT, AUTHENTICATION_CHECK } from "../ActionTypes";
import { CHECK_AUTHENTICATION, CHECK_VERIFICATION, IS_ADMIN, IS_LANDLORD, IS_TENANT } from "../GetterTypes";

export const AUTH_MODULE = "authentication";

// !: Module
export default {
  namespaced: true,
  state: {
    authenticated: false,
    // - Always a good idea to layout state as much as possible
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
    },
    [CHECK_VERIFICATION]: state => {
      return state.user?.email_verified;
    },
    [IS_ADMIN]: state => {
      return state.user?.role > 0;
    },
    [IS_LANDLORD]: state => {
      return state.user?.role === 0 && state.user?.account_type === 0; // - 0 = Landlord
    },
    [IS_TENANT]: state => {
      return state.user?.role === 0 && state.user?.account_type === 1; // - 1 = Tenant
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
    // - Increment UNLESS reset = 0, at which point reset back to 0!
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
      commit(LOGIN_ATTEMPT); // - Increment to reset if successful
      const response = await login(user);
      if (response.status === 200) {
        commit(LOGGED_IN, response.data.user);
        commit(LOGIN_ATTEMPT, 0);
      }
      return response;
    },
    async [SIGN_OUT]({ commit }) {
      const response = await logout();
      if (response.status === 200) {
        commit(LOGGED_OUT);
        commit(LOGIN_ATTEMPT, 0); // - Reset in case a new login happens
      }
      return response;
    },
    async [AUTHENTICATION_CHECK]({ commit }) {
      const response = await checkAuthentication();
      if (response.status === 200) {
        commit(LOGGED_IN, response.data.user); // - Turn on authentication state
      } else {
        commit(LOGGED_OUT); // - Make sure authentication state is off
      }
    }
  }
};

// !: Common Test Settings
export const MOCK_AUTH_MODULE_LOGGED_IN = {
  [AUTH_MODULE]: {
    state: {
      authenticated: true,
      // - Always a good idea to layout state as much as possible
      user: {
        first_name: "Spyro",
        surname: "leDragon",
        email: "spyroledragon@foobar.com",
        email_verified: false,
        role: 0,
        account_type: null,
        landlord_id: 0,
      },
      loginAttempts: 0
    }
  }
};
export const MOCK_AUTH_MODULE_VERIFIED_EMAIL = {
  [AUTH_MODULE]: {
    state: {
      user: {
        email_verified: true
      }
    }
  }
};
// - Roles
export const MOCK_AUTH_MODULE_ADMIN = {
  [AUTH_MODULE]: {
    state: {
      user: {
        role: 1
      }
    }
  }
};
export const MOCK_AUTH_MODULE_SUPER = {
  [AUTH_MODULE]: {
    state: {
      user: {
        role: 2
      }
    }
  }
};
export const MOCK_AUTH_MODULE_ATTEMPTED_BREAK_IN = {
  [AUTH_MODULE]: {
    state: {
      loginAttempts: 0
    }
  }
};