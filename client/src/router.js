import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

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
    path: '/users/settings',
    name: 'usersettings',
    component: () => import('../src/views/usersettings.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../src/views/register.vue')
  },
  {
    path: '/myposts',
    name: 'myposts',
    component: () => import('../src/views/UserPosts.vue')
  },
  {
    path: '/stories',
    name: 'stories',
    component: () => import('../src/views/Stories.vue')
  },

  {
    path: '/posts',
    name: 'posts',
    component: () => import('../src/views/Posts.vue')
  },

  {
    path: '/userlist',
    name: 'userlist',
    component: () => import('../src/views/Users.vue')
  },

  {
    path: '/userprofile/:id',
    name: 'userprofile',
    component: () => import('../src/views/UserProfile.vue')
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
