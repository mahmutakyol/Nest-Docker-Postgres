import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify';

require('@/store/subscriber')

axios.defaults.baseURL = 'http://localhost:8080/v1'

Vue.config.productionTip = false

store.dispatch('auth/attempt', { 
  access_token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user'))
}).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
