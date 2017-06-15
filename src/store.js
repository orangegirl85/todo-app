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
    axios.get(process.env.URL + 'api/todos')
      .then((res) => {
        store.todos = res.data
      })
  },
  postTodo (postBody) {
    axios.post(process.env.URL + 'api/todos', postBody).then(response => router.go(router.currentRoute))
  },
  putTodo (id, putBody) {
    axios.put(process.env.URL + 'api/todos/' + id, putBody).then(response => router.go(router.currentRoute))
  },
  deleteTodo (id) {
    axios.delete(process.env.URL + 'api/todos/' + id).then(response => router.go(router.currentRoute))
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
