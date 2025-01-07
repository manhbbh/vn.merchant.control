<template>
  <div
    class="py-3 px-2 sm:px-4 border border-gray-200 rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconEmployee class="w-5 h-5 flex-shrink-0"></IconEmployee>
    <!--content  -->
    <div class="flex-col flex-1 gap-3 w-full overflow-hidden">
      <div class="flex items-center mb-3 justify-between">
        <h4 class="flex justify-start text-sm font-medium">Nhân sự</h4>
        <button
          class="bg-black text-white py-2 px-4 rounded-md"
          @click="handleOpenForm()"
        >
          Thêm
        </button>
      </div>
      <!-- phần các ô input  -->
      <div
        class="w-full max-h-[50dvh] lg:max-h-[60dvh] overflow-y-auto overflow-x-hidden"
      >
        <table
          class="min-w-full table-fixed border-none bg-white rounded-lg z-10"
        >
          <thead
            class="bg-slate-200 h-7 text-xs font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
          >
            <tr class="h-7 flex gap-x-4 items-center">
              <th class="w-18 text-center font-semibold">ID|Ngày</th>
              <th class="w-45 text-left font-semibold">Nhân sự</th>
              <th class="w-50 text-left font-semibold hidden md:block">
                Hình thức làm việc
              </th>
              <th class="w-42 text-left font-semibold hidden md:block">
                Lương P2
              </th>
              <th class="w-25 sm:w-25 text-left font-semibold hidden md:block">
                Chủ động
              </th>
              <th class="w-25 sm:w-25 text-left font-semibold hidden md:block">
                Bị động
              </th>
              <th class="w-50 text-left font-semibold hidden md:block">
                Cập nhật lần cuối
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="i in 5">
              <tr
                v-for="(holiday, index) in employee_setting"
                :key="index"
                class="flex items-center gap-x-4 text-black h-15 cursor-pointer text-sm border-b border-gray-200"
              >
                <!-- STT -->
                <td class="w-18 text-center items-start justify-center">
                  <p
                    class="flex px-4 text-blue-500 justify-center font-semibold"
                  >
                    {{ index + 1 }}
                  </p>
                </td>

                <!-- nhân sự -->
                <!-- @click="showModal(holiday)" -->
                <td class="w-45 text-left py-2 text-customGray">
                  <div class="flex w-full items-center gap-1 h-5">
                    <Avatar
                      :src="getInfo(holiday.employee_id, 'avatar')"
                      :text="getInfo(holiday.employee_id, 'name') || ''"
                    />
                    <!--  -->
                    <div class="flex gap-1 items-center justify-between">
                      <p class="text-sm">
                        {{ getInfo(holiday.employee_id, 'name') || '' }}
                      </p>
                      <IconTicks class="w-4 h-4"></IconTicks>
                    </div>
                  </div>
                  <!--  -->
                  <div
                    class="flex gap-1 ml-5 h-2.5"
                    v-if="holiday.working_time_id"
                  >
                    <p
                      v-for="(time, index) in form_of_work?.[
                        holiday.working_time_id
                      ]?.working_time"
                      :class="{
                        'bg-green-500':
                          Number(time?.working_hours || 0) >= 5 && time?.active,
                        'bg-orange-500':
                          Number(time?.working_hours || 0) < 5 && time?.active,
                        'bg-slate-500': !time?.active,
                      }"
                      class="w-2.5 text-ss text-white flex items-center justify-center h-2.5 rounded-full"
                      v-tooltip="
                        !time?.active
                          ? 'Nghỉ'
                          : Number(time?.working_hours || 0) >= 5
                          ? 'Toàn thời gian'
                          : 'Bán thời gian'
                      "
                    >
                      {{ index < 6 ? index + 2 : 'C' }}
                    </p>
                  </div>
                </td>

                <!-- Hình thức làm việc -->
                <td class="w-52 text-left hidden md:block">
                  <!-- select -->
                  <SelectTimeWorking v-model="holiday.working_time_id" />
                </td>

                <!-- Lương P1 -->
                <td class="w-42 text-left hidden md:block">
                  <Cleave
                    v-model="holiday.salary_p2"
                    :options="cleave_options"
                    class="w-full px-3 py-2 outline-none border rounded-md placeholder:text-slate-500"
                  />
                </td>
                <!-- chủ động -->
                <td class="w-25 text-left hidden md:block">
                  <div
                    class="flex items-center border border-gray-300 h-9 py-2 rounded-md"
                  >
                    <input
                      @input="(e:Event) => {
                      const VALUE = Number(holiday.proactive_percent || 0)
                      if(VALUE > 100 ) holiday.proactive_percent = 100
                      if(VALUE < 0 ) holiday.proactive_percent = 0
                    }"
                      @change="
                        () => {
                          holiday.passive_percent =
                            100 - Number(holiday.proactive_percent || 0)
                        }
                      "
                      type="text"
                      class="outline-none text-customDark pl-3 w-full text-sm"
                      v-model="holiday.proactive_percent"
                    />
                    <div
                      class="border-l border-gray-300 text-muted flex-shrink-0 flex items-center justify-center w-9 h-9"
                    >
                      %
                    </div>
                  </div>
                </td>
                <!-- bị đọng -->
                <td class="w-25 text-left hidden md:block">
                  <div
                    class="flex bg-slate-100 items-center border border-gray-300 h-9 py-2 rounded-md"
                  >
                    <input
                      type="text"
                      class="outline-none text-customDark pl-3 bg-slate-100 w-full text-sm"
                      v-model="holiday.passive_percent"
                    />
                    <div
                      class="border-l border-gray-300 text-muted flex-shrink-0 flex items-center justify-center w-9 h-9"
                    >
                      %
                    </div>
                  </div>
                </td>

                <!-- xóa -->
                <td class="w-50 text-left py-2 text-customGray hidden md:block">
                  <div class="flex items-center gap-1 h-5">
                    <!--  -->
                    <div class="flex gap-1 items-center justify-between">
                      <p class="text-sm">
                        {{ getInfo(holiday.updated_by, 'name') || '' }}
                      </p>
                      <IconTicks class="w-4 h-4"></IconTicks>
                    </div>
                  </div>
                  <!--  -->
                  <div class="h5 flex ml-5 text-xs items-center justify-start">
                    <p v-if="holiday.updated_time">
                      {{ format(holiday.updated_time, 'HH:mm - dd/MM/yyyy') }}
                    </p>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!--  -->
      <div
        class="overflow-hidden text-start py-4 flex lg:grid flex-col grid-cols-3 gap-2 lg:gap-4 w-full flex-wrap"
        v-if="is_show_form"
      >
        <div class="flex gap-2 lg:gap-4 items-center w-full">
          <label class="font-medium min-w-32">Nhân sự</label>
          <SelectEmployee
            class="w-full"
            v-model="employee_form.employee_id"
            :list_employees_added="list_employees_added"
          />
        </div>
        <div class="flex gap-2 lg:gap-4 items-center w-full">
          <label class="font-medium min-w-32">Hình thức làm việc</label>
          <SelectTimeWorking
            class="w-full"
            v-model="employee_form.working_time_id"
          />
        </div>
        <div class="flex gap-2 lg:gap-4 items-center w-full">
          <label class="font-medium min-w-32">Lương P2</label>
          <cleave
            v-model="employee_form.salary_p2"
            :options="cleave_options"
            placeholder="Nhập lương P2"
            class="w-full px-3 py-2 outline-none border rounded-md placeholder:text-slate-500"
          />
        </div>

        <div class="flex gap-2 lg:gap-4 items-center w-full">
          <label class="font-medium min-w-32">Chủ động</label>
          <input
            class="w-full px-3 py-2 outline-none border rounded-md placeholder:text-slate-500"
            v-model="employee_form.proactive_percent"
            type="number"
            placeholder="Nhập thời gian chủ động"
          />
        </div>

        <button
          class="lg:w-fit bg-green-500 text-white rounded-md py-2 px-4 hover:shadow-md"
          @click="addEmployee()"
        >
          Thêm nhân sự
        </button>
      </div>
    </div>
    <!-- Modal xem chi tiết -->
    <ModalDetailEmployeeSetting
      v-model="open"
      :employee_selected="employee_selected"
    />
  </div>
