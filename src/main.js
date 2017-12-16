import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

// 第三方插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import $ from 'jquery'
import _ from 'lodash'

// 自定义文件
import reset from './common/css/reset.css'
import fonts from './common/css/fonts.css'
import api from './common/js/api'

Vue.use(ElementUI)
Vue.use(api)
Vue.use(Vuex)

// store
const store = new Vuex.Store({
  state: {
    loading_show: false,
    header_loading: false,
  },
  mutations: {
    loadingShow: state => {
      return state.loading_show = !state.loading_show
    },
    headerLoadingShow: state => {
      return state.header_loading = !state.header_loading
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
