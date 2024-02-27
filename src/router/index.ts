import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:edition?',
      name: 'home',
      props: true,
      component: () => import('../views/game.vue')
    }
  ]
})

export default router
