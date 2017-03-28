import Vue from 'vue'
import 'todomvc-app-css/index.css'
import Velocity from 'Velocity-animate'
import todoapp from './components/todoapp.vue'
Vue.config.productionTip = false


var todo = new Vue({
  el: '#todos',
  render: h => h(todoapp)
})
// var velocity = document.getElementsByClassName('Velocity')[0];
// Velocity(velocity, {translateX: 350}, {duration: 1000})
