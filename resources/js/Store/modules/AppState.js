import {
  LOAD, SAVE, ERROR, UPDATE_HEIGHT, UPDATE_WIDTH, UPDATE_RECAPTCHA_SCORE, SET_PAGE_VISIBILITY_API, APP_MSG
} from "../MutationTypes";
import {
  BEGIN_LOAD, BEGIN_SAVE, CHANGE_RECAPTCHA_SCORE, ERROR_OCCURRED, INIT_PAGE_VISIBILITY, NEW_MESSAGE, RESIZE_WINDOW
} from "../ActionTypes";
import {
  MID_DESKTOP_WIDTH, GENERAL_DESKTOP_WIDTH, LARGE_DESKTOP_WIDTH,
  MOBILE_WIDTH, PAGE_VISIBILITY_READY, TABLET_WIDTH, GET_NEW_MESSAGE
} from "../GetterTypes";
import InitPageVisibilityAPI, { IsVisApiAvailable } from "@/Utility/Functions/page_visibility";

export const APP_MODULE = "app";

//! Getters
export const getters = {
  //! Mobile Dimensions
  //? Bootstrap suggests < 576px for portrait mobile, 576 - 768px landscape
  //* As reference point, biggest phone seems to be iphone 12 pro max at 428px, smallest galaxy fold 280px
  [MOBILE_WIDTH]: state => {
    return state.window.width < 481;
  },
  // [MOBILE_HEIGHT]: state => {
  //   return (state.window.width < 481) ? true : false;
  // },
  //? 768px - 992px for tablets
  [TABLET_WIDTH]: state => {
    return state.window.width > 576 && state.window.width < 992;
  },
  //? 992px small, 1200px large, 1400px massive screens
  [GENERAL_DESKTOP_WIDTH]: state => state.window.width >= 992,
  [MID_DESKTOP_WIDTH]: state => state.window.width >= 992 && state.window.width < 1400,
  [LARGE_DESKTOP_WIDTH]: state => state.window.width >= 1400,
  //! App Messaging
  [GET_NEW_MESSAGE]: state => state.appMsg.title?.length > 0 && state.appMsg.description?.length > 0,
  //! Page Vis
  [PAGE_VISIBILITY_READY]: state => {
    return IsVisApiAvailable(state.websiteVisibility.hidden, state.websiteVisibility.visibilityChange);
  }
};

//! Mutations
export const mutations = {
  //! General App Status
  [LOAD](state, loading) {
    state.loading = loading;
  },
  [SAVE](state, saving) {
    state.saving = saving;
  },
  [ERROR](state, err) {
    state.errMsg = err;
  },
  [APP_MSG](state, msg) {
    state.appMsg = msg;
  },
  //! General Dimensions
  [UPDATE_HEIGHT](state, height) {
    state.window.height = height;
  },
  [UPDATE_WIDTH](state, width) {
    state.window.width = width;
  },
  //! Recaptcha
  [UPDATE_RECAPTCHA_SCORE](state, score) { //* 0.5 is moderate, 0.7 is high likely of human
    state.recaptchaScore = score;
  },
  //! Page Visibility API
  [SET_PAGE_VISIBILITY_API](state, visibility) {
    state.websiteVisibility = visibility;
  },
};

//! Actions
export const actions = {
  [BEGIN_LOAD]({ commit }, loading) {
    commit(LOAD, loading);
  },
  [BEGIN_SAVE]({ commit }, saving) {
    commit(SAVE, saving);
  },
  [ERROR_OCCURRED]({ commit }, err) {
    commit(ERROR, err);
  },
  [NEW_MESSAGE]({commit}, msg) {
    commit(APP_MSG, msg);
  },
  [RESIZE_WINDOW]({commit, state}) {
    if (state.window.height !== window.innerHeight) {
      commit(UPDATE_HEIGHT, window.innerHeight);
    }
    if (state.window.width !== window.innerWidth) {
      commit(UPDATE_WIDTH, window.innerWidth);
    }
  },
  [CHANGE_RECAPTCHA_SCORE]({commit}, score) {
    commit(UPDATE_RECAPTCHA_SCORE, score);
  },
  async [INIT_PAGE_VISIBILITY]({commit}, TabChangeCallback) {
    //* Async makes it thenable allowing components that use it to fire off callbacks if needed once ready
    const visibility = InitPageVisibilityAPI(TabChangeCallback);
    commit(SET_PAGE_VISIBILITY_API, visibility);
  }
};

//! Actual Module
export default {
  namespaced: true,
  state: {
    loading: false,
    saving: false,
    recaptchaScore: 0.0,
    appMsg: {
      title: "",
      description: "",
    },
    errMsg: "",
    window: {
      width: 0,
      height: 0,
    },
    validationErrs: {
      //* Any and ALL validation errs will fill this and be cleared as needed
    }, //todo May add one similar validationTransitions
    websiteVisibility: {
      hidden: "none",
      visibilityChange: "none"
    },
  },
  //? Getters are often useful as universal computed props
  getters: getters,
  mutations: mutations,
  actions: actions
};

//! Common Test Settings
export const MOCK_APP_MODULE = {
  module: {
    [APP_MODULE]: {
      state: {
        loading: false,
        saving: false,
        recaptchaScore: 0.0,
        errMsg: "",
        window: {
          width: 0,
          height: 0,
        },
        validationErrs: {
          //* Any and ALL validation errs will fill this and be cleared as needed
        },
        // validationTransitions: {
        //   //* Fill with object keys and transitions needed
        // }
        websiteVisibility: {
          hidden: "none",
          visibilityChange: "none"
        }
      }
    }
  }
};
//* Window Size
export const MOCK_APP_MODULE_MOBILE = {
  module: {
    [APP_MODULE]: {
      state: {
        window: {
          width: 428,
          height: 926,
        }
      }
    }
  }
};
export const MOCK_APP_MODULE_DESKTOP = {
  module: {
    [APP_MODULE]: {
      state: {
        window: {
          width: 428,
          height: 926,
        }
      }
    }
  }
};
//* RECAPTCHA
export const MOCK_APP_MODULE_PASSED_RECAPTCHA = {
  module: {
    [APP_MODULE]: {
      state: {
        recaptchaScore: 0.8,
      }
    }
  }
};
export const MOCK_APP_MODULE_FAILED_RECAPTCHA = {
  module: {
    [APP_MODULE]: {
      state: {
        recaptchaScore: 0.2,
      }
    }
  }
};
