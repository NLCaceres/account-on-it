import { INIT_INTERSECTION_OBSERVER } from "../ActionTypes";
import { GET_INTERSECTION_OBSERVER } from "../GetterTypes";
import { SET_INTERSECTION_OBSERVER_API } from "../MutationTypes";

import InitIntersectionObserver, { FinishIntersectionObservation } from "../../Utility/Functions/intersection_observer";

export const INTERSECTION_MODULE = "intersectionAPI";

//! ID constants 
//* Similar usage to enums, helps keep track of purposes
export const LAZY_LOAD_OBSERVER = "LazyLoadObserver";

export default {
  namespaced: true,
  state: {
    observers: {
      //* Relatively dynamic - using above constants to pull observers as they are set up
    }
  },
  getters: { //? Getters can return functions that in turn return state values
    //? especially useful when params needed or some heavy computation offloaded
    [GET_INTERSECTION_OBSERVER]: state => (id) => state.observers[id] ?? null, //? Worth noting null coalesce only works with null or undefined!
  },
  mutations: {
    [SET_INTERSECTION_OBSERVER_API](state, { intersectionObserver, id }) {
      state.observers[id] = intersectionObserver;
    }
  },
  actions: {
    //? Multiple params for a vuex action dispatch must be used in an object
    async [INIT_INTERSECTION_OBSERVER]({ state, commit }, { intersectionCallback, intersectOptions, id }) {
      let observer;
      //* ID param helps keep observers in order. Ideally a single observer that handles all similar components is feasible
      //* Whenever a different ID is used a new observer is being designated to handle all components of that type
      if (!state.observers[id]) {
        observer = InitIntersectionObserver(intersectionCallback, intersectOptions);
        commit(SET_INTERSECTION_OBSERVER_API, { intersectionObserver: observer, id: id }); //* Avoid undefined if not in 'if block'
      }
      return observer || state.observers[id];
    }
  }
}