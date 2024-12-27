<template>
 <div class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3">
    <!-- icon -->
    <IconTime class="w-5 h-5 flex-shrink-0"></IconTime>
    <!--content  -->
    <div class="flex flex-col gap-2 w-full overflow-hidden">
      <!-- 1 -->
      <div class="flex-col mb-3 sm:">
        <h4
          class="flex text-customDark h-5 mb-2.5 justify-start text-sm font-medium"
        >
          Thời gian làm việc chung
        </h4>
        <p class="flex h-5 justify-start text-sm text-gray-500 truncate ">
          Khi tạo thêm Chi nhánh thì mặc định kế thừa cấu hình này. Ngoài ra, có
          thể thiết lập tùy biến theo từng Chi nhánh.
        </p>
      </div>
      <!--2  -->
      <div
        class="flex flex-col items-start justify-start gap-2 mb-2 sm:h-10 sm:flex-row"
      >
        <div class="flex">
          <IconWorld class="h-5 w-5"></IconWorld>
          <h4 class="flex sm:hidden h-5 pl-2 justify-start text-sm font-medium">
            Múi giờ 
          </h4>
        </div>
        <!--  -->
        <div
          class="flex flex-col flex-1 sm:border-b bottom-1 border-slate-200 items-center sm:justify-between sm:flex-row"
        >
          <div class="flex-col mb-3">
            <h4 class="sm:flex hidden h-5 justify-start text-sm font-medium">
              Múi giờ
            </h4>
            <p
              class="flex h-5 line-clamp-1 justify-start text-sm text-gray-500"
            >
              Thiết lập múi giờ theo khu vực kinh doanh, giúp báo cáo thống kê
              chính xác.
            </p>
          </div>
          <!-- select -->
          <div class="relative w-full flex justify-start sm:w-85">
            <select
              class="appearance-none h-9  text-slate-600 outline-none sm:w-85 text-sm rounded-lg border border-slate-300 px-7 sm:px-3 py-1.5"
            >
              <option value="BotBanHang">
                (GMT +7:00) Hanoi, Bangkok, Jakarta
              </option>
              <option value="Retion">Retion</option>
              <option value="AppOn">AppOn</option>
            </select>
            <IconArrow
              class="w-4 h-4 text-slate-600 absolute right-12 sm:right-2 top-2.5"
            ></IconArrow>
          </div>
          <!--  -->
        </div>
      </div>
      <!-- 3 -->
      <div class="h-10 flex items-start gap-2 pt-2">
        <IconPapers class="h-5 w-5"></IconPapers>
        <!--  -->
        <div class="flex max-w-full flex-1 items-center justify-between">
          <div class="flex-col mb-3">
            <h4 class="flex h-5 justify-start text-sm font-medium">
              Thời gian làm việc trong ngày 
            </h4>
            <p class="hidden h-5 justify-start text-sm text-gray-500 sm:flex">
              Thiết lập thời gian làm việc giúp thống kê, tính tiền lương P1, P2
              chính xác.
            </p>
          </div>
          <!-- select -->
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" checked />
            <div
              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"
            ></div>
          </label>
        </div>
      </div>
      <!--4  -->
      <!-- Vòng lặp qua mảng -->
      <div
        v-for="(day, index) in LIST_DAYS"
        :key="index"
        class="flex flex-col text-sm border-b border-slate-200 items-center py-3 md:justify-between text-customDark md:flex-row last:border-none"
      >
        <div class="h-9 flex sm:pb-0 pb-4 w-full items-center justify-between">
          <div class="sm: flex">
            <div class="sm:w-32 flex-none py-2 pr-3 font-medium sm:pr-0">
              {{ day.title  }}
            </div>
            <!-- select -->
            <label
              class="inline-flex h-9 items-center cursor-pointer sm:hidden"
            >
              <input
                type="checkbox"
                value=""
                class="sr-only peer"
                v-model="day.active"
              />
              <div
                class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"
              ></div>
            </label>
          </div>
          <select
            v-model="day.work_status"
            class="outline-none mr-0 h-9 w-30 flex-none rounded-md border px-3 py-1.5 sm:hidden"
          >
            <option value="full_time">Cả ngày</option>
            <option value="part_time">Theo ca</option>
            <option value="day_off">Ngày nghỉ</option>
          </select>
        </div>
        <!--  -->
        <div
          class="h-9 flex sm:gap-5 w-full justify-between items-center sm:justify-end"
        >
          <select
            v-model="day.work_status"
            class="outline-none mr-0 h-9 w-30 hidden flex-none sm:flex rounded-md border px-3 py-1.5"
          >
            <option value="full_time">Cả ngày</option>
            <option value="part_time">Theo ca</option>
            <option value="day_off">Ngày nghỉ</option>
          </select>
          <!--  -->
          <p v-if="day.active" class="text-center md:px-4">từ</p>

          <div v-if="day.active" class="">
            <select
              id="from-time"
              class="mr-0 flex h-9 w-30 rounded-md border px-3 py-2"
            >
              <option value="7">9:00</option>
              <option value="8">8:00</option>
              <option value="9">7:00</option>
              <!-- Add more options as needed -->
            </select>
          </div>
          <!--  -->
          <p v-if="day.active" class="text-center md:px-4">đến</p>

          <div v-if="day.active">
            <select
              id="from-time"
              class="mr-0 flex h-9 w-30 rounded-md border px-3 py-2"
            >
              <option value="22">22:00</option>
              <option value="21">21:00</option>
              <option value="20">20:00</option>
              <!-- Add more options as needed -->
            </select>
          </div>
          <!--  -->

          <!-- select -->
          <label class="hidden sm:inline-flex h-9 items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              v-model="day.active"
            />
            <div
              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"
            ></div>
          </label>
        </div>
        <!--  -->
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import IconTime from "@/components/icons/IconTime.vue";
import IconWorld from "@/components/icons/IconWorld.vue";
import IconPapers from "@/components/icons/IconPapers.vue";
import IconArrow from "@/components/icons/IconArrow.vue";

/**Biến*/
// danh sách thứ
const LIST_DAYS = [
  {
    active: true,
    checkin: {
      hour: 9,
    },
    checkout: {
      hour: 22,
    },
    title: "Thứ 2",
    work_status: "full_time",
  },
  {
    active: true,
    checkin: {
      hour: 9,
    },
    checkout: {
      hour: 22,
    },
    title: "Thứ 3",
    work_status: "full_time",
  },
  {
    active: true,
    checkin: {
      hour: 9,
    },
    checkout: {
      hour: 22,
    },
    title: "Thứ 4",
    work_status: "full_time",
  },
  {
    active: true,
    checkin: {
      hour: 9,
    },
    checkout: {
      hour: 22,
    },
    title: "Thứ 5",
    work_status: "full_time",
  },
  {
    active: true,
    checkin: {
      hour: 9,
    },
    checkout: {
      hour: 22,
    },
    title: "Thứ 6",
    work_status: "full_time",
  },
  {
    active: true,
    checkin: {
      hour: 9,
      minute: 0,
    },
    checkout: {
      hour: 22,
      minute: 0,
    },
    title: "Thứ 7",
    work_status: "full_time",
  },
  {
    active: false,
    checkin: {
      hour: 9,
      minute: 0,
    },
    checkout: {
      hour: 18,
      minute: 0,
    },
    title: "Chủ nhật",
    work_status: "day_off",
  },
];
</script>
