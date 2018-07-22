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
      path: '/user/:user',
      name: 'User',
      component: User
    },
    {
      path: '/repos/:user/',
      name: 'Repositories',
      component: Repositories
    },
    {
      path: '/tree/:user/:repos',
      name: 'SourceTree',
      component: SourceTree
    },
    {
      path: '/releases/:user/:repos',
      name: 'Releases',
      component: Releases
    }
  ]
})
