<template>
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
        <h3 class="h-6 text-lg font-semibold">
          {{ getInfo(employee_selected?.employee_id, 'name') }}
        </h3>
      </header>
      <!--  -->
      <main
        class="flex flex-col py-2 px-5 border-b border-t gap-2 border-gray-200"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="col-span-1 flex items-center gap-4 py-2">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5 flex-shrink-0"
            >
              Tiêu đề
            </label>
            <p
              class="w-full border border-gray-300 bg-slate-100 rounded-md px-4 py-2"
            >
              {{
                employee_selected?.working_time_id &&
                form_of_work[employee_selected.working_time_id]?.name
              }}
            </p>
          </div>
          <div class="col-span-1 flex items-center gap-4 py-2">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5 flex-shrink-0"
            >
              Lương P2
            </label>
            <p class="w-full border border-gray-300 bg-slate-100 rounded-md px-4 py-2">
              {{ currency(employee_selected?.salary_p2) }}
            </p>
          </div>
        </div>
        <!--  -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <IconPapers class="w-5 h-5 flex-shrink-0"></IconPapers>
            <p class="text-sm font-medium">Thời gian làm việc trong ngày</p>
          </div>
          <!-- select -->
          <!-- <Toggle v-model="form_of_work_selected?."/> -->
        </div>
        <!-- Vòng lặp qua mảng -->
        <div class="pl-8 overflow-hidden">
          <div
            v-for="(day, index) in form_of_work_selected?.working_time"
            :key="index"
            class="flex flex-col text-sm border-b border-slate-200 items-center py-3 md:justify-between text-customDark md:flex-row last:border-none"
          >
            <div
              class="h-9 flex sm:pb-0 pb-4 w-full items-center justify-between"
            >
              <div class="sm: flex">
                <div class="sm:w-32 flex-none py-2 pr-3 font-medium sm:pr-0">
                  {{ day.title }}
                </div>
                <!-- select -->
                <Toggle class="pointer-events-none lg:hidden" v-model="day.active"/>
              </div>
            </div>
            <!--  -->
            <div
              class="h-9 text-sm text-black flex flex-col gap-4 flex-1 flex-shrink-0 items-ceter sm:flex-row sm:justify-end"
            >
              <!-- tổng số giờ làm  -->
              <div class="flex items-center flex-shrink-0 gap-4">
                <!-- số giờ làm  -->
                <p v-if="day.active" class="text-center flex-shrink-0">
                  Số giờ làm
                </p>
                <!-- icon -->

                <!-- tổng số giờ làm -->
                <div v-if="day.active">
                  <p class="mr-0 bg-slate-100 flex w-34 rounded-md border px-3 py-2">
                    {{ day.working_hours }} giờ
                  </p>
                </div>
              </div>

              <!-- chủ động -->
              <div class="flex items-center flex-shrink-0 gap-4">
                <!-- phần trăm -->
                <p v-if="day.active" class="flex-shrink-0 hidden sm:flex">
                  Chủ động ({{ employee_selected.proactive_percent }}%)
                </p>
                <!-- giờ -->
                <p v-if="day.active" class="bg-slate-100 w-34 flex-none hidden sm:flex rounded-md border px-3 py-2">
                  {{ Number(employee_selected.proactive_percent || 0) * Number(day.working_hours || 0) / 100 }} giờ
                </p>
              </div>

              <!-- Bị động  -->
              <div class="flex items-center flex-shrink-0 gap-4">
                <!-- phần trăm -->
                <p v-if="day.active" class="text-center flex-shrink-0">
                  Bị động ({{ employee_selected.passive_percent }}%)
                </p>
                <!-- giờ -->
                <p v-if="day.active" class="bg-slate-100 w-34 flex-none hidden sm:flex rounded-md border px-3 py-2">
                  {{ Number(employee_selected.passive_percent || 0) * Number(day.working_hours || 0) / 100 }} giờ
                </p>
              </div>

              <div class="flex items-center flex-shrink-0 gap-4">
                <p v-if="!day.active" class="flex-shrink-0 hidden sm:flex">
                  Ngày nghỉ
                </p>
              </div>
              <!-- select -->
              <Toggle class="pointer-events-none hidden lg:inline-flex" v-model="day.active"/>
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
          Đóng
        </button>
      </footer>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { currency } from '@/service/helper/format'
import { useTimeboxingStore } from '@/stores/timeboxing'

// * libraries
import { storeToRefs } from 'pinia'
import { computed, PropType, ref } from 'vue'

// * components
import Toggle from '@/components/Toggle.vue'

// * icons
import IconPapers from '@/components/icons/IconPapers.vue'

// * interface
import { EmployeeSetting } from '@/service/interface'

// * prop
const props = defineProps({
  employee_selected: {
    type: Object as PropType<EmployeeSetting>,
    required: true,
  },
})

// * store
const { business_employees_ids, form_of_work } = storeToRefs(
  useTimeboxingStore()
)

/**Biến mở đóng modal*/
const open = defineModel({
  default: false,
})

/** dữ liệu hình thức làm việc đã chọn */
const form_of_work_selected = computed(()=>{
  if(props.employee_selected.working_time_id)
  return form_of_work.value[props.employee_selected.working_time_id]
})

/**Hàm đóng modal*/
function handleOk() {
  open.value = false
}

/** Lấy thông tin nhân viên */
function getInfo(id?: string, type?: string) {
  if (!id) return

  /** thông tin nhân viên */
  const EMPLOYEE = business_employees_ids.value?.[id]

  if (type === 'name')
    return `${EMPLOYEE?.first_name || ''} ${EMPLOYEE?.last_name || ''}`?.trim()

  return EMPLOYEE?.avatar
}
</script>
