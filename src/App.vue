<template>
  <div id="app">
    <h1 class="ui dividing centered header">Vue.js Todo App</h1>
    <ul v-if="store.todos && store.todos.length">
      <span>aa</span>
      <li v-for="todo of store.todos">
        <p><strong>{{todo.title}}</strong></p>
        <p>{{todo.project}}</p>
      </li>
     </ul>
  </div>
</template>

<script>
// import sweetalert from 'sweetalert'
// import TodoList from './components/TodoList.vue'
// import CreateTodo from './components/CreateTodo.vue'
// import axios from 'axios'

export default {
  name: 'app',
  created () {
    this.API.fetchTodo()
  },
  methods: {
    createTodo (newTodo) {
      this.todos.push(newTodo)
      window.sweetAlert('Success!', 'To-Do created!', 'success')
    }
  }
}
</script>
