import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/content/Home'
import Search from '@/components/content/Search'
import Releases from '@/components/content/Releases'
import Repositories from '@/components/content/Repositories'
import Contents from '@/components/content/Contents'
import User from '@/components/content/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search/:page',
      name: 'Search',
      component: Search
    },
    {
      path: '/user/:owner',
      name: 'User',
      component: User
    },
    {
      path: '/repos/:owner',
      name: 'Repositories',
      component: Repositories
    },
    {
      path: '/repos/:owner/:repos/contents/:path(.*)',
      name: 'Contents',
      component: Contents
    },
    {
      path: '/repos/:owner/:repos/releases',
      name: 'Releases',
      component: Releases
    }
  ]
})
