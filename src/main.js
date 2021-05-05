import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
let API_HOST = "https://testapi.yovogames.com/";

new Vue({
  provide: () => ({
    API_HOST: API_HOST,
  }),
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
