import Vue from 'vue'
import Vuex from 'vuex'
import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'

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
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 1/24 }),
      removeItem: key => Cookies.remove(key)
    }
  })]
})
