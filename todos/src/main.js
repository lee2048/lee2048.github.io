// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'todomvc-app-css/index.css'
import Velocity from 'Velocity-animate'
import todoapp from './components/todoapp.vue'
Vue.config.productionTip = false

/* eslint-disable no-new */


var todo = new Vue({
  el: '#todos',
  render: h => h(todoapp)
})
var velocity = document.getElementsByClassName('Velocity')[0];
Velocity(velocity, {translateX: 350}, {duration: 1000})
