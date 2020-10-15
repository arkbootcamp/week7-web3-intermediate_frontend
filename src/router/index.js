import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Axios from '../views/Axios.vue'
import Lifecycle from '../views/Lifecycle.vue'
import Login from '../views/auth/Login.vue'
import Product from '../views/main/Product.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/axios',
    name: 'Axios',
    component: Axios,
    meta: { requiresAuth: true }
  },
  {
    path: '/lifecycle',
    name: 'Lifecycle',
    component: Lifecycle,
    meta: { requiresAuth: true }
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: '/axios'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
