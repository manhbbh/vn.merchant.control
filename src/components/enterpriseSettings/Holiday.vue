<template>
  <div class="py-3 px-4 bg-white rounded-lg flex text-black items-start gap-3">
    <!-- icon -->
    <IconCalendar class="w-5 h-5"></IconCalendar>
    <!--content  -->
    <div class="flex flex-col gap-2.5 w-full">
      <div class="flex h-9 items-start justify-between">
        <h4 class="flex justify-start text-sm font-medium">Nghỉ lễ</h4>
       <div class="flex items-center gap-2.5">
        <p class="text-sm font-medium text-slate-500 h-9 px-6 py-2">Khôi phục mặc định</p>
          <button
            class="h-9 w-18 text-sm font-medium text-white rounded-md bg-black"
          >
            Thêm
          </button>
       </div>
      </div>
      <!--  -->
      <table class="min-w-full border-none bg-white rounded-lg z-10">
        <thead
          class="bg-slate-200 h-7 text-xs font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
        >
          <tr class="h-7">
            <th class="w-18 px-2 text-left font-semibold">ID|Ngày</th>
            <th class="w-50 text-left font-semibold">Tiêu đề</th>
            <th class="w-25 text-center font-semibold">Ngày lễ</th>
            <th class="w-50 text-left font-semibold hidden md:table-cell">
              Người tạo
            </th>
            <th class="w-25 text-left font-semibold hidden md:table-cell">
              Xóa
            </th>
            <th
              class="w-[170px] text-left font-semibold hidden md:table-cell"
            ></th>
          </tr>
        </thead>
        <!--  -->
        <tbody>
          <tr
            v-for="(holiday, index) in list_holiday"
            :key="index"
            class="hover:bg-slate-100 text-black h-15 cursor-pointer text-sm border-b border-gray-200 overflow-y-auto"
          >
            <!-- stt-->
            <td class="py-2 text-left  items-start justify-center">
              <p class="flex px-4 text-blue-500 font-semibold">
                {{ index + 1 }}
              </p>
             
            </td>
            <!-- Tiêu đề -->
            <td class="text-left py-2 items-center">
              <p class="inline-flex">{{ holiday.title_holiday }}</p>
            </td>

            <!-- Ngày lễ -->
            <td class=" font-medium py-2">
              <p class="fex items-center ">{{ holiday.day_create_holiday }}</p>
            </td>

            <!-- Người tạo -->
            <td
              class="text-left py-2 text-customGray flex-col flex text-15px"
            >
              <div class="flex items-center gap-1 h-5">
                <img
                  class="h-4 w-4 rounded-full"
                  :src="holiday.avatar_employee"
                  alt=""
                />
                <!--  -->
                <div class="flex gap-1 items-end justify-between">
                  <p class="text-sm">
                    {{ holiday.name_create_holiday }}
                  </p>
                  <IconTicks class="w-4 h-4"></IconTicks>
                </div>
              </div>
              <!--  -->
              <div class="h5 flex ml-5 items-center justify-start">
                <p>{{ holiday.time_create_holiday }}</p>
              </div>
            </td>

            <!-- xóa -->
            <td class="text-left py-2 hidden md:table-cell">
              
              <div
                class="h-5 inline-flex text-red-500 bg-red-50 font-medium text-xs rounded-md px-2 py-0.5 items-center justify-center"
              >
                {{ holiday.delete_holiday }}
              </div>
            </td>
            <!-- stt-->
            <td
              class="py-2 text-left px-3 w-18 items-center justify-center"
            ></td>
          </tr>
        </tbody>
      </table>
      <!--  -->
      <div class="flex gap-4">
        <!-- Ngày thành lập-->
        <div class="flex text-left h-9 items-center gap-4">
          <label
            for="taxCode"
            class="block text-sm font-medium texet-black px-1 "
          >
            Tiêu đề
          </label>
          <input class="border border-gray-300 px-3 rounded-md w-67 h-9 " placeholder="Nhập tiêu đề ngày nghỉ" type="text">
        </div>
        <!-- Ngày thành lập-->
        <div class="flex text-lefth-9 items-center gap-4">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Ngày 
          </label>  
          <VueDatePicker class="w-39 h-9" v-model="date"  placeholder="Chọn ngày" auto-apply :enable-time-picker="false" />
        </div>

        <!--  -->
        <button class="h-9 bg-green-600 text-sm font-medium text-white rounded-md px-4 py-2">Lưu</button>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
/**Icon*/
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconTicks from "@/components/icons/IconTicks.vue";
/**img*/
import avarta from "@/assets/imgs/Avatar.png";

/**Biến*/
const date = ref(new Date());
/**Danh sách */
const list_holiday = ref([
  {
    day_holiday: "28/4",
    title_holiday: "Quốc khánh Việt Nam",
    day_create_holiday: "2/9",
    name_create_holiday: "Nguyễn Đình Tùng",
    avatar_employee: avarta,
    time_create_holiday: "10:00 - 12/4/2024",
    delete_holiday: "Xóa",
  },
  {
    day_holiday: "28/4",
    title_holiday: "Quốc khánh Việt Nam",
    day_create_holiday: "2/9",
    name_create_holiday: "Nguyễn Đình Tùng",
    avatar_employee: avarta,
    time_create_holiday: "10:00 - 12/4/2024",
    delete_holiday: "Xóa",
  },
]);
</script>

<style lang="scss" scoped></style>
