import { LOGGED_IN_ONLY } from "./MetaTags";

const routes = [
  {
    path: "/properties",
    name: "Properties",
    component: () => import(/* webpackChunkName: "PropertiesView" */ "../Views/Properties/ListProperties.vue"),
    meta: { title: "Property Info" }
  },
  {
    path: "/property/:id",
    name: "PropertyDetail",
    component: () => import(/* webpackChunkName: "PropertyDetailView" */ "../Views/Properties/DetailProperty.vue"),
    meta: { transitionName: "slide" }
  },
  {
    path: "/properties/new",
    name: "PropertyNew",
    component: () => import(/* webpackChunkName: "PropertyNewView" */ "../Views/Properties/NewProperty.vue"),
    meta: { transitionName: "slide" }
  },
  {
    path: "/property/:id/edit",
    name: "PropertyEdit",
    component: () => import(/* webpackChunkName: "PropertyEditView" */ "../Views/Properties/EditProperty.vue"),
    meta: { transitionName: "slide" }
  }
];
routes.map((route) => route.meta.authRequirement = LOGGED_IN_ONLY);
export default routes;