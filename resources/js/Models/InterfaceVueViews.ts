import { SetDataFunc } from "./InterfaceLaravelResponse";

//? Typescript + Vue works pretty great with Class Components 
//? BUT Vue 3 decided NOT to go that direction so Vue.extend is the preferred component creation route
//? (Besides the Vue Composition API)
//* The following class deals with the drawbacks of using Vue.extend
//? Vue.extend returns an ExtendedVue class which typescript does not recognize as a class that extends Vue
//* In VueRouter's hooks, beforeRouteEnter etc., the vm param in it's next func gets assigned a basic Vue type
//* Since it's not an easy cast due to ExtendedVue issue, an interface that describes the components that use the hooks 
export interface PreloadVue extends Vue {
  SetData: SetDataFunc
}

export interface PaginatedVue extends Vue {
  currentPage: number,
  pages: number,
}
