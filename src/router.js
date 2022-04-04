import Vue from "vue";
import Router from "vue-router";
import Home from "./views/TheHome";
import Users from "./views/TheUsers";
import UsersPosts from "./views/UsersPosts";
import UsersProfile from "./views/UsersProfile";

Vue.use(Router)

// Routerの設定をexport
export default new Router({
    mode: 'history',
    // オブジェクトの配列を生成し、オブジェクト内にパスを対応するコンポーネントを設定する
    routes: [
        {
            path: "/",
            component: Home,
        },
        {
            path: "/users/:id",
            component: Users,
            props: true,
            children: [
                {
                    path: 'posts',
                    component: UsersPosts
                },
                {
                    path: 'profile',
                    component: UsersProfile,
                    name: 'users-id-profile'
                }
            ]
        },
    ],
});