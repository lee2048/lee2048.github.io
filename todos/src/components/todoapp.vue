<template lang="html">
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo"
        autofocus autocomplete="off"
        placeholder="What needs to be done?"
        v-model.trim ="newTodo"
        @keyup.enter="addTodo">
    </header>
    <transition name = "fade">
      <section class="main" v-show="todos.length" v-cloak>
        <input class="toggle-all" type="checkbox" v-model="allDone" id = 'toggle-all'>
        <label for="toggle-all">Mark all as complete</label>
          <ul class="todo-list">
            <transition-group name = 'fade'>
            <li v-for="(todo, index) in filteredTodos"
              class="todo"
              :key="todo.id"
              :class="{ completed: todo.completed, editing: todo == editedTodo }">
                <div class="view">
                    <input class="toggle" type="checkbox" v-model="todo.completed">
                    <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
                    <button class="destroy" @click="removeTodo(todo)"></button>
                </div>
              <input class = "edit" type ="text"
                v-model.trim = "todo.title"
                v-focus = "todo == editedTodo"
                @keyup.enter="doneEdit(todo, index)"
                @keyup.esc="cancelEdit(todo)"
                @blur = 'doneEdit(todo, index)'>
            </li>
          </transition-group>
          </ul>
      </section>
    </transition>
    <transition name = "fade">
      <footer class="footer" v-show="todos.length" v-cloak>
         <span class="todo-count">
          <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
        </span>
        <ul class="filters">
          <li><a href="#/all" @click = 'hashchange' :class="{ selected: hashName == 'all' }">All</a></li>
          <li><a href="#/active" @click = 'hashchange' :class="{ selected: hashName == 'active' }">Active</a></li>
          <li><a href="#/completed" @click = 'hashchange' :class="{ selected: hashName == 'completed' }">Completed</a></li>
        </ul>
        <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
          Clear completed
        </button>
      </footer>
    </transition>
    <!-- <div class="Velocity"></div> -->
  </section>
</template>

<script>
let filters = {
  all (todos) {
    return todos;
  },
  active (todos) {
    return todos.filter((todo) => {
      return !todo.completed;
    })
  },
  completed (todos) {
    return todos.filter((todo) => {
      return todo.completed;
    })
  }
}
export default {
  data () {
    return {
      newTodo: '',
      todos: [
        {id: 0, title: 'This is the todo', completed: false},
        {id: 1, title: 'This is the todo2', completed: false}
      ],
      editedTodo: null,
      cache: '',
      hashName: 'all'
    }
  },

  methods: {
    addTodo () {
      let value = this.newTodo;
      if (!value) {
        return;
      }
      this.todos.push({
        id: this.todos.length,
        title: value,
        completed: false
      });
      this.newTodo = '';
    },
    removeTodo (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    editTodo (todo) {
      this.cache = todo.title;
      this.editedTodo = todo;
    },
    doneEdit (todo, index) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null;
      if (!todo.title) {
        this.todos.splice(index, 1);
      }
    },
    cancelEdit (todo) {
      this.editedTodo = null;
      todo.title = this.cache;
      this.cache = ''
    },
    removeCompleted () {
      this.todos = filters.active(this.todos);
    },
    hashchange: function(){
      window.onhashchange = () => {
        this.hashName = window.location.hash.replace(/#\//, '');
        if (!filters[this.hashName]) {
          window.location = '';
          this.hashName = 'all'
        }
      }
    }
  },
  computed: {
    filteredTodos: function(){
      return filters[this.hashName](this.todos);
    },
    remaining: function(){
      return filters.active(this.todos).length
    },
    allDone: {
      get () {
        return this.remaining === 0;
      },
      set (value) {
        this.todos.forEach((todo) => {
          todo.completed = value;
        })
      }
    }
  },
  directives: {
    focus (el, value) {
      if (value) {
        el.focus();
      }
    }
  },
  filters: {
    pluralize: function(n) {
      return n === 1 ? 'item' : 'items'
    }
  }
}
</script>

<style lang="css">
[v-cloak]: {
  display: none;
}
.fade-enter-active, .fade-laeve-active{
  transition: .3s ease;
}
.fade-enter, .fade-laeve-active{
  opacity: 0;
  height: 0;
}
.slide-enter-active, .slide-leave-active{
  transition: .3s ease;
}
.slide-enter, .slide-leave-active{
  opacity: 0;
  height: 0;
}
/*.Velocity{
  width: 100px;
  height: 100px;
  background-color: #81D4FA;
  transform: translateX();
}*/
</style>
