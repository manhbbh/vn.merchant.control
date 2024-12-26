import { waterfall } from "async";
import { createApp } from "vue";
import App from "@/App.vue";
import {
  loadEnv,
  loadLib,
  loadApp,
  loadLanguage,
  loadRouter,
} from "@/service/core";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// * Import css
import './style.css'
import "@/assets/css/tailwind.css";
/**thư viện ant*/ 
import Antd from 'ant-design-vue';  
import type { CbError } from "@/service/interface";
const APP = createApp(App);
// *Sử dụng Ant Design Vue
APP.use(Antd); 
// * Sử dụng vue Date Picker
APP.component('VueDatePicker', VueDatePicker);
waterfall(
  [
    (cb: CbError) => loadEnv(cb),
    (cb: CbError) => loadLib(cb),
    (cb: CbError) => loadRouter(APP, cb),
    (cb: CbError) => loadLanguage(APP, cb),
    (cb: CbError) => loadApp(APP, cb),
  ],
  () => APP.mount("#app")
);
