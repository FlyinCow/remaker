import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import EditorMonaco from './components/EditorMonaco.vue'

const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/notes/:id(\\w+)',
      component: EditorMonaco
    }
  ]
})
createApp(App)
  .use(pinia)
  // .use(router)
  .mount('#app')


