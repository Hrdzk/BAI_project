import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/component1',
    name: 'Component1',
    component: () => import('../views/Component1.vue')
  },
  {
    path: '/component2',
    name: 'Component2',
    component: () => import('../views/Component2.vue')
  },
  {
    path: '/component3',
    name: 'Component3',
    component: () => import('../views/Component3.vue')
  },
  {
    path: '/component4',
    name: 'Component4',
    component: () => import('../views/Component4.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
