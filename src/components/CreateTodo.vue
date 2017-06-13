<template>
  <div class='ui basic content center aligned segment'>
    <button class='ui basic button icon' v-on:click="openForm" v-show="!store.form.isCreating">
      <i class='plus icon'></i>
    </button>
    <div class='ui centered card' v-show="store.form.isCreating">
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <label>Title</label>
            <input v-model="store.form.titleText" type='text'>
          </div>
          <div class='field'>
            <label>Project</label>
            <input v-model="store.form.projectText" type='text'>
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="sendForm()">
              Create
            </button>
            <button class='ui basic red button' v-on:click="closeForm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openForm () {
      this.store.form.isCreating = true
    },
    closeForm () {
      this.store.form.isCreating = false
    },
    sendForm () {
      if (this.store.form.titleText.length > 0 && this.store.form.projectText.length > 0) {
        const title = this.store.form.titleText
        const project = this.store.form.projectText
        this.API.postTodo({title, project})
        this.$emit('create-todo', {
          title,
          project,
          done: false
        })
        this.store.form.titleText = ''
        this.store.form.projectText = ''
        this.store.form.isCreating = false
      }
    }
  }
}
</script>
