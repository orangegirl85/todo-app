import Vue from 'vue'
import axios from 'axios'

const store = {
  todo: null
}

const API = {
  fetchTodo () {
    if (store.todo) return
    axios.get('http://localhost:8080/me')
      .then((res) => {
        store.todo = res.data
        console.log(store.todo)
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
