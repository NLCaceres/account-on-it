// import { ComponentCustomProperties } from "vue"
import { type Store } from "vuex"

declare module "@vue/runtime-core" {
  //? Declare the App's Vuex modules here via State, GetterTree/getters, ActionTree/dispatch, and MutationTree/commit interfaces/types
  //? BUT I'll just leave this as a good example - "https://gist.github.com/soerenmartius/5f69fc92c29cd8c3989ca57e6ce3ac27"
  //? SINCE Pinia aka Vuex 5 handles typing VERY well (partly by eliminating modules/namespacing)
  interface State {
    app: {
      appMsg: { header: string, description: string }
    }
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}