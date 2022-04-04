import Vue from 'vue';
import Vuex from 'vuex';
import count from "@/store/modules/count";
import message from "@/store/modules/message";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        count,
        message
    }
});