<template>
  <div class="py-3 px-4 bg-white rounded-lg flex text-black items-start gap-3">
    <!-- icon -->
    <IconPapers class="w-5 h-5"></IconPapers>
    <!--content  -->
    <div class="flex flex-col gap-2.5 w-full">
      <div class="flex h-9 items-start justify-between">
        <h4 class="flex justify-start text-sm font-medium">
          Hình thức làm việc
        </h4>
        <div class="flex items-center gap-2.5">
          <p class="text-sm font-medium text-slate-500 h-9 px-6 py-2">
            Khôi phục mặc định
          </p>
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
            <th class="px-2 w-18 text-left font-semibold">ID|Ngày</th>
            <th class="w-50 text-left font-semibold">Tiêu đề</th>
            <th class="w-25 text-left font-semibold">Số giờ làm / Tuần</th>
            <th class="w-25 text-left font-semibold">Thời gian</th>
            <th class="w-50 text-left font-semibold hidden md:table-cell">
              Người tạo
            </th>
            <th class="w-25 text-center font-semibold hidden md:table-cell">
              Thao tác
            </th>
            <th class="w-25 text-left font-semibold hidden md:table-cell"></th>
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
            <td class="py-2 px-2 text-left items-start justify-center">
              <p class="flex px-4 text-blue-500 font-semibold">
                {{ index + 1 }}
              </p>
            </td>
            <!-- Tiêu đề -->
            <td class="text-left py-2 items-center">
              <p class="inline-flex">{{ holiday.title_holiday }}</p>
            </td>

            <!-- số giờ làm -->
            <td class="text-center font-medium py-2">
              <p>{{ holiday.day_create_holiday }}</p>
            </td>
            <!-- Thời gian -->
            <td class="text-left font-medium py-2">
              <!-- <p v-for="time in list_day">{{ time}}</p> -->
              <div class="flex gap-1 ">
                <p v-for="time in list_day"
                :class="{ 'bg-green-500': time !== 7 && time !== 'C', 'bg-orange-500': time === 7, 'bg-slate-500': time === 'C'}"
                 class="w-2.5 text-ss text-white flex items-center justify-center h-2.5 rounded-full ">{{ time }}</p>
              </div> 
            </td>

            <!-- Người tạo -->
            <td class="text-left py-2 text-customGray flex-col flex text-15px">
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

            <!-- Thao tác -->
            <td class="text-center py-2 hidden md:table-cell">
                <div class="flex gap-2.5">
                <button @click="showModal" class="h-5 w-14.5 text-xs font-medium text-white rounded-md bg-blue-700">Cài đặt</button>
                <div
                  class="h-5 inline-flex text-red-500 bg-red-50 font-medium text-xs rounded-md px-2 py-0.5 items-center justify-center"
                >
                  {{ holiday.delete_holiday }}
                </div>
              </div>
            </td>
            <!-- stt-->
            <td class="text-left py-2 hidden md:table-cell"></td>
          </tr>
        </tbody>
      </table>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <a-modal
    centered
    :style="{ width: '1290px' }"
    v-model:open="open"
    :auto-focus="false"
    @ok="handleOk"
    :footer="null"
  >
    <div class="flex flex-col w-full">
      <header
        class="flex items-center justify-between  h-10 px-6 py-2"
      >
        <h3 class="h-6 text-base font-semibold">Hình thức làm việc</h3>
        <button @click="open = false" class="p-1 rounded-md  hover:bg-gray-300 hover:text-black">
          <IconClose class="w-5 h-5"></IconClose>
        </button>
      </header>
      <!--  -->
      <main class="flex flex-col p-6 border-b border-t gap-2 border-gray-200">
        <div class="flex items-center gap-4 py-2">
          <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5 flex-shrink-0"
            >
              Tiêu đề 
            </label>
            <input
              type="text"
              id="shortName"
              placeholder="Nhập tiêu đề"
              class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
        </div>
        <!--  -->
        <div class="flex items-center justify-between ">
          <div class="flex items-center gap-2">
            <IconPapers class="w-5 h-5 flex-shrink-0"></IconPapers>
            <p class="text-sm font-medium">Thời gian làm việc trong ngày</p>
          </div>
          <!-- select -->
          <label class="hidden sm:inline-flex h-9 items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              v-model="active"
            />
            <div
              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"
            ></div>
          </label>

        </div>

       
      </main>
      <footer class="flex items-center justify-between px-6 py-3">
        <button class="px-4 text-sm font-medium text-customDark py-2 bg-slate-200 rounded-md">Đóng</button>

       <div class="flex gap-5"> <button class="px-4 py-2 text-sm text-customDark font-medium bg-slate-200 rounded-md ">Khôi phục mặc định</button>
        <button class="px-4 py-2 text-sm text-white font-medium bg-blue-700 rounded-md ">Lưu</button>
      </div>
      </footer>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
/**Icon*/
import IconTicks from "@/components/icons/IconTicks.vue";
import IconPaper from "@/components/icons/IconPapers.vue";
/**img*/
import avarta from "@/assets/imgs/Avatar.png";
import IconPapers from "../icons/IconPapers.vue";


/**Biến*/
const date = ref(new Date());
/**Danh sách */
const list_holiday = ref([
  {
    day_holiday: "28/4",
    title_holiday: "Toàn thời gian -Sales",
    day_create_holiday: "40 giờ",
    name_create_holiday: "Nguyễn Đình Tùng",
    avatar_employee: avarta,
    time_create_holiday: "10:00 - 12/4/2024",
    delete_holiday: "Xóa",
  },
  {
    day_holiday: "28/4",
    title_holiday: "Toàn thời gian -Sales",
    day_create_holiday: "40 giờ",
    name_create_holiday: "Nguyễn Đình Tùng",
    avatar_employee: avarta,
    time_create_holiday: "10:00 - 12/4/2024",
    delete_holiday: "Xóa",
  },
]);
/**biến*/ 
const active = ref(true);
/**danh sách ngày*/
const list_day = ref([1, 2, 3, 4, 5, 6, 7, "C"]);

/**Biến mở đóng modal*/
const open = ref(false);
/**Hàm mở modal*/ 
function showModal() {
  open.value = true;
}
/**Hàm đóng modal*/ 
function handleOk() {
  open.value = false;
}
</script>

<style lang="scss" scoped></style>
