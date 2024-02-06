import { ADMIN_ONLY, LOGGED_IN_ONLY, VERIFIED_ONLY } from './MetaTags';

const routes = [
    {
        path: "/users",
        name: "Users",
        component: () => import("@/Views/Users/ListUsers.vue"),
        meta: { title: "User Info" }
    },
    {
        path: "/user/:id",
        name: "UserDetail",
        component: () => import("@/Views/Users/DetailUser.vue"),
        meta: { transition: "slide" }
    },
    {
        path: "/users/new",
        name: "UserNew",
        component: () => import("@/Views/Users/NewUser.vue"),
        meta: { transition: "slide" }
    },
    {
        path: "/user/:id/edit",
        name: "UserEdit",
        component: () => import("@/Views/Users/EditUser.vue"),
        meta: { transition: "slide" }
    }
];

routes.map((route) => {
    route.meta.authRequirement = ADMIN_ONLY;
    route.meta.verificationRequirement = VERIFIED_ONLY; 
});

export default routes;
