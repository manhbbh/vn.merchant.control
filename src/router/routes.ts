import Test from '@/views/Test.vue'
import Business from '@/views/Business.vue'
import Timekeeping from '@/views/Timekeeping.vue'
import TimekeepingSetup from '@/views/TimekeepingSetup.vue'




export const routes = [
  { path: '/', redirect: '/test' },
  { path: '/test', component: Test },
  { path: '/business', component: Business },
  { path: '/Timekeeping', component: Timekeeping },
  { path: '/TimekeepingSetup', component: TimekeepingSetup },


]