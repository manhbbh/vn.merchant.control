<template>
  <div
    class="py-3 px-2 sm:px-4 border border-gray-200 rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconEmployee class="w-5 h-5 flex-shrink-0"></IconEmployee>
    <!--content  -->
    <div class="flex-col flex-1 gap-3">
      <div class="flex h-5 items-center mb-3">
        <h4 class="flex justify-start text-sm font-medium">{{ $t('v1.table.employee') }}</h4>
      </div>
      <!-- phần các ô input  -->
      <table
        class="min-w-full table-fixed border-none bg-white rounded-lg z-10"
      >
        <thead
          class="bg-slate-200 h-7 text-xs font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
        >
          <tr class="h-7 flex gap-x-12 items-center">
            <th class="w-18 text-center font-semibold">{{ $t('v1.table.id_date') }}</th>
            <th class="w-50 text-left font-semibold">{{ $t('v1.table.employee') }}</th>
            <th class="w-50 text-left font-semibold hidden md:block">
              {{ $t('v1.table.work_form') }}
            </th>
            <th class="w-42 text-left font-semibold hidden md:block">
              {{ $t('v1.table.p1_salary') }}
            </th>
            <th class="w-50 text-left font-semibold hidden md:block">
              {{ $t('v1.table.last_updated') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
          @click="showModal"
            v-for="(holiday, index) in list_employee"
            :key="index"
            class="flex items-center gap-x-12 text-black h-15 cursor-pointer text-sm border-b border-gray-200"
          >
            <!-- STT -->
            <td class="w-18 text-center items-start justify-center">
              <p class="flex px-4 text-blue-500 justify-center font-semibold">
                {{ index + 1 }}
              </p>
            </td>

            <!-- Nhân sự -->
            <td class="w-50 text-left py-2 text-customGray">
              <div class="flex items-center gap-1 h-5">
                <img
                  class="h-4 w-4 rounded-full"
                  :src="holiday.avatar_employee"
                  alt=""
                />
                <!--  -->
                <div class="flex gap-1 items-center justify-between">
                  <p class="text-sm">
                    {{ holiday.name_create_holiday }}
                  </p>
                  <IconTicks class="w-4 h-4"></IconTicks>
                </div>
              </div>
              <!--  -->
              <div class="flex gap-1 ml-5 h-2.5">
                <p
                  v-for="time in list_day"
                  :class="{
                    'bg-green-500': time !== 7 && time !== 'C',
                    'bg-orange-500': time === 7,
                    'bg-slate-500': time === 'C',
                  }"
                  class="w-2.5 text-ss text-white flex items-center justify-center h-2.5 rounded-full"
                >
                  {{ time }}
                </p>
              </div>
            </td>

            <!-- Hình thức làm việc -->
            <td class="w-50 text-left hidden md:block">
              <!-- select -->
              <div class="relative w-full flex justify-start sm:w-50">
                <select
                  v-model="holiday.working_form"
                  class="appearance-none h-10 text-black outline-none sm:w-50 text-sm rounded-md border border-slate-300 px-7 sm:px-3 py-2"
                >
                  <option value="sale" class="text-sm">
                    {{ $t('v1.setting.full_time') }} - Sales
                  </option>
                  <option value="Retion">Retion</option>
                  <option value="AppOn">AppOn</option>
                </select>
                <IconArrow
                  class="w-4 h-4 text-slate-600 absolute right-12 sm:right-2 top-2.5"
                ></IconArrow>
              </div>
              <!--  -->
            </td>

            <!-- Lương P1 -->
            <td class="w-42 text-left hidden md:block">
              <div
                class="flex items-center border border-gray-300 h-9 py-2 rounded-md"
              >
                <input
                  type="text"
                  class="outline-none text-customDark pl-3 w-full text-sm"
                  v-model="holiday.wage_employee"
                />
                <div
                  class="border-l border-gray-300 text-muted flex items-center justify-center w-8 h-9"
                >
                  đ
                </div>
              </div>
            </td>

            <!-- Cập nhật lần cuối -->
            <td class="w-50 text-left py-2 text-customGray hidden md:block">
              <div class="flex items-center gap-1 h-5">
                <img
                  class="h-4 w-4 rounded-full"
                  :src="holiday.avatar_employee"
                  alt=""
                />
                <!--  -->
                <div class="flex gap-1 items-center justify-between">
                  <p class="text-sm">
                    {{ holiday.name_create_holiday }}
                  </p>
                  <IconTicks class="w-4 h-4"></IconTicks>
                </div>
              </div>
              <!--  -->
              <div class="h5 flex ml-5 text-xs items-center justify-start">
                <p>{{ holiday.time_create_holiday }}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
  <a-modal
    centered
    :style="{ width: '1290px' }"
    v-model:open="open"
    :auto-focus="false"
    @ok="handleOk"
    :footer="null"
  >
    <div class="flex flex-col w-full">
      <header class="flex items-center justify-between h-14 px-6 py-2">
        <h3 class="h-6 text-lg font-semibold">{{ list_employee[0]?.name_create_holiday }}</h3>
      </header>
      <!--  -->
      <main class="flex flex-col py-2 px-5 border-b border-t gap-2 border-gray-200">
        <div class="flex items-center gap-4 py-2">
          <label
            for="shortName"
            class="block text-sm font-medium text-gray-700 h-5 flex-shrink-0"
          >
              {{ $t('v1.form.title') }}
          </label>
          <input
          v-model="name_branch"
            type="text"
            id="shortName"
            :placeholder="$t('v1.form.title_placeholder')"
            class="h-9 w-full border border-gray-300 bg-slate-100 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <!--  -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <IconPapers class="w-5 h-5 flex-shrink-0"></IconPapers>
            <p class="text-sm font-medium">{{ $t('v1.setting.daily_working_time') }}</p>
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
        <!-- Vòng lặp qua mảng -->
        <div class="pl-8 overflow-hidden ">
          <div
            v-for="(day, index) in LIST_DAYS"
            :key="index"
            class="flex flex-col text-sm border-b border-slate-200 items-center py-3 md:justify-between text-customDark md:flex-row  last:border-none"
          >
            <div
              class="h-9 flex sm:pb-0 pb-4 w-full items-center justify-between"
            >
              <div class="sm: flex">
                <div class="sm:w-32 flex-none py-2 pr-3 font-medium sm:pr-0">
                  {{ $t(day.title_key) }}
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
                v-if="day.active"
                v-model="day.status"
                class="outline-none  mr-0 h-9 w-34 flex flex-none sm:hidden rounded-md border px-3 py-1.5"
              >
                <option value="permanent">{{ $t('v1.setting.fixed') }}</option>
                <option value="not_fixed">{{ $t('v1.setting.not_fixed') }}</option>
              </select>
            </div>
            <!--  -->
            <div
            :class="{ 'gap-1': !day.active , 'gap-4': day.active  }"
              class="h-9 text-sm text-black flex flex-col  flex-1 flex-shrink-0  items-center sm:flex-row sm:justify-end"
            >
              <div class="flex items-center flex-shrink-0 gap-4">
                <!-- giờ làm -->
                <p class="flex-shrink-0 hidden sm:flex">
                  {{ day.active ? $t('v1.setting.work_hours') : $t('v1.setting.day_off') }}
                </p>
                <!-- cố định -->
                <select
                  v-if="day.active"
                  v-model="day.status"
                  class="outline-none bg-slate-100 mr-0 h-9  w-34  flex-none hidden sm:flex rounded-md border px-3 py-1.5"
                >
                  <option value="permanent">{{ $t('v1.setting.fixed') }}</option>
                  <option value="not_fixed">{{ $t('v1.setting.not_fixed') }}</option>
                </select>
              </div>
              <!--  -->
              <!--từ  -->
              <div v-if="day.status === 'permanent'"  class="flex  items-center flex-shrink-0 gap-4  ">
                <p
                  v-if="day.active && day.status === 'permanent'"
                  class="text-center flex-shrink-0"
                >
                  {{ $t('v1.setting.from') }}
                </p>
                <!-- giờ bắt đầu -->
                <div v-if="day.active && day.status === 'permanent'" class="">
                  <select
                    v-model="day.checkin.hour"
                    id="from-time"
                    class="mr-0 flex bg-slate-100 h-9 w-22.5 rounded-md border px-3 py-2"
                  >
                    <option value="7">9:00</option>
                    <option value="8">8:00</option>
                    <option value="9">7:00</option>
                    <!-- Add more options as needed -->
                  </select>
                </div>
              </div>

              <!--  -->

              <div v-if="day.status === 'permanent'"  class="flex items-center flex-shrink-0 gap-4">
                <!--Nghỉ  -->
                <p
                  v-if="day.active && day.status === 'permanent'"
                  class="text-center"
                >
                  {{ $t('v1.setting.break') }}
                </p>
                <!-- thời gian nghỉ trưa -->
                <div v-if="day.active && day.status === 'permanent'" class="">
                  <select
                    v-model="day.lunch_break"
                    id="from-time"
                    class="mr-0 flex bg-slate-100 h-9 w-34 items-center rounded-md border px-3 py-1"
                  >
                    <option value="90 phút">1 {{ $t('v1.setting.hour') }} 30 {{ $t('v1.setting.minute') }}</option>
                    <option value="0">0 {{ $t('v1.setting.hour') }}</option>
                    <!-- Add more options as needed -->
                  </select>
                </div>
              </div>
              <!--  -->

              <!--đến  -->
              <div v-if="day.status === 'permanent'"  class="flex items-center flex-shrink-0 gap-4">
                <p
                  v-if="day.active && day.status === 'permanent'"
                  class="text-center"
                >
                  {{ $t('v1.setting.to') }}
                </p>
                <!-- thời gian kết thúc -->
                <div v-if="day.active && day.status === 'permanent'">
                  <select
                    v-model="day.checkout.hour"
                    id="from-time"
                    class="mr-0 flex bg-slate-100 h-9 w-22.5 rounded-md border px-3 py-2"
                  >
                    <option value="1730">17:30</option>
                    <option value="1800">18:00</option>
                    <option value="1830">18:30</option>
                    <!-- Add more options as needed -->
                  </select>
                </div>
              </div>
              <!--  -->
              <div class="flex items-center flex-shrink-0 gap-4">
                <!-- số giờ làm  -->
                <p
                  v-if="day.active && day.status === 'permanent'"
                  class="text-center flex-shrink-0"
                >
                  {{ $t('v1.setting.working_hours') }}
                </p>
                <p
                  v-if="day.active && day.status === 'not_fixed'"
                  class="text-center flex-shrink-0"
                >
                  {{ $t('v1.setting.select_working_hours') }}
                </p>
                <!-- icon -->
                <IconNext
                  v-if="day.active"
                  class="w-3.5 h-5 flex-shrink-0"
                ></IconNext>
                <!-- tổng số giờ làm -->
                <div v-if="day.active">
                  <select
                    v-model="day.work_status"
                    id="from-time"
                   
                    class="mr-0 bg-slate-100 flex h-9 w-34 rounded-md border px-3 py-1"
                  >
                    <option value="full_time">8 {{ $t('v1.setting.hour') }}</option>
                    <option value="part_morning">3 {{ $t('v1.setting.hour') }} 30 {{ $t('v1.setting.minute') }}</option>
                    <option value="part_afternoon">4 {{ $t('v1.setting.hour') }} 30 {{ $t('v1.setting.minute') }}</option>
                    <!-- Add more options as needed -->
                  </select>
                </div>
              </div>
              <!--  -->
              <!-- select -->
              <label
                class="hidden sm:inline-flex h-9 items-center cursor-pointer"
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
            <!--  -->
          </div>
        </div>
      </main>
      <!--  -->
      <footer class="flex items-center justify-end px-6 py-3">
        <button
        @click="handleOk"
          class="px-4 text-sm font-medium text-customDark py-2 bg-slate-200 rounded-md"
        >
          {{ $t('v1.common.close') }}
        </button>

        
      </footer>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

/**ICon*/
import IconEmployee from "@/components/icons/iconMenu/IconEmployee.vue";
import IconTicks from "@/components/icons/IconTicks.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
import IconPapers from "@/components/icons/IconPapers.vue";
import IconNext from "@/components/icons/IconNext.vue";

/**img*/
import avarta from "@/assets/imgs/Avatar.png";
/**Biến*/
/**Danh sách */
const list_employee = ref([
  {
    working_form: "sale",
    name_create_holiday: "Nguyễn Đình Tùng",
    avatar_employee: avarta,
    time_create_holiday: "10:00 - 12/4/2024",
    wage_employee: "5.100.000",
  },
  {
    working_form: "sale",
    name_create_holiday: "Nguyễn Đình Tùng",
    avatar_employee: avarta,
    time_create_holiday: "10:00 - 12/4/2024",
    wage_employee: "5.100.000",
  },
  {
    working_form: "sale",
    name_create_holiday: "Nguyễn Đình Tùng",
    avatar_employee: avarta,
    time_create_holiday: "10:00 - 12/4/2024",
    wage_employee: "5.100.000",
  },
]);
/***Danh sách ngày*/ 
const list_day = ref([1, 2, 3, 4, 5, 6, 7, "C"]);
/**biến*/
const active = ref(true);
/**Biến*/
const name_branch= ref("full_time_sales")
/**danh sách thứ*/ 
const LIST_DAYS = [
  {
    active: true,

    lunch_break: "90 phút",
    status: "permanent",
    checkin: {
      hour: 8,
    },
    checkout: {
      hour: 1730,
    },
    title_key: "v1.day.mon_short",
    work_status: "full_time",
  },
  {
    active: true,

    lunch_break: "0 phút",
    status: "not_fixed",
    checkin: {
      hour: 8,
    },
    checkout: {
      hour: 1730,
    },
    title_key: "v1.day.tue_short",
    work_status: "part_morning",
  },
  {
    active: true,

    lunch_break: "90 phút",
    status: "permanent",
    checkin: {
      hour: 8,
    },
    checkout: {
      hour: 1730,
    },
    title_key: "v1.day.wed_short",
    work_status: "full_time",
  },
  {
    active: true,

    lunch_break: "90 phút",
    status: "permanent",
    checkin: {
      hour: 8,
    },
    checkout: {
      hour: 1730,
    },
    title_key: "v1.day.thu_short",
    work_status: "full_time",
  },
  {
    active: true,

    lunch_break: "90 phút",
    status: "permanent",
    checkin: {
      hour: 8,
    },
    checkout: {
      hour: 1730,
    },
    title_key: "v1.day.fri_short",
    work_status: "full_time",
  },
  {
    active: true,

    lunch_break: "0",
    status: "permanent",
    checkin: {
      hour: 8,
      minute: 0,
    },
    checkout: {
      hour: 1730,
      minute: 0,
    },
    title_key: "v1.day.sat_short",
    work_status: "part_morning",
  },
  {
    active: false,
    status: "permanent",
    checkin: {
      hour: 8,
      minute: 0,
    },
    checkout: {
      hour: 18,
      minute: 0,
    },
    title_key: "v1.day.sunday",
    work_status: "day_off",
  },
];
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
