import Vue from 'vue'
import App from './App.vue'
// import Delaunator from 'delaunator' // C:/Users/Thomas/AppData/Local/Microsoft/TypeScript/4.2/node_modules/@types/delaunator/

// Vue.use(Delaunator);

Vue.config.productionTip = false
// Object.definePrototype(Vue.prototype, '$Delaunator', {value: Delaunator});
// Vue.prototype.$Delaunator = Delaunator;

new Vue({
  render: h => h(App),
}).$mount('#app')
