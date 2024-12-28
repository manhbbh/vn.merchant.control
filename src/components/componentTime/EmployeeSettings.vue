<template>
  <div
    class="py-3 px-2 sm:px-4 border border-gray-200 rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconEmployee class="w-5 h-5"></IconEmployee>
    <!--content  -->
    <div class="flex-col flex-1 gap-3">
      <div class="flex h-5 items-center mb-3">
        <h4 class="flex justify-start text-sm font-medium">Nhân sự</h4>
      </div>
      <!-- phần các ô input  -->
      <!--  -->
      <table
        class="min-w-full table-fixed border-none bg-white rounded-lg z-10"
      >
        <thead
          class="bg-slate-200 h-7 text-xs font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
        >
          <tr class="h-7">
            <th class="w-18 text-center font-semibold">ID|Ngày</th>
            <th class="w-40 text-left font-semibold">Nhân sự</th>
            <th class="w-20 text-left font-semibold hidden md:table-cell">
              Hình thức làm việc
            </th>
            <th class="w-42 text-left font-semibold hidden md:table-cell">
              Lương P1
            </th>
            <th class="w-50 text-left font-semibold hidden md:table-cell">
              Cập nhật lần cuối
            </th>
            <th class="w-100 text-left font-semibold hidden md:table-cell"></th>
          </tr>
        </thead>
        <!--  -->
        <tbody>
          <tr
            v-for="(holiday, index) in list_employee"
            :key="index"
            class=" last:border-0 text-black h-15 cursor-pointer text-sm border-b border-gray-200 overflow-y-auto"
          >
            <!-- stt-->
            <td class="text-center items-start justify-center">
              <p class="flex px-4 text-blue-500 justify-center font-semibold">
                {{ index + 1 }}
              </p>
            </td>
            <!-- nhân sự -->
            <td class="text-left py-2 text-customGray hidden md:table-cell">
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

            <!-- hình thức làm việc -->
            <td class="text-center hidden md:table-cell font-medium py-2">
              <!-- select -->
              <div class="relative w-full flex justify-start sm:w-50">
                <select
                v-model="holiday.working_form"
                  class="appearance-none h-10 text-black outline-none sm:w-50 text-sm rounded-md border border-slate-300 px-7 sm:px-3 py-2"
                >
                  <option value="sale" class="text-sm">
                    Toàn thời gian -Sales
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
            <!-- Lương p1 -->
            <td class="text-left font-medium py-2 hidden md:table-cell">
              <div
                class="flex w-42 items-center border border-gray-300 h-9 py-2 rounded-md"
              >
                <input
                  type="text"
                  class="outline-none  text-customDark pl-3 w-25 text-sm"
                  placeholder=""
                  v-model="holiday.wage_employee"
                />
                <div
                  class="border-l w-8 border-gray-300 text-muted flex items-center justify-center h-9"
                >
                  đ
                </div>
              </div>
            </td>

            <!-- cập nhật lần cuối -->
            <td class="text-left py-2 text-customGray hidden md:table-cell">
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

            <!-- stt-->
            <td class="text-left py-2 hidden md:table-cell"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

/**ICon*/
import IconEmployee from "@/components/icons/iconMenu/IconEmployee.vue";
import IconTicks from "@/components/icons/IconTicks.vue";
import IconArrow from "@/components/icons/IconArrow.vue";

/**img*/
import avarta from "@/assets/imgs/Avatar.png";
/**Biến*/
/**Danh sách */
const list_employee = ref([
  {
    working_form:'sale',
    name_create_holiday: "Nguyễn Đình Tùng",
    avatar_employee: avarta,
    time_create_holiday: "10:00 - 12/4/2024",
    wage_employee: '5.100.000',
  },
  {
    working_form:'sale',
    name_create_holiday: "Nguyễn Đình Tùng",
    avatar_employee: avarta,
    time_create_holiday: "10:00 - 12/4/2024",
    wage_employee: '5.100.000',
  },
  {
    working_form:'sale',
    name_create_holiday: "Nguyễn Đình Tùng",
    avatar_employee: avarta,
    time_create_holiday: "10:00 - 12/4/2024",
    wage_employee: '5.100.000',
  },
]);
const list_day = ref([1, 2, 3, 4, 5, 6, 7, "C"]);
</script>

<style lang="scss" scoped></style>
