<template>
    <div
      class="py-3 px-2 sm:px-4 border border-gray-200 rounded-lg flex text-black items-start gap-2 sm:gap-3"
    >
      <!-- icon -->
      <IconHistory class="w-5 h-5"></IconHistory>
      <!--content  -->
      <div class="flex-col flex-1 gap-3">
        <div class="flex h-5 items-center mb-3">
          <h4 class="flex justify-start text-sm font-medium">Lịch sử thiết lập</h4>
        </div>
        <!-- phần các ô input  -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="col-span-1 gap-1 sm:gap-0 flex flex-col py-2 border-b border-gray-200" v-for="history in history_employee">
              <div class="flex justify-between items-center h-9">
                <div class="flex items-center gap-2">
                  <img :src="history.avarta" class="h-8 w-8 flex-shrink-0" alt="">
                  <div class="flex flex-col items-start">
                    <div class="flex gap-1 items-center">
                      <h3 class="h-5 text-sm font-medium">{{ history.name_employee }}</h3>
                      <!--  -->
                      <IconTicks class="h-4 w-4"></IconTicks>
                    </div>
                    <p class="h-5 text-xs text-gray-500">{{ history.branch_employee }}</p>
                  </div>
                </div>
                <!--  -->
                <div class="flex flex-col text-right items-end text-xs text-gray-500">
                  <p>Thêm mới lúc</p>
                  <p>{{ history.time_history }}</p>
                </div>
              </div>
              <!--  -->
              <div class="h-7 text-black flex justify-start pl-9">
                <p>
                  <span class=" hidden sm:inline">{{ history.active_history }}</span> <a class="underline" href="">Xem dữ liệu thay đổi</a>
                </p>
              </div>  
            </div>
        
        </div>
      </div>
      <!--  -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  /**ICon*/
  import IconHistory from "@/components/icons/iconMenu/IconHistory.vue";
  import IconTicks from "@/components/icons/IconTicks.vue";
  /**Ảnh*/
  import Avatar from "@/assets/imgs/Avatar.png";
  /**Đối tượng*/
  const history_employee = ref([
    {
      avarta: Avatar,
      name_employee: "Nguyễn Đình Tùng",
      branch_employee: "BU Hà Nội",
      active_history:'Thay đổi Lương tăng ca.',
      time_history: "10:00:43 - 16/4/2024",
    },
    {
      avarta: Avatar,
      name_employee: "Nguyễn Đình Tùng",
      branch_employee: "BU Hà Nội",
      active_history:'Thay đổi Lương tăng ca.',
      time_history: "10:00:43 - 16/4/2024",
    },
    {
      avarta: Avatar,
      name_employee: "Nguyễn Đình Tùng",
      branch_employee: "BU Hà Nội",
      active_history:'Thay đổi Kỳ kinh doanh.',
      time_history: "10:00:43 - 16/4/2024",
    }
    , {
      avarta: Avatar,
      name_employee: "Nguyễn Đình Tùng",
      branch_employee: "BU Hà Nội",
      active_history:'Thay đổi Kỳ kinh doanh.',
      time_history: "10:00:43 - 16/4/2024",
    }
  ]) 
  
  </script>
  
  <style lang="scss" scoped></style>
  