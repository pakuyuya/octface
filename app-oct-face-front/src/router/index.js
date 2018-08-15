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
      path: '/:user/',
      name: 'User',
      component: User
    },
    {
      path: '/:user/repositories',
      name: 'Repositories',
      component: Repositories
    },
    {
      path: '/:user/:repos/source',
      name: 'SourceTree',
      component: SourceTree
    },
    {
      path: '/:user/:repos/releases',
      name: 'Releases',
      component: Releases
    }
  ]
})
