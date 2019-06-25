import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/singer',
      name: 'singer',
      component: () => import('../pages/singer/Singer')
    },
    {
      path: '/rank',
      name: 'rank',
      component: () => import('../pages/rank/Rank')
    },
    {
      path: '/radio',
      name: 'radio',
      component: () => import('../pages/radio/Radio')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../pages/category/Category')
    },
    {
      path: '/listen',
      name: 'listen',
      component: () => import('../pages/listen/Listen')
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: () => import('../pages/searchList/SearchList')
    }
  ]
})
