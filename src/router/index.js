import Vue from 'vue'
import Router from 'vue-router'
import anchorNav from '@/components/anchorNav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'anchorNav',
      component: anchorNav
    }
  ]
})