</template>

<script setup lang="ts">
import { useTimeboxingStore } from '@/stores/timeboxing'

// * libraries
import { computed, ref } from 'vue'
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'
import Cleave from 'vue-cleave-component'

// * components
import Avatar from '@/components/avartar/Avatar.vue'
import SelectTimeWorking from '@/components/select/SelectTimeWorking.vue'
import ModalDetailEmployeeSetting from '@/components/componentSeup/ModalDetailEmployeeSetting.vue'

/**ICon*/
import IconEmployee from '@/components/icons/iconMenu/IconEmployee.vue'
import IconTicks from '@/components/icons/IconTicks.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import { EmployeeSetting } from '@/service/interface'
import SelectEmployee from '../select/SelectEmployee.vue'

/** Cấu hình cleave */
const cleave_options = {
  numeral: true,
  numeralThousandsGroupStyle: 'thousand',
  numeralDecimalMark: ',',
  delimiter: '.',
  prefix: '',
  noImmediatePrefix: true,
  rawValueTrimPrefix: true,
}

// * store
const timeboxing_store = useTimeboxingStore()
const { employee_setting, business_employees_ids, form_of_work } =
  storeToRefs(timeboxing_store)

/** ẩn hiện form thêm mới nhân viên */
const is_show_form = ref(false)

/** form dữ liệu thêm nhân viên */
const employee_form = ref<EmployeeSetting>({})

/**Biến mở đóng modal*/
const open = ref(false)

/** dữ liệu nhân viên được chọn */
const employee_selected = ref<EmployeeSetting>({})

/** các nhân viên đã thêm */
const list_employees_added = computed(() => {
  return employee_setting.value.reduce(
    (acc: { [key: string]: boolean }, item) => {
      if (item.employee_id) {
        acc[item.employee_id] = true
      }
      return acc
    },
    {}
  )
})

/** Lấy thông tin nhân viên */
function getInfo(id?: string, type?: string) {
  if (!id) return

  /** thông tin nhân viên */
  const EMPLOYEE = business_employees_ids.value?.[id]

  if (type === 'name')
    return `${EMPLOYEE?.first_name || ''} ${EMPLOYEE?.last_name || ''}`?.trim()

  return EMPLOYEE?.avatar
}

/** thêm nhân sự */
function addEmployee() {
  employee_setting.value = [
    ...employee_setting.value,
    {
      ...employee_form.value,
      passive_percent: 100 - Number(employee_form.value.proactive_percent || 0),
    },
  ]

  is_show_form.value = false
}

/** hàm mở form thêm nhân sự */
function handleOpenForm() {
  is_show_form.value = true
  employee_form.value = {
    employee_id: '',
    working_time_id: '',
    salary_p2: 0,
    passive_percent: 0,
    proactive_percent: 0,
    paying_when_rejected: true,
    updated_by: timeboxing_store.profile?._id,
    updated_time: new Date(),
  }
}

/**Hàm mở modal*/
function showModal(data: EmployeeSetting) {
  open.value = true
  employee_selected.value = data
}
</script>
