import { LOGGED_IN_ONLY, VERIFIED_ONLY } from "./MetaTags";

const routes = [
    {
        path: "/tenants",
        name: "Tenants",
        component: () => import("@/Views/Tenants/ListTenants.vue"),
        meta: { title: "Tenant Info" }
    },
    {
        path: "/tenant/:id",
        name: "TenantDetail",
        component: () => import("@/Views/Tenants/DetailTenant.vue"),
        meta: { transition: "slide" }
    },
    {
        path: "/tenants/new",
        name: "TenantNew",
        component: () => import("@/Views/Tenants/NewTenant.vue"),
        meta: { transition: "slide" }
    },
    {
        path: "/tenant/:id/edit",
        name: "TenantEdit",
        component: () => import("@/Views/Tenants/EditTenant.vue"),
        meta: { transition: "slide" }
    }
];
routes.map((route) => {
    route.meta.authRequirement = LOGGED_IN_ONLY
    route.meta.verificationRequirement = VERIFIED_ONLY
});
export default routes;
