import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import UserForm from '../views/UserForm'
// import Champions from '../views/Champions'
import AuthGuard from './auth-guard.js'
// import BrainStorm from '../components/BrainStorm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/champions',
      name: 'champions',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Champions.vue')
    },
    {
      path: '/form',
      component: UserForm,
      beforeEnter: AuthGuard
    },
    {
      path: '/five',
      component: () => import('../components/BrainStorm.vue')
    },
    {
      path: '/profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/testitems',
      component: () => import('../components/SeeItems')
    }
  ]
})
