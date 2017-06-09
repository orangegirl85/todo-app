<template>
  <div id="app">
    <h1 class="ui dividing centered header">Vue.js Todo App</h1>
    <div class='ui three column centered grid'>
      <div class='column'>
        <todo-list v-bind:todos="store.todos"></todo-list>
        <create-todo v-on:create-todo="createTodo"></create-todo>
      </div>
    </div>
  </div>
</template>

<script>
// import sweetalert from 'sweetalert'
import TodoList from './components/TodoList.vue'
import CreateTodo from './components/CreateTodo.vue'
// import axios from 'axios'

export default {
  name: 'app',
  components: {
    TodoList,
    CreateTodo
  },
  created () {
    this.API.fetchTodos()
  },
  methods: {
    createTodo (newTodo) {
      this.todos.push(newTodo)
      window.sweetAlert('Success!', 'To-Do created!', 'success')
    }
  }
}
</script>
