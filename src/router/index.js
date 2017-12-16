import Vue from 'vue'
import Router from 'vue-router'
import main from '../pages/main/main.vue'
import more0 from '../pages/more/more-0.vue'
import more1 from '../pages/more/more-1.vue'
import more2 from '../pages/more/more-2.vue'
import detail from '../pages/detail/detail.vue'
import search from '../pages/search/search.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'main',
      path: '/main',
      component: main,
      meta: {
        keepAlive: true
      }
    },
    {
      name: 'more-0',
      path: '/more-0',
      component: more0,
      meta: {
        keepAlive: true
      }
    },
    {
      name: 'more-1',
      path: '/more-1',
      component: more1,
      meta: {
        keepAlive: true
      }
    },
    {
      name: 'more-2',
      path: '/more-2',
      component: more2,
      meta: {
        keepAlive: true
      }
    },
    {
      name: 'detail',
      path: '/detail',
      component: detail
    },
    {
      name: 'search',
      path: '/search',
      component: search,
      meta: {
        keepAlive: true
      }
    }
  ]
})

router.push({ path: '/main' })

export default router