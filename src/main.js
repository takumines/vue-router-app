import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store';
import axios from 'axios';

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_FIREBASE_URL;
axios.interceptors.request.use(
    config => {
      return config
    },
    error => {
      return Promise.reject(error)
    }
)
axios.interceptors.response.use(
   response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)
store.dispatch('autoLogin').then(() => {
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app');
});
