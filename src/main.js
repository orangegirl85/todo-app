import Vue from 'vue'

import App from './App'
import router from './router'
import './store'
import 'script-loader!sweetalert/dist/sweetalert.min.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ...App
})
