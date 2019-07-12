import Vue from 'vue'
import 'normalize.css/normalize.css' // Normalize.css使浏览器更加一致地呈现所有元素，并符合现代标准。它只针对需要规范化的样式。
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons'
import './permission' //登录权限
import * as filters from '@/filters' // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(ElementUI, {
  locale,
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})