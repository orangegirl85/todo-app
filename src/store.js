import Vue from 'vue'
import axios from 'axios'

const store = {
  todos: null
}

const API = {
  fetchTodos () {
    if (store.todos) return
    axios.get('http://localhost:8080/api/todos')
      .then((res) => {
        store.todos = res.data
        // console.log(store.todo)
      })
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
