const routes = [
    {
        path: "/landlords",
        name: "Landlords",
        component: () =>
            import(
                /* webpackChunkName: "LandlordsListView" */ "../Views/Landlords/ListLandlords"
            ),
        meta: { title: "Landlord Info" }
    },
    {
        path: "/landlord/:id",
        name: "LandlordDetail",
        component: () =>
            import(
                /* webpackChunkName: "LandlordDetailView" */ "../Views/Landlords/DetailLandlord"
            ),
        meta: { transitionName: "slide" }
    },
    {
        path: "/landlords/new",
        name: "LandlordNew",
        component: () =>
            import(
                /* webpackChunkName: "LandlordNewView" */ "../Views/Landlords/NewLandlord"
            ),
        meta: { transitionName: "slide" }
    },
    {
        path: "/landlord/:id/edit",
        name: "LandlordEdit",
        component: () =>
            import(
                /* webpackChunkName: "LandlordEditView" */ "../Views/Landlords/EditLandlord"
            ),
        meta: { transitionName: "slide" }
    }
];
export default routes;
