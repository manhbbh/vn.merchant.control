<template>
  <div
    class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconCalendar class="w-5 h-5 flex-shrink-0"></IconCalendar>
    <!--content  -->
    <div class="flex flex-col gap-2.5 w-full">
      <div class="flex h-9 items-start justify-between">
        <h4 class="flex justify-start text-sm font-medium">Nghỉ lễ</h4>
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
            <th class="w-18 px-2 text-left font-semibold">ID|Ngày</th>
            <th class="w-50 text-left font-semibold">Tiêu đề</th>
            <th class="w-25 text-center font-semibold">Ngày lễ</th>
            <th class="w-50 text-left font-semibold hidden md:table-cell">
              Người tạo
            </th>
            <th class="w-25 text-center sm:text-left font-semibold">Xóa</th>
            <th
              class="w-[170px] text-left font-semibold hidden md:table-cell"
            ></th>
          </tr>
        </thead>
        <!--  -->
        <tbody>
          <tr
            v-for="(holiday, index) in Object.keys(
              holidays?.setting_data || {}
            )"
            :key="index"
            class="hover:bg-slate-100 text-black h-15 cursor-pointer text-sm border-b border-gray-200 overflow-y-auto"
          >
            <!-- stt-->
            <td class="py-2 text-left items-start justify-center">
              <p class="flex px-4 text-blue-500 font-semibold">
                {{ index + 1 }}
              </p>
            </td>
            <!-- Tiêu đề -->
            <td class="text-left py-2 items-center">
              <p class="inline-flex">
                {{ holidays?.setting_data?.[holiday]?.name }}
              </p>
            </td>

            <!-- Ngày lễ -->
            <td class="font-medium py-2">
              <p class="fex items-center">{{ holiday }}</p>
            </td>

            <!-- Người tạo -->
            <td
              class="text-left py-2 text-customGray flex-col text-15px hidden md:flex"
            >
              <div class="flex items-center gap-1 h-5">
                <img
                  class="h-4 w-4 rounded-full"
                  :src="getInfo(holidays?.setting_data?.[holiday]?.created_by)"
                  alt=""
                />
                <!--  -->
                <div class="flex gap-1 items-end justify-between">
                  <p class="text-sm">
                    {{ getInfo(holidays?.setting_data?.[holiday]?.created_by,'name') }}
                  </p>
                  <IconTicks class="w-4 h-4"></IconTicks>
                </div>
              </div>
              <!--  -->
              <div class="h5 flex ml-5 items-center justify-start">
                <p v-if="holidays?.setting_data?.[holiday]?.created_time">
                  {{
                    format(
                      holidays?.setting_data?.[holiday]?.created_time as Date,
                      'HH:mm - dd/MM/yyyy'
                    )
                  }}
                </p>
              </div>
            </td>

            <!-- xóa -->
            <td class="text-center sm:text-left py-2">
              <div
                class="h-5 inline-flex text-red-500 bg-red-50 font-medium text-xs rounded-md px-2 py-0.5 items-center justify-center"
              >
                Xóa
              </div>
            </td>
            <!-- stt-->
            <td
              class="py-2 text-left px-3 w-18 items-center justify-center hidden md:flex"
            ></td>
          </tr>
        </tbody>
      </table>
      <!--  -->
      <div class="flex flex-col gap-4 sm:flex-row">
        <!-- Ngày thành lập-->
        <div class="flex text-left h-9 items-center gap-4">
          <label
            for="taxCode"
            class="block text-sm font-medium flex-shrink-0 texet-black px-1"
          >
            Tiêu đề
          </label>
          <input
            class="border border-gray-300 px-3 rounded-md w-67 h-9"
            placeholder="Nhập tiêu đề ngày nghỉ"
            type="text"
          />
        </div>
        <!-- Ngày thành lập-->
        <div class="flex text-lefth-9 items-center gap-7 sm:gap-4">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 px-1 h-5.5"
          >
            Ngày
          </label>
          <VueDatePicker
            class="iconHidden w-full sm:w-39 sm:h-9"
            v-model="date"
            placeholder="Chọn ngày"
            auto-apply
            :enable-time-picker="false"
          />
        </div>

        <!--  -->
        <button
          class="h-9 bg-green-600 text-sm font-medium text-white rounded-md px-4 py-2"
        >
          Lưu
        </button>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores'

// * libraries
import { ref } from 'vue'
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'

/**Icon*/
import IconTicks from '@/components/icons/IconTicks.vue'
import IconCalendar from '@/components/icons/IconCalendar.vue'

// * store
const commonStore = useCommonStore()
const { holidays, employees } = storeToRefs(commonStore)

/**Biến*/
const date = ref(new Date())

function getInfo(id?: string, type?:string) {
  if(!id) return

  /** thông tin nhân viên */
  const EMPLOYEE = employees.value?.[id]

  if(type === 'name')
    return `${EMPLOYEE?.first_name || ''} ${EMPLOYEE?.last_name || ''}`?.trim()

  return EMPLOYEE?.avatar
}
</script>
