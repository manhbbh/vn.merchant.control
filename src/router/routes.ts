import Test from '@/views/Test.vue'
import Business from '@/views/Business.vue'
import Timekeeping from '@/views/Timekeeping.vue'



export const routes = [
  { path: '/', redirect: '/test' },
  { path: '/test', component: Test },
  { path: '/business', component: Business },
  { path: '/Timekeeping', component: Timekeeping },

]