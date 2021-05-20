import { LOGGED_IN_ONLY, VERIFIED_ONLY } from "./MetaTags";

const routes = [
    {
        path: "/landlords",
        name: "Landlords",
        component: () => import(/* webpackChunkName: "LandlordsListView" */ "../Views/Landlords/ListLandlords.vue"),
        meta: { title: "Landlord Info" }
    },
    {
        path: "/landlord/:id",
        name: "LandlordDetail",
        component: () => import(/* webpackChunkName: "LandlordDetailView" */ "../Views/Landlords/DetailLandlord.vue"),
        meta: { transitionName: "slide" }
    },
    {
        path: "/landlords/new",
        name: "LandlordNew",
        component: () => import(/* webpackChunkName: "LandlordNewView" */ "../Views/Landlords/NewLandlord.vue"),
        meta: { transitionName: "slide" }
    },
    {
        path: "/landlord/:id/edit",
        name: "LandlordEdit",
        component: () => import(/* webpackChunkName: "LandlordEditView" */ "../Views/Landlords/EditLandlord.vue"),
        meta: { transitionName: "slide" }
    }
];

routes.map((route) => {
    route.meta.authRequirement = LOGGED_IN_ONLY;
    route.meta.verificationRequirement = VERIFIED_ONLY; 
});
export default routes;
