import { LOAD, SAVE, ERROR, UPDATE_HEIGHT, UPDATE_WIDTH } from '../mutation_types';
import { BEGIN_LOAD, BEGIN_SAVE, ERROR_OCCURRED, RESIZE_WINDOW } from '../action_types';

export default {
  namespaced: true,
  state: {
    loading: false,
    saving: false,
    errMsg: '',
    window: {
      width: 0,
      height: 0,
    }
  },
  getters: {

  },
  mutations: {
    [LOAD](state, loading) {
      state.loading = loading;
    },
    [SAVE](state, saving) {
      state.saving = saving;
    },
    [ERROR](state, err) {
      state.err = err;
    },
    [UPDATE_HEIGHT](state, height) {
      state.window.height = height;
    },
    [UPDATE_WIDTH](state, width) {
      state.window.width = width;
    }
  },
  actions: {
    [BEGIN_LOAD]({ commit }, loading) {
      commit(loading);
    },
    [BEGIN_SAVE]({ commit }, saving) {
      commit(saving);
    },
    [ERROR_OCCURRED]({ commit }, err) {
      commit(err);
    },
    [RESIZE_WINDOW](context) {
      if (context.state.window.height !== window.innerHeight) {
        context.commit(UPDATE_HEIGHT, window.innerHeight);
      }

      if (context.state.window.width !== window.innerWidth) {
        context.commit(UPDATE_WIDTH, window.innerWidth);
      }
    }
  }
}
