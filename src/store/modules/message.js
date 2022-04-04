const state = {
    message: ""
}

const getters = {
    message: state => state.message
}

const mutations = {
    updateMessage(state, newMessage) {
        state.message = newMessage
    }
}

const actions = {
    updateMessage({ commit }, newMessage) {
        commit('updateMessage', newMessage)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}