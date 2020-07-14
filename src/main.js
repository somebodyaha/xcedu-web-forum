import { boot } from '@xcedu/web-share'
import router from './router'
import store from './stores'
import Vuex from 'vuex'
import App from './App.vue'
Vue.use(Vuex)

new Vue({
  el: '#app-forum',
  router,
  store
})
const { bootstrap, mount, unmount } = boot(store, router, App)
export { bootstrap, mount, unmount }
