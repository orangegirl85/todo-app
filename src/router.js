import Vue from 'vue'
import VueRouter from 'vue-router'

import TodoList from './components/TodoList'
// import About from './components/About'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: TodoList },
    // { path: '/about', component: About },
    { path: '*', redirect: '/' }
  ]
})

export default router
