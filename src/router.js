import Vue from 'vue'
import Router from 'vue-router'
import { isLoggedIn } from './utils'

const Home = () => import('./views/Home.vue')
const About = () => import('./views/About.vue')
const SignIn = () => import('./views/SignIn.vue')
const Dashboard = () => import('./views/Dashboard.vue')
const DashboardHome = () => import('./views/DashboardHome.vue')
const CreateGoal = () => import('./views/CreateGoal.vue')
const Goal = () => import('./views/Goal.vue')

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
      beforeEnter: isLoggedIn,
      children: [
        {
          path: '',
          components: {
            dashboard: DashboardHome
          }
        },
        {
          path: 'goals/create',
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
    }
  ]
})
