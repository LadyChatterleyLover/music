import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        showFooter: true
      },
      component: Home
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/singer',
      name: 'singer',
      meta: {
        showFooter: true
      },
      component: () => import('../pages/singer/Singer')
    },
    {
      path: '/singerDetail',
      name: 'singerDetail',
      meta: {
        showFooter: false
      },
      component: () => import('../pages/singer/SingerDetail')
    },
    {
      path: '/edit',
      name: 'edit',
      meta: {
        showFooter: false
      },
      component: () => import('../pages/me/Edit')
    },
    {
      path: '/player',
      name: 'player',
      meta: {
        showFooter: false
      },
      component: () => import('../pages/player/Player')
    },
    {
      path: '/playerFooter',
      name: 'playerFooter',
      meta: {
        showFooter: false
      },
      component: () => import('../pages/playerFooter/PlayerFooter')
    },
    {
      path: '/rank',
      name: 'rank',
      meta: {
        showFooter: false
      },
      component: () => import('../pages/rank/Rank')
    },
    {
      path: '/radio',
      name: 'radio',
      meta: {
        showFooter: false
      },
      component: () => import('../pages/radio/Radio')
    },
    {
      path: '/category',
      name: 'category',
      meta: {
        showFooter: false
      },
      component: () => import('../pages/category/Category')
    },
    {
      path: '/listen',
      name: 'listen',
      meta: {
        showFooter: false
      },
      component: () => import('../pages/listen/Listen')
    },
    {
      path: '/searchList',
      name: 'searchList',
      meta: {
        showFooter: false
      },
      component: () => import('../pages/searchList/SearchList')
    },
    {
      path: '/me',
      name: 'me',
      meta: {
        showFooter: true
      },
      component: () => import('../pages/me/Me')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        showFooter: false
      },
      component: () => import('../pages/login/Login')
    },
    {
      path: '/playList',
      name: 'playList',
      meta: {
        showFooter: false
      },
      component: () => import('../pages/playList/PlayList')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        showFooter: false
      },
      component: () => import('../pages/register/Register')
    },
  ]
})
