import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Alert from './shared/Alert'
import firebase from "firebase/app";

Vue.component('Alert', Alert)
Vue.config.productionTip = false
// Vue.config.performance = true
Vue.filter('parseXML', function (desc) {
    // let re = /<stats>(.+?)<\/stats>/g;
    let re = /<\/?[^>]+(>|$)/g
    let matches = []
    let cut = desc.replace(re, '|')

    let arr = cut.split('|')
    arr.forEach(elem => {
      let put = elem.split(',').filter(Boolean)
      if (put.length) {
        matches.push(put);
      }
    })
  return matches 
})
Vue.filter('rounded', function (x) {
  // if (x == 'NaN') {
  //   return x = 0
  // }
  return (Number.isInteger(x)) ? x : parseFloat(x).toFixed(2)
})

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let him = {id: user.uid, name: user.displayName}
        this.$store.dispatch('autoSingIn', him)
      }
    })
  }
}).$mount('#app')
