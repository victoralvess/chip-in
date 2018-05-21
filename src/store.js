import Vue from 'vue'
import Vuex from 'vuex'
import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'

import Pusher from 'pusher-js'

Vue.use(Vuex)

const PUSHER_APP_KEY = '588c3e31412e021da7a4'
const WS_HOST = 'ws.pusherapp.com'
const HTTP_HOST = 'sockjs.pusher.com'
const ENCRYPTED = true
const CLUSTER = 'mt1'

const CHANNEL_NAME = 'chip-in'
const PRIVATE_CHANNEL_NAME = 'private-' + CHANNEL_NAME
const EVENTS = {
  COLLABORATION_EVENT: 'collaboration',
  ACHIEVE_EVENT:'achieve',
  CREATED_EVENT: 'created',
  WALLET_UPDATED_EVENT: 'wallet-updated',
}

const pusher = new Pusher(PUSHER_APP_KEY, {
  wsHost: WS_HOST,
  httpHost: HTTP_HOST,
  encrypted: ENCRYPTED,
  cluster: CLUSTER
})

const channel = pusher.subscribe(CHANNEL_NAME)

export default new Vuex.Store({
  state: {
    user: null,
    jwt: null,
    createGoal: {
      form: {}
    }
  },
  mutations: {
    user (state, user) {
      state.user = user
    },
    jwt (state, jwt) {
      state.jwt = jwt
    },
    saveCreateGoalForm (state, form) {
      state.createGoal.form = form
    },
    cleanCreateGoalForm (state) {
      state.createGoal.form = {}
    }
  },
  actions: {
    user ({ commit }, user) {
      commit('user', user)
    },
    jwt ({ commit }, jwt) {
      commit('jwt', jwt)
    },
    saveCreateGoalForm ({ commit }, form) {
      commit('saveCreateGoalForm', form)
    },
    cleanCreateGoalForm ({ commit }) {
      commit('cleanCreateGoalForm')
    }
  },
  getters: {
    user: state => state.user,
    jwt: state => state.jwt,
    createGoalForm: state => state.createGoal.form,
    pusher: _ => pusher,
    channel: _ => channel,
    events: _ => EVENTS
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 1/24 }),
      removeItem: key => Cookies.remove(key)
    }
  })]
})
