import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../views/login/login.vue')
const Home = () => import('../views/home/home.vue')
const Error = () => import('../views/error/error.vue')


Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        // {
        //   path: '/',
        //   name: 'home',
        //   component: Home,
        // }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '**',
      name: 'error',
      component: Error,
    }
  ]
})

