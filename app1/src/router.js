import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('./views/auth/Register.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('./views/auth/Login.vue')
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue')
    }
  ]
})

export default router
