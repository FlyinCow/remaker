import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useNoteStore } from './store'
import { createRouter, createWebHistory } from 'vue-router'
import EditorMonaco from './components/EditorMonaco.vue'

const pinia = createPinia()
createApp(App)
  .use(pinia)
  // .use(router)
  .mount('#app')


