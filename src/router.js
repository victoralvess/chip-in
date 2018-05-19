import Vue from 'vue'
import Router from 'vue-router'
import { isLoggedIn } from './utils'

const Home = () => import('./views/Home.vue')
const SignIn = () => import('./views/SignIn.vue')
const SignUp = () => import('./views/SignUp.vue')
const Dashboard = () => import('./views/Dashboard/Dashboard.vue')
const DashboardHome = () => import('./views/Dashboard/Home.vue')
const CreateGoal = () => import('./views/Dashboard/Goal/Create.vue')
const Goal = () => import('./views/Dashboard/Goal/Goal.vue')
const ErrorPage = () => import('./views/ErrorPage/ErrorPage.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter: isLoggedIn,
      children: [
        {
          path: '',
          name: 'dashboard',
          components: {
            dashboard: DashboardHome
          }
        },
        {
          path: 'goals/create',
          name: 'create',
          components: {
            dashboard: CreateGoal
          }
        },
        {
          path: 'goals/:id',
          name: 'goal',
          components: {
            dashboard: Goal
          }
        }
      ]
    },
    {
      path: '/error/:code/:message',
      name: 'error',
      component: ErrorPage
    },
    {
      path: '**',
      component: ErrorPage
    }
  ]
})
