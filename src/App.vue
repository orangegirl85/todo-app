<template>
  <div id="app">
    <h1 class="ui dividing centered header">Vue.js Todo App</h1>
    <ul v-if="store.todo && store.todo.length">
      <span>aa</span>
      <li v-for="tod of store.todo">
        <p><strong>{{tod.title}}</strong></p>
        <p>{{tod.project}}</p>
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
    // console.log('created')
    // this.fetchTodos()
  },
  methods: {
    createTodo (newTodo) {
      this.todos.push(newTodo)
      window.sweetAlert('Success!', 'To-Do created!', 'success')
    }
  }
}
</script>
