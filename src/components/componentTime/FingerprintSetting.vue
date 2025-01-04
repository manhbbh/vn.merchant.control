<template>
  <div
    class="py-3 px-2 sm:px-4 border border-gray-200 rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconFingerprint class="w-5 h-5 flex-shrink-0"></IconFingerprint>
    <!--content  -->
    <div class="flex-col flex-1 gap-3">
      <div class="flex h-9 items-center justify-between mb-3">
        <h4 class="flex justify-start text-sm font-medium">Vân tay</h4>
        <button
          class="h-9 px-4 py-2 text-sm font-medium text-white rounded-md bg-black"
        >
          Thêm
        </button>
      </div>
      <!-- phần các ô input  -->
      <table
        class="min-w-full table-fixed border-none bg-white rounded-lg z-10"
      >
        <thead
          class="bg-slate-200 h-7 text-xs font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
        >
          <tr class="h-7 flex gap-x-12 items-center">
            <th class="w-18 text-center font-semibold">ID|Ngày</th>
            <th class="w-15 sm:w-25 text-left font-semibold">ID Thiết bi</th>
            <th class="w-25 text-left font-semibold hidden md:block">
              Trạng thái
            </th>
            <th class="w-50 text-left font-semibold hidden md:block">
              Nhân sự
            </th>
            <th class="w-10 sm:w-25 text-left font-semibold">Xóa</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(timekeeping, index) in list_employee"
            :key="index"
            class="flex items-center gap-x-12 text-black h-15 cursor-pointer text-sm border-b border-gray-200"
          >
            <!-- STT -->
            <td class="w-18 text-center items-start justify-center">
              <p class="flex px-4 text-blue-500 justify-center font-semibold">
                {{ index + 1 }}
              </p>
              <p>{{ timekeeping.dat_fingerprint }}</p>
            </td>

            <!-- id thiết bị -->
            <td class="w-15 sm:w-25 text-left py-2 text-customGray">
              <p>{{ timekeeping.id_device }}</p>
            </td>

            <!-- trạng thái -->
            <td class="w-25 text-left hidden md:block">
              <p class="text-green-500">{{ timekeeping.status_fing }}</p>
              <!--  -->
            </td>

            <!-- nhân sự -->
            <td class="w-50 text-left hidden md:block">
              <div class="flex items-center gap-1 h-5">
                <img
                  class="h-4 w-4 rounded-full"
                  :src="timekeeping.avatar_employee"
                  alt=""
                />
                <!--  -->
                <div class="flex gap-1 items-center justify-between">
                  <p class="text-sm">
                    {{ timekeeping.name_create_holiday }}
                  </p>
                </div>
              </div>
            </td>

            <!-- xóa -->
            <td class="w-10 sm:w-25 text-left py-2 text-customGray">
              <button
                class="px-2 py-0.5 bg-red-50 text-red-500 rounded-md text-xs font-medium"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!--  -->
      <!--  -->
      <div class="flex py-4 flex-col gap-4 sm:flex-row">
        <!-- Ngày thành lập-->
        <div class="flex text-left h-9 items-center gap-4">
          <label
            for="taxCode"
            class="block text-sm font-medium flex-shrink-0 texet-black px-1"
          >
            ID Thiết bị
          </label>
          <input
            class="border border-gray-300 px-3 rounded-md w-39 h-9"
            placeholder="Nhập ID thiết bị"
            type="text"
          />
        </div>
        <!-- Ngày thành lập-->
        <div class="flex text-lefth-9 items-center gap-7 sm:gap-4">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 px-1 h-5.5"
          >
            Nhân sự
          </label>
          <input
            type="text"
            class="outline-none text-muted border border-gray-300 h-9 w-39 p-2 rounded-md"
            placeholder="Chọn nhân sự"
          />
        </div>

        <!--  -->
        <button
          class="h-9 bg-green-600 text-sm font-medium text-white rounded-md px-4 py-2"
        >
          Thêm
        </button>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/**ICon*/
import IconFingerprint from '@/components/icons/iconMenu/IconFingerprint.vue'

/**img*/
import avarta from '@/assets/imgs/Avatar.png'
/**Biến*/
/**Danh sách */
const list_employee = ref([
  {
    working_form: 'sale',
    dat_fingerprint: '28/4',
    id_device: 'D123',
    name_create_holiday: 'Nguyễn Đình Tùng',
    avatar_employee: avarta,
    status_fing: 'Đã kích hoạt',
  },
  {
    working_form: 'sale',
    dat_fingerprint: '28/4',
    id_device: 'D123',
    name_create_holiday: 'Nguyễn Đình Tùng',
    avatar_employee: avarta,
    status_fing: 'Đã kích hoạt',
  },
  {
    working_form: 'sale',
    dat_fingerprint: '28/4',
    id_device: 'D123',
    name_create_holiday: 'Nguyễn Đình Tùng',
    avatar_employee: avarta,
    status_fing: 'Đã kích hoạt',
  },
])
const list_day = ref([1, 2, 3, 4, 5, 6, 7, 'C'])
</script>

<style lang="scss" scoped></style>
