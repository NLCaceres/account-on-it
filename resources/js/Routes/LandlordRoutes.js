import { ADMIN_ONLY, LOGGED_IN_ONLY, VERIFIED_ONLY } from "./MetaTags";

const routes = [
    {
        path: "/landlords",
        name: "Landlords",
        component: () => import("@/Views/Landlords/ListLandlords.vue"),
        meta: { title: "Landlord Info", authRequirement: ADMIN_ONLY }
    },
    {
        path: "/landlord/:id",
        name: "LandlordDetail",
        component: () => import("@/Views/Landlords/DetailLandlord.vue"),
        meta: { transition: "slide", authRequirement: LOGGED_IN_ONLY }
    },
    {
        path: "/landlords/new",
        name: "LandlordNew",
        component: () => import("@/Views/Landlords/NewLandlord.vue"),
        meta: { transition: "slide", authRequirement: ADMIN_ONLY }
    },
    {
        path: "/landlord/:id/edit",
        name: "LandlordEdit",
        component: () => import("@/Views/Landlords/EditLandlord.vue"),
        meta: { transition: "slide", authRequirement: LOGGED_IN_ONLY }
    }
];

routes.map((route) => {
    route.meta.verificationRequirement = VERIFIED_ONLY;
});
export default routes;
