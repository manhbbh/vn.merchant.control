export const routes = [
  {
    path: '/',
    name: 'business',
    component: () => import('@/views/Business.vue'),
  },
  {
    path: '/timeboxing',
    name: 'timeboxing',
    component: () => import('@/views/TimeboxingSetting.vue'),
  },
  {
    path: '/synchronous',
    name: 'synchronous',
    component: () => import('@/views/SynchronousSetting.vue'),
  },
]
