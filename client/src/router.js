import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserProfileSettings from './components/auth/UserProfileSettings.vue'

Vue.use(Router)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../src/views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../src/views/register.vue')
  },
  {
    path: '/settings/profile',
    name: 'profile',
    component: UserProfileSettings
}
]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
