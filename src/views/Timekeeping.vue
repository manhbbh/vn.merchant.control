<template>
  <div class="text-center overflow-y-auto sm:h-screen sm:overflow-hidden">
    <main
      class="w-full flex flex-col gap-2 bg-gray-100 px-3 pb-3 h-screen overflow-hidden text-black"
    >
      <!-- phần trên -->
      <header
        class="static top-0 sm:h-16 py-3 flex justify-between items-center flex-shrink-0"
      >
        <!-- back và cài đặt chấm công -->
        <div class="flex gap-2.5 items-center h-7.5 justify-start">
          <IconBack class="h-5 w-5 flex-shrink-0"></IconBack>
          <h2 class="text-lg font-medium hidden sm:flex">Cài đặt chấm công</h2>
        </div>
        <!-- copy nút lưu  -->
        <div class="flex gap-7 items-center justify-start h-10">
          <div class="flex items-center gap-2.5 h-7.5">
            <IconCopy class="h-5 w-5 flex-shrink-0"></IconCopy>
            <p class="text-lg text-slate-500 font-medium">Sao chép</p>
          </div>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Lưu lại
          </button>
        </div>
      </header>
      <!-- Phần thân -->
      <div
        class="flex-1 bg-white flex p-3 flex-col gap-2 overflow-y-auto sm:overflow-hidden sm:flex-row"
      >
        <!-- Phần trái -->
        <nav
          class="relative h-100 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden flex flex-col mb-2 md:w-57.5 sm:h-166 sm:mb-0 sm:w-1/2"
        >
          <!--  -->
          <ul class="p-2 flex flex-col gap-3">
            <li
              v-for="(menu, index) in list_menu"
              :key="index"
              @click="redirect(menu)"
              :class="{ 'bg-white': menu.active }"
              class="flex items-center gap-2.5 h-9 rounded py-2 px-3 cursor-pointer"
            >
              <!-- Render icon động -->
              <component
                :is="menu.icon"
                class="w-5 h-5"
                :class="{
                  'text-black': menu.active,
                  'text-muted': !menu.active,
                }"
              ></component>

              <h3
                :class="{
                  'text-black': menu.active,
                  'text-muted': !menu.active,
                }"
                class="text-sm font-semibold"
              >
                {{ menu.name_item }}
              </h3>
            </li>
          </ul>
          <!--  -->
        </nav>
        <!-- phần phải -->
        <div
          class="flex-1 flex flex-col gap-2 md:overflow-y-auto sm:overflow-hidden"
        >
          <!--  -->
          <DetailTimekeeping v-if="is_conponent == 1"></DetailTimekeeping>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
/**compomnet con*/
import Business from '@/components/ingredients/Business.vue'
import Application from '@/components/ingredients/Application.vue'
import DetailTimekeeping from '@/components/timekeeping/DetailTimekeeping.vue'
/**Icon*/

import IconBack from '@/components/icons/IconBack.vue'
import IconCopy from '@/components/icons/IconCopy.vue'
/**Icon ở menu*/
import IconEmployee from '@/components/icons/iconMenu/IconEmployee.vue'
import IconSettings from '@/components/icons/iconMenu/IconSettings.vue'
import IconHistory from '@/components/icons/iconMenu/IconHistory.vue'
import IconFingerprint from '@/components/icons/iconMenu/IconFingerprint.vue'

/**Biến*/
/**Biến kiểm tra mở component con nào */
const is_conponent = ref(1)
/**Biến kiểm tra hiện doanh nghiệp hay ứng dụng */
const is_business = ref(true)
/**Biến danh sách menu*/
const list_menu = ref([
  {
    id_menu: 1,
    name_item: 'Thiết lập chung',
    icon: IconSettings,
    active: true,
  },
  {
    id_menu: 2,
    name_item: 'Nhân sự',
    icon: IconEmployee,
    active: false,
  },
  {
    id_menu: 3,
    name_item: 'Vân tay',
    icon: IconFingerprint,
    active: false,
  },
  {
    id_menu: 4,
    name_item: 'Lịch sử thiết lập',
    icon: IconHistory,
    active: false,
  },
])
/**Hàm*/
function redirect(selectedMenu: {
  id_menu: number
  name_item: string
  icon: any
  active: boolean
}) {
  list_menu.value.forEach((menu) => {
    menu.active = false // Tắt tất cả các mục
  })
  selectedMenu.active = true // Bật mục được chọn
  console.log('Selected menu:', selectedMenu)
  is_conponent.value = selectedMenu.id_menu
}
</script>
<style scoped lang="scss"></style>
