import Test from '@/views/Test.vue'
import Business from '@/views/Business.vue'
import Timekeeping from '@/views/Timekeeping.vue'
import TimeboxingSetting from '@/views/TimeboxingSetting.vue'

export const routes = [
  { path: '/', component: Business },
  // { path: '/test', component: Test },
  // { path: '/business', component: Business },
  // { path: '/Timekeeping', component: Timekeeping },
  { path: '/timeboxing', component: TimeboxingSetting },
]
