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

const sessionModule = {
  state: {
    user: null,
    jwt: ''
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
    },
  },
  getters: {
    user: state => state.user,
    jwt: state => state.jwt,
  }
}

const pusherModule =  {
  getters: {
    pusher: _ => pusher,
    channel: _ => channel,
    events: _ => EVENTS
  }
}

const createGoalModuleForm = {
  title: '',
  description: '',
  goal: 0,
  due: new Date().toISOString().substr(0, 10)
}

const createGoalModule = {
  namespaced: true,
  state: {
    form: createGoalModuleForm,
  },
  mutations: {
    saveForm (state, form) {
      state.form = {
        ...state.form,
        ...form
      }
    },
    resetForm (state) {
      state.form = {
        ...createGoalModuleForm
      }
    }
  },
  getters: {
    form: state => state.form
  }
}

export default new Vuex.Store({
  modules: {
    session: sessionModule,
    createGoal: createGoalModule,
    pusher: pusherModule,
    goals: {
      state: {
        goals: null,
      },
      mutations: {
        setGoals (state, goals) {
          state.goals = goals
        }
      },
      getters: {
        goals: state => state.goals,
        myGoals: ({ goals }, getters) => {
          try {
            const { id } = getters.user
            return goals.filter(goal => goal.uid === id)
          } catch (e) {
            return []
          }
        },
        closedGoals: ({ goals }) => {
          try {
            return goals.filter(goal => !goal.is_open || goal.expired)
          } catch (e) {
            return []
          }
        },
        activeGoals: ({ goals }) => {
          try {
            return goals.filter(goal => goal.is_open && !goal.expired)
          } catch (e) {
            return []
          }
        }
      }
    }
  },
  plugins: [createPersistedState({
    paths: ['session', 'createGoal', 'pusher'],
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 1/24 }),
      removeItem: key => Cookies.remove(key)
    }
  })]
})
