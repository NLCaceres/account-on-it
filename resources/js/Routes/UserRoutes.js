const routes = [
    {
        path: "/users",
        name: "Users",
        component: () =>
            import(
                /* webpackChunkName: "UsersView" */ "../Views/Users/ListUsers.vue"
            ),
        meta: { title: "User Info" }
    },
    {
        path: "/user/:id",
        name: "UserDetail",
        component: () => import(/* webpackChunkName: "UserDetailView" */ "../Views/Users/DetailUser.vue"),
        meta: { transitionName: "slide" }
    },
    {
        path: "/users/new",
        name: "UserNew",
        component: () =>
            import(
                /* webpackChunkName: "UserNewView" */ "../Views/Users/NewUser.vue"
            ),
        meta: { transitionName: "slide" }
    },
    {
        path: "/user/:id/edit",
        name: "UserEdit",
        component: () =>
            import(
                /* webpackChunkName: "UserNewView" */ "../Views/Users/EditUser.vue"
            ),
        meta: { transitionName: "slide" }
    }
];

export default routes;
