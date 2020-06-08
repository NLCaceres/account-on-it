<template>
  <!--//? When classes placed on this component (<detail-link/>), it will be applied to root element in template -->
  <!--//? In this case, router-link receives class stylings -->
  <router-link :to="ToRoute">
    <!--//* Name of Link -->
    <slot></slot>
  </router-link>
</template>
<script>
//? Thanks to the props here, this vue template may be best used for providing clarity
//? Rather than fully taking place of the simple router-link VueRouter provides
export default {
  props: {
    pathName: {
      type: String,
      default: null
    },
    query: {
      //* Should be formatted { foo: bar } translating to ?foo=bar
      type: Object,
      default: null
    },
    routeName: {
      type: String,
      default: null
    },
    routeType: {
      type: String,
      default: null
    },
    entityName: {
      type: String,
      default: null
    },
    params: {
      //* Should be formatted { id: modelID }
      type: Object,
      default: null
    }
  },
  computed: {
    ToRoute() {
      //? The following are all the different options the router-link 'to' prop accepts

      const PathRoute = this.PathRoute(); //* Checks for VueRouter's path obj related props ({ path: foo, query: { bar: foh }})
      if (PathRoute) return PathRoute;

      const NamedRoute = this.NamedRoute(); //* Checks for VueRouter's named route obj related props ({ name: foo, params: { bar: foh }})
      if (NamedRoute) return NamedRoute;
    }
  },
  methods: {
    PathRoute() {
      const pathRoute = {};
      //* Simple strings work just like anchor tag href, 'home' = /home
      //* but here we'll use the { path: pathName } version for flexibility
      if (this.pathName) {
        if (this.query) {
          //* Ideally get: { path: pathName, query: this.query }
          //* this.query being: { foo: bar }
          pathRoute.query = this.query;
        }
        pathRoute.path = this.pathName;
        return pathRoute;
      }
    },
    NamedRoute() {
      const namedRoute = {};

      //* Basic Named Route uses this.routeName
      //* Dynamic Named Route, e.g. `${entityName}${routeType}` - LandlordDetail
      if (this.routeName || (this.routeType && this.entityName)) {
        if (this.params) {
          //* Ideally get: {name: ${entityName}${routeType}, params: this.params }
          //* this.params being: { id: modelID }
          namedRoute.params = this.params;
        }

        namedRoute.name = this.routeName
          ? this.routeName
          : `${this.entityName}${this.routeType}`;
        return namedRoute;
      }
    }
  }
};
</script>