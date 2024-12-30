<template>
  <div
    class="py-3 px-3 sm:px-5 overflow-x-hidden bg-white rounded-lg overflow-y-auto gap-2 flex items-start flex-col"
  >
    <!--  -->
    <div class="hidden min-h-13 items-start justify-between w-full lg:flex">
      <!-- menu  -->
      <ul class="flex flex-row flex-wrap gap-3">
        <li
          @click="selectMenu(menu)"
          :class="{ 'bg-slate-600 text-white': menu.active_menu === true }"
          v-for="menu in list_menu"
          class="text-sm font-medium text-slate-600 py-1 px-2 rounded-2xl bg-slate-200 cursor-pointer"
        >
          {{ menu.name_menu }}
        </li>
      </ul>
      <!-- select -->
      <div class="relative">
        <select
          class="appearance-none bg-slate-100 font-semibold text-slate-600 outline-none w-45 rounded-lg border border-slate-300 px-3 py-1.5"
        >
          <option value="BotBanHang">BotBanHang</option>
          <option value="Retion">Retion</option>
          <option value="AppOn">AppOn</option>
        </select>
        <IconArrow
          class="w-4 h-4 text-slate-600 absolute right-2 top-2.5"
        ></IconArrow>
      </div>
    </div>
    <!--  -->
    <ul
      class="grid grid-cols-2 gap-3 sm:gap-6 gap-y-5 w-full pb-8 sm:grid-cols-1 lg:gap-6 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4"
    >
      <li
        v-for="app in list_app"
        class="flex items-center gap-2 cursor-pointer justify-center lg:justify-start"
      >
        <img
          :src="app.image_app"
          class="h-15 w-15 shadow-lg flex-shrink-0 rounded-xl"
          alt=""
        />
        <!--  -->
        <div class="flex flex-col gap-0.5  w-full items-start justify-start">
          <h3 class="flex justify-start text-sm font-medium">
            {{ app.name_app }}
          </h3>
          <p class="flex justify-startc text-xs text-slate-600">
            {{ app.status_app }}
          </p>
          <p v-if="app.active_app" class="text-xs- bg-green-100 px-2 rounded-md text-slate-700 font-medium">Đã cài đặt</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
/**Icon*/
import IconArrow from "../icons/IconArrow.vue";
import IconMenu from "../icons/IconMenu.vue";

/**Image*/
import warehouse from "@/assets/imgs/img_app/warehouse.png";
import timeboxing from "@/assets/imgs/img_app/timeboxing.png";
import sell from "@/assets/imgs/img_app/sell.png";
import product from "@/assets/imgs/img_app/product.png";
import kiemkho from "@/assets/imgs/img_app/kiemkho.png";
import inbox2 from "@/assets/imgs/img_app/inbox2.png";
import employee from "@/assets/imgs/img_app/employee.png";
import drive from "@/assets/imgs/img_app/drive.png";
import department from "@/assets/imgs/img_app/department.png";
import contacts from "@/assets/imgs/img_app/contacts.png";
import Cashflow from "@/assets/imgs/img_app/Cashflow-1.png";
import camera from "@/assets/imgs/img_app/camera_ip.png";
import businessPermission from "@/assets/imgs/img_app/business_permission.png";
import attendance from "@/assets/imgs/img_app/attendance.png";
import approval from "@/assets/imgs/img_app/approval.png";
import ads from "@/assets/imgs/img_app/ads.png";

/**Biến*/
/**Danh sách menu*/
const list_menu = ref([
  { name_menu: "Toàn bộ", active_menu: true, id_menu: 1 },
  { name_menu: "Đã cài đặt", active_menu: false, id_menu: 2 },
  { name_menu: "🔥 Phổ biến", active_menu: false, id_menu: 3 },
  { name_menu: "💵 Tài chính", active_menu: false, id_menu: 4 },
  { name_menu: "🎯 Khách hàng", active_menu: false, id_menu: 5 },
  { name_menu: "⚙️ Nội bộ", active_menu: false, id_menu: 6 },
  { name_menu: "🎓 Đào tạo", active_menu: false, id_menu: 7 },
  { name_menu: "📦 Khác", active_menu: false, id_menu: 8 },
]);
/**Dánh sách app*/
const list_app = ref([
  {
    name_app: "TimeBoxing",
    status_app: "Nội bộ",
    image_app: timeboxing,
    active_app: true,
  },
  {
    name_app: "Xét duyệt",
    status_app: "Nội bộ",
    image_app: approval,
    active_app: true,
  },
  {
    name_app: "Chấm công",
    status_app: "Nội bộ",
    image_app: attendance,
    active_app: true,
  },
  {
    name_app: "Danh bạ",
    status_app: "Khách hàng",
    image_app: contacts,
    active_app: true,
  },
  {
    name_app: "Drive",
    status_app: "Nội bộ",
    image_app: drive,
    active_app: true,
  },
  {
    name_app: "CameraIP",
    status_app: "Khác",
    image_app: camera,
    active_app: false,
  },
  {
    name_app: "Nhân sự",
    status_app: "Nội bộ",
    image_app: employee,
    active_app: true,
  },
  {
    name_app: "Phòng ban",
    status_app: "Nội bộ",
    image_app: department,
    active_app: true,
  },
  {
    name_app: "Vai trò",
    status_app: "Nội bộ",
    image_app: businessPermission,
    active_app: true,
  },
  {
    name_app: "Ads",
    status_app: "Tài chính",
    image_app: ads,
    active_app: false,
  },
  {
    name_app: "Florising",
    status_app: "Nội bộ",
    image_app: inbox2,
    active_app: false,
  },
  {
    name_app: "Sản phẩm",
    status_app: "Tài chính",
    image_app: product,
    active_app: true,
  },
  {
    name_app: "Đơn hàng",
    status_app: "Tài chính",
    image_app: sell,
    active_app: true,
  },
  {
    name_app: "Tồn kho",
    status_app: "Tài chính",
    image_app: warehouse,
    active_app: false,
  },
  {
    name_app: "Kiểm kho",
    status_app: "Tài chính",
    image_app: kiemkho,
    active_app: false,
  },
  {
    name_app: "Tài chính",
    status_app: "Tài chính",
    image_app: Cashflow,
    active_app: true,
  },
]);

/**Hàm*/
function selectMenu(menu: {
  name_menu: string;
  active_menu: boolean;
  id_menu: number;
}) {
  list_menu.value.map((item) => {
    item.active_menu = false;
    if (item.id_menu === menu.id_menu) {
      item.active_menu = true;
    }
  });
}
</script>
