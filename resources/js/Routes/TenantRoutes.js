import { LOGGED_IN_ONLY } from "./MetaTags";

const routes = [
    {
        path: "/tenants",
        name: "Tenants",
        component: () => import(/* webpackChunkName: "TenantsView" */ "../Views/Tenants/ListTenants.vue"),
        meta: { title: "Tenant Info" }
    },
    {
        path: "/tenant/:id",
        name: "TenantDetail",
        component: () => import(/* webpackChunkName: "TenantDetailView" */ "../Views/Tenants/DetailTenant.vue"),
        meta: { transitionName: "slide" }
    },
    {
        path: "/tenants/new",
        name: "TenantNew",
        component: () => import(/* webpackChunkName: "TenantNewView" */ "../Views/Tenants/NewTenant.vue"),
        meta: { transitionName: "slide" }
    },
    {
        path: "/tenant/:id/edit",
        name: "TenantEdit",
        component: () => import(/* webpackChunkName: "TenantNewView" */ "../Views/Tenants/EditTenant.vue"),
        meta: { transitionName: "slide" }
    }
];
routes.map((route) => route.meta.authRequirement = LOGGED_IN_ONLY);
export default routes;
