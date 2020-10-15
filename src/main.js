import Vue from 'vue'
import App from './App.vue'
import router from './router'
// ========================================
import store from './store'
// ========================================
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.directive('focus', {
  // Saat elemen yang terikat dimasukan ke dalam DOM...
  inserted: function (el) {
    // Fokus terhadap elemen
    el.focus()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
