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
        autoLogin({ commit, dispatch }) {
            const idToken = localStorage.getItem('idToken');
            const expiryTimeMs = localStorage.getItem('expiryTimeMs');
            const refreshToken = localStorage.getItem('refreshToken');
            const now = new Date();
            const isExpired = now.getTime() >= expiryTimeMs;
            if (!idToken) return;
            // 認証トークンの有効期限が切れていたらリフレッシュする
            // 切れていない場合は、有効期限が切れる時間にリフレッシュ処理を実行してidTokenを更新する
            if (isExpired) {
                dispatch('refreshIdToken', refreshToken);
            } else {
                const expiresInMs = expiryTimeMs - now.getTime();
                setTimeout(() => {
                    dispatch('refreshIdToken', refreshToken);
                }, expiresInMs);
                commit('updateIdToken', idToken);
            }
        },
        login({ dispatch }, authData) {
            axiosAuth.post(
                '/accounts:signInWithPassword?key=' + process.env.VUE_APP_FIREBASE_API_KEY,
                {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true,
                }
            ).then(response => {
                dispatch('setAuthData', {
                    idToken: response.data.idToken,
                    expiresIn: response.data.expiresIn,
                    refreshToken: response.data.refreshToken
                });
                router.push('/');
            });
        },
        register({ dispatch }, authData) {
            axiosAuth.post(
                '/accounts:signUp?key=' + process.env.VUE_APP_FIREBASE_API_KEY,
                {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true,
                }
            ).then(response => {
                dispatch('setAuthData', {
                    idToken: response.data.idToken,
                    expiresIn: response.data.expiresIn,
                    refreshToken: response.data.refreshToken
                });
                router.push('/');
            });
        },
        refreshIdToken({ dispatch }, refreshToken) {
            axiosRefreshToken.post(
                '/token?key=' + process.env.VUE_APP_FIREBASE_API_KEY,
                {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                }
            ).then(response => {
                dispatch('setAuthData', {
                    idToken: response.data.id_token,
                    expiresIn: response.data.expires_in,
                    refreshToken: response.data.refresh_token
                });
            })
        },
        setAuthData({ commit, dispatch }, authData) {
            // 有効期限が切れる時刻を設定
            const expiryTimeMs = new Date().getTime() + authData.expiresIn * 1000;
            commit('updateIdToken', authData.idToken);
            localStorage.setItem('idToken', authData.idToken);
            localStorage.setItem('expiryTimeMs', expiryTimeMs.toString());
            localStorage.setItem('refreshToken', authData.refreshToken);
            setTimeout(() => {
                dispatch('refreshIdToken', authData.refreshToken);
            }, authData.expiresIn * 1000);
        },
    }
});