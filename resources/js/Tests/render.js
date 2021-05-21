// import { render } from '@testing-library/vue'
// import { FullRoutes } from "../Routes"; //? Webpack/Mochapack doesn't like none TS files at the moment (unless there's no script)
import { DefaultStore } from '../Store';
import merge from "lodash/merge";

export default function RenderWithSetup(Component, propVals = {}, stubs = {}, slots = {}, storeOverridenVals = {}, routesList = null) {
  //* Override modules as necessary
  // return render(Component, { store: merge(DefaultStore(), storeOverridenVals), props: { ...propVals }, ...slots, ...stubs, routes: routesList}
  //   //? optional callback useful for init'ing certain 
  //   /* (vue, store, router) => { //? store and router only become available once they are set above
  //     vue.use(VueI18n);
  //     vue.use(VeeValidate);
  //     const i18n = new VueI18n({ locale: 'en', messages: { en: messages }, silentTranslationWarn: true })
  //     return { i18n, router };
  //   } */
  // );
}

export function RenderWithProps(Component, propVals = {}) {
  // return render(Component, { store: { ...DefaultStore() }, props: { ...propVals }});
}

export function RenderWithSlots(Component, slots = {}) {
  // return render(Component, { store: { ...DefaultStore() }, ...slots });
}

export function RenderWithRoutes(Component, routesList) {
  // return render(Component, { store: { ...DefaultStore() }, routesList });
}