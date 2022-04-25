import Vue from 'vue';
import Vuex from 'vuex';
import count from "@/store/modules/count";
import message from "@/store/modules/message";
import {axiosAuth, axiosRefreshToken} from "@/axios-auth";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        count,
        message
    },
    state: {
        idToken: null,
    },
    getters: {
        idToken: state => state.idToken,
    },
    mutations: {
        updateIdToken(state, idToken) {
            state.idToken = idToken;
        }
    },
    actions: {
        login({ commit, dispatch }, authData) {
            axiosAuth.post(
                '/accounts:signInWithPassword?key=' + process.env.VUE_APP_FIREBASE_API_KEY,
                {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true,
                }
            ).then(response => {
                commit('updateIdToken', response.data.idToken);
                setTimeout(() => {
                    dispatch('refreshIdToken', response.data.refreshToken);
                }, response.data.expiresIn * 1000);
                router.push('/');
            });
        },
        register({ commit }, authData) {
            axiosAuth.post(
                '/accounts:signUp?key=' + process.env.VUE_APP_FIREBASE_API_KEY,
                {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true,
                }
            ).then(response => {
                commit('updateIdToken', response.data.idToken);
                router.push('/');
            });
        },
        refreshIdToken({ commit, dispatch }, refreshToken) {
            axiosRefreshToken.post(
                '/token?key=' + process.env.VUE_APP_FIREBASE_API_KEY,
                {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                }
            ).then(response => {
                commit('updateIdToken', response.data.id_token);
                setTimeout(() => {
                    dispatch('refreshIdToken', response.data.refresh_token);
                }, response.data.expires_in * 1000)
            })
        }
    }
});