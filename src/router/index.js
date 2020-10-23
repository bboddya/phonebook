import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('../views/Main.vue')
    },
    {
      path: '/about/:id',
      name: 'About',
      component: () => import('../views/About.vue')
    }
  ]
})
