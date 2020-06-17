import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import HomePage from "../Views/HomePage.vue";

import LandlordRoutes from "./LandlordRoutes";
import TenantRoutes from "./TenantRoutes";
import PropertyRoutes from "./PropertyRoutes";
import UserRoutes from "./UserRoutes";

Vue.use(VueRouter);

const StandardRoutes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: HomePage
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(
            /* webpackChunkName: "LoginComponent" */ "../Components/SemanticUI/Login/SuiLoginView.vue"
      )
  },
  {
    path: "/not-found",
    name: "404",
    component: () =>
      import(
            /* webpackChunkName: "404Component" */ "../Components/SemanticUI/GenericViews/NotFound.vue"
      ) /* helperComponents('./Components/GenericViews/NotFound.vue').default */
  },
  { path: "*", redirect: "/not-found" }
]

const Router = new VueRouter({
  mode: "history",
  routes: StandardRoutes.concat(LandlordRoutes, TenantRoutes, PropertyRoutes, UserRoutes)
});

export default Router;