import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/content/Home'
import Search from '@/components/content/Search'
import Releases from '@/components/content/Releases'
import Repositories from '@/components/content/Repositories'
import SourceTree from '@/components/content/SourceTree'
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
      path: '/repos/:owner/',
      name: 'Repositories',
      component: Repositories
    },
    {
      path: '/tree/:owner/:repos',
      name: 'SourceTree',
      component: SourceTree
    },
    {
      path: '/releases/:owner/:repos',
      name: 'Releases',
      component: Releases
    }
  ]
})
