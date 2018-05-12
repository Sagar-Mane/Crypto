import Vue from 'vue'
import Router from 'vue-router'
import table from '@/components/table'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'table',
      component: table
    }
  ]
})
