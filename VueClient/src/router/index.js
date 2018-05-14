import Vue from 'vue'
import Router from 'vue-router'
import table from '@/components/table'
import charts from '@/components/charts'
import navbar from '@/components/navbar'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'table',
      component: table
    },
    {
      path: '/analytics',
      name: 'charts',
      component: charts
    },
    {
      path: '/navbar',
      name: 'navbar',
      component: navbar
    }
  ]
})
