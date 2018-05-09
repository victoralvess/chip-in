import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import SignIn from './views/SignIn.vue'
import Dashboard from './views/Dashboard.vue'
import CreateGoal from './views/CreateGoal.vue'

import { isLoggedIn } from './utils'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignIn
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: isLoggedIn
    },
    {
      path: '/dashboard/goals/create',
      name: 'create',
      component: CreateGoal,
      beforeEnter: isLoggedIn
    }     
  ]
})
