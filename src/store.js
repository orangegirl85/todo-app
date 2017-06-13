import Vue from 'vue'
import axios from 'axios'
import router from './router'

const store = {
  todos: null,
  form: {
    titleText: '',
    projectText: '',
    isCreating: false
  }
}

const API = {
  fetchTodos () {
    if (store.todos) return
    axios.get('http://localhost:8080/api/todos')
      .then((res) => {
        store.todos = res.data
        // console.log(store.todo)
      })
  },
  postTodo (postBody) {
    axios.post('http://localhost:8080/api/todos', postBody).then(response => router.go(router.currentRoute))
  },
  putTodo (id, putBody) {
    axios.put('http://localhost:8080/api/todos/' + id, putBody).then(response => router.go(router.currentRoute))
  },
  deleteTodo (id) {
    axios.delete('http://localhost:8080/api/todos/' + id).then(response => router.go(router.currentRoute))
  }
}

Vue.mixin({
  data () {
    return {
      store
    }
  },
  computed: {
    API () {
      return API
    }
  }
})

export default store
