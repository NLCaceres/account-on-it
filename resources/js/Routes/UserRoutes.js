import Store from '../Store';
import { ADMIN_ONLY, LOGGED_IN_ONLY, VERIFIED_ONLY } from './MetaTags';

const routes = [
    {
        path: "/users",
        name: "Users",
        //? Vue Router Nav Guards WON'T run unless placed before the route component declaration
        component: () => import(/* webpackChunkName: "UsersView" */ "../Views/Users/ListUsers.vue"),
        meta: { title: "User Info", authRequirement: ADMIN_ONLY }
    },
    {
        path: "/user/:id",
        name: "UserDetail",
        component: () => import(/* webpackChunkName: "UserDetailView" */ "../Views/Users/DetailUser.vue"),
        meta: { transitionName: "slide", authRequirement: ADMIN_ONLY }
    },
    {
        path: "/users/new",
        name: "UserNew",
        component: () => import(/* webpackChunkName: "UserNewView" */ "../Views/Users/NewUser.vue"),
        meta: { transitionName: "slide", authRequirement: ADMIN_ONLY }
    },
    {
        path: "/user/:id/edit",
        name: "UserEdit",
        component: () => import(/* webpackChunkName: "UserNewView" */ "../Views/Users/EditUser.vue"),
        meta: { transitionName: "slide", authRequirement: ADMIN_ONLY }
    }
];

routes.map((route) => {
    route.meta.authRequirement = LOGGED_IN_ONLY;
    route.meta.verificationRequirement = VERIFIED_ONLY; 
});

export default routes;
