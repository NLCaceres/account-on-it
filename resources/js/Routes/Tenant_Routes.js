const routes = [
    {
        path: "/tenants",
        name: "Tenants",
        component: () =>
            import(
                /* webpackChunkName: "TenantsView" */ "../Views/Tenants/Tenants"
            ),
        meta: { title: "Tenant Info" }
    },
    {
        path: "/tenant/:id",
        name: "TenantDetail",
        component: () =>
            import(
                /* webpackChunkName: "TenantDetailView" */ "../Views/Tenants/DetailTenant"
            ),
        meta: { transitionName: "slide" }
    },
    {
        path: "/tenants/new",
        name: "TenantNew",
        component: () =>
            import(
                /* webpackChunkName: "TenantNewView" */ "../Views/Tenants/NewTenant"
            ),
        meta: { transitionName: "slide" }
    },
    {
        path: "/tenant/:id/edit",
        name: "TenantEdit",
        component: () =>
            import(
                /* webpackChunkName: "TenantNewView" */ "../Views/Tenants/EditTenant"
            ),
        meta: { transitionName: "slide" }
    }
];

export default routes;
