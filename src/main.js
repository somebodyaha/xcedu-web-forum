import { boot } from '@xcedu/web-share'
import router from './router'
import store from './stores'
import App from './App.vue'
import './style/index.scss'
const { bootstrap, mount, unmount } = boot(store, router, App)
export { bootstrap, mount, unmount }
