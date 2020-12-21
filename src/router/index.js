import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Contacts',
      component: () => import('../views/Contacts.vue')
    },
    {
      path: '/about/:id',
      name: 'About',
      component: () => import('../views/About.vue')
    }
  ]
})
