import { LOGGED_IN_ONLY, NO_AUTH_NEEDED, NO_VERIFICATION_NEEDED, VERIFIED_ONLY } from "./MetaTags";

const routes = [
  {
    path: "/properties",
    name: "Properties",
    component: () => import("@/Views/Properties/ListProperties.vue"),
    meta: { title: "Property Info", authRequirement: NO_AUTH_NEEDED, verificationRequirement: NO_VERIFICATION_NEEDED }
  },
  {
    path: "/property/:id",
    name: "PropertyDetail",
    component: () => import("@/Views/Properties/DetailProperty.vue"),
    meta: { transition: "slide", authRequirement: NO_AUTH_NEEDED, verificationRequirement: NO_VERIFICATION_NEEDED }
  },
  {
    path: "/properties/new",
    name: "PropertyNew",
    component: () => import("@/Views/Properties/NewProperty.vue"),
    meta: { transition: "slide", authRequirement: LOGGED_IN_ONLY, verificationRequirement: VERIFIED_ONLY }
  },
  {
    path: "/property/:id/edit",
    name: "PropertyEdit",
    component: () => import("@/Views/Properties/EditProperty.vue"),
    meta: { transition: "slide", authRequirement: LOGGED_IN_ONLY, verificationRequirement: VERIFIED_ONLY }
  }
];

export default routes;