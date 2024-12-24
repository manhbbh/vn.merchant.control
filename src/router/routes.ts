import Test from '@/views/Test.vue'
import Business from '@/views/Business.vue'


export const routes = [
  { path: '/', redirect: '/test' },
  { path: '/test', component: Test },
  { path: '/business', component: Business },

]