const routes = [
  {
    path: "/properties",
    name: "Properties",
    component: () =>
      import(
              /* webpackChunkName: "PropertiesView" */ "../Views/Properties/Properties"
      ),
    meta: { title: "Property Info" }
  },
  {
    path: "/property/:id",
    name: "PropertyDetail",
    component: () =>
      import(
              /* webpackChunkName: "PropertyDetailView" */ "../Views/Properties/DetailProperty"
      ),
    meta: { transitionName: "slide" }
  },
  {
    path: "/properties/new",
    name: "PropertyNew",
    component: () =>
      import(
              /* webpackChunkName: "PropertyNewView" */ "../Views/Properties/NewProperty"
      ),
    meta: { transitionName: "slide" }
  },
  {
    path: "/property/:id/edit",
    name: "PropertyEdit",
    component: () =>
      import(
              /* webpackChunkName: "PropertyEditView" */ "../Views/Properties/EditProperty"
      ),
    meta: { transitionName: "slide" }
  }
];
export default routes;