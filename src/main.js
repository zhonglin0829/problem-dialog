import { createApp } from 'vue'
import './style.css'
import router from './router/router'
import App from './App.vue'

const app = createApp(App)
Object.values(import.meta.glob('./modules/*.js', {eager: true})).forEach(i => i.install?.({
  app,
  router
}));
app.use(router).mount('#app')
