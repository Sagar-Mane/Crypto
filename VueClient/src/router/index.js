import Vue from 'vue'
import Router from 'vue-router'
import table from '@/components/table'
import charts from '@/components/charts'
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
    }
  ]
})
