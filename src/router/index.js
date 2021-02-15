import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import SinglePost from '../views/SinglePost.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/post/:id',
    name: 'singlePost',
    component: SinglePost
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
