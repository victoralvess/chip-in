import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    jwt: null
  },
  mutations: {
    user (state, user) {
      state.user = user
    },
    jwt (state, jwt) {
      state.jwt = jwt
    }
  },
  actions: {
    user ({ commit }, user) {
      commit('user', user)
    },
    jwt ({ commit }, jwt) {
      commit('jwt', jwt)
    }
  },
  getters: {
    user: state => state.user,
    jwt: state => state.jwt
  }
})
