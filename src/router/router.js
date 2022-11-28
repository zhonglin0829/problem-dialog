import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

routes.push({
  path: '/',
  redirect: '/login',
});

const router = createRouter({
  history: createWebHistory(), // History
  routes,
})

export default router