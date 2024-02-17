import "@testing-library/jest-dom/vitest";
// global.axios = require('axios'); //TODO: Likely not needed, especially if using fetch over axios

//? In order to allow jQuery to be defined in tests like it would be under normal circumstances for Vue components
import $ from "jquery" //? Grab the default import
Object.defineProperty(window, "$", { value: $ }); //? Add the property to the window instance (or global instance)
Object.defineProperty(window, "jQuery", { value: $ }); //? And make sure jQuery prop is available too!
//? It doesn't fill in the blanks for Typescript BUT it does mock out jQuery under the hood which is all that really matters
//? If a jQuery Spy is needed, it's still possible, check out `Vue-Router/GlobalAfterGuards.spec.ts` for an example

require("fomantic-ui-css/semantic.js"); //? Weirdly doesn't work as an "import", only as an old-school require

//? JSDom does not support Browser's IntersectionObserver so we can shim it ourselves!
global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  disconnect: () => void = () => null;
  observe: (target: Element) => void = () => null;
  takeRecords: () => IntersectionObserverEntry[] = () => [];
  unobserve: (target: Element) => void = () => null;
}
