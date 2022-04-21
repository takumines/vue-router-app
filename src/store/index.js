import Vue from 'vue';
import Vuex from 'vuex';
import count from "@/store/modules/count";
import message from "@/store/modules/message";
import axios from "@/axios-auth";

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
        login({ commit }, authData) {
            axios.post(
                '/accounts:signInWithPassword?key=' + process.env.VUE_APP_FIREBASE_API_KEY,
                {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true,
                }
            ).then(response => {
                commit('updateIdToken', response.data.idToken);
                console.log(response);
            });
        },
        register({ commit }, authData) {
            axios.post(
                '/accounts:signUp?key=' + process.env.VUE_APP_FIREBASE_API_KEY,
                {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true,
                }
            ).then(response => {
                commit('updateIdToken', response.data.idToken);
                console.log(response);
            });
        }
    }
});