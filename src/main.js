import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import http from './http'
import moment from 'dayjs'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'lib-flexible'
import axios from 'axios'
import lodash from 'lodash'
import BScroll from 'better-scroll'



axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencodedcharset=UTF-8'
axios.interceptors.response.use(
    response => {
      return response.data
    }, error => {
      return Promise.reject(error)
    })

Vue.use(Vant)


Vue.prototype.$BScroll = BScroll
Vue.prototype.$lodash = lodash
Vue.prototype.$com = http
Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
