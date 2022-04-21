import Vue from "vue";
import Router from "vue-router";
import Comments from "./views/TheComments";
import Login from "./views/TheLogin";
import Register from "./views/TheRegister";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            component: Comments,
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register
        }
    ],
});
