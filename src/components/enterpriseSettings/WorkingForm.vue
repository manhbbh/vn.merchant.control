<template>
  <div
    class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconPapers class="w-5 h-5 flex-shrink-0"></IconPapers>
    <!--content  -->
    <div class="flex flex-col gap-2.5 w-full">
      <div class="flex h-9 items-start justify-between">
        <h4 class="flex justify-start text-sm font-medium">
          Hình thức làm việc
        </h4>
        <div class="flex items-center gap-1 sm:gap-2.5">
          <button
            class="text-sm font-medium text-slate-500 h-9 px-0 sm:px-6 sm:py-2"
            @click="reset()"
          >
            Khôi phục mặc định
          </button>
          <button
            class="h-9 w-18 text-sm font-medium text-white rounded-md bg-black"
            @click="showModal()"
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
            <th class="w-30 text-left font-semibold">Tiêu đề</th>
            <th class="w-25 text-center font-semibold hidden md:table-cell">
              Số giờ làm / Tuần
            </th>
            <th class="w-25 text-left font-semibold hidden md:table-cell">
              Thời gian
            </th>
            <th class="w-30 text-left font-semibold hidden md:table-cell">
              Người tạo
            </th>
            <th class="w-25 text-center font-semibold">Thao tác</th>
            <th class="w-25 text-left font-semibold hidden md:table-cell"></th>
          </tr>
        </thead>
        <!--  -->
        <tbody>
          <tr
            v-for="(holiday, index) in Object.keys(
              form_of_work?.setting_data || {}
            )"
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
              <p class="inline-flex">
                {{ form_of_work?.setting_data?.[holiday]?.name }}
              </p>
            </td>

            <!-- số giờ làm -->
            <td class="text-center hidden md:table-cell font-medium py-2">
              <p>{{ form_of_work?.setting_data?.[holiday]?.working_hours }}</p>
            </td>
            <!-- Thời gian -->
            <td class="text-left font-medium py-2 hidden md:table-cell">
              <!-- <p v-for="time in list_day">{{ time}}</p> -->
              <div class="flex gap-1">
                <p
                  v-for="(time, index) in form_of_work?.setting_data?.[holiday]
                    ?.working_time"
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

            <!-- Người tạo -->
            <td class="text-left py-2 text-customGray hidden md:table-cell">
              <div class="flex items-center gap-1 h-5">
                <Avatar
                  class="w-4 h-4"
                  :src="
                    getInfo(form_of_work?.setting_data?.[holiday]?.created_by)
                  "
                  :text="
                    getInfo(
                      form_of_work?.setting_data?.[holiday]?.created_by,
                      'name'
                    ) || ''
                  "
                ></Avatar>
                <!--  -->
                <div class="flex gap-1 items-end justify-between">
                  <p class="text-sm">
                    {{
                      getInfo(
                        form_of_work?.setting_data?.[holiday]?.created_by,
                        'name'
                      )
                    }}
                  </p>
                  <IconTicks class="w-4 h-4"></IconTicks>
                </div>
              </div>
              <!--  -->
              <div class="h5 flex ml-5 items-center justify-start text-xs">
                <p v-if="form_of_work?.setting_data?.[holiday]?.created_time">
                  {{
                    format(
                      form_of_work?.setting_data?.[holiday]
                        ?.created_time as Date,
                      'HH:mm - dd/MM/yyyy'
                    )
                  }}
                </p>
              </div>
            </td>

            <!-- Thao tác -->
            <td class="text-center py-2">
              <div class="flex gap-1 sm:gap-2.5 justify-center">
                <button
                  @click="
                    showModal(form_of_work?.setting_data?.[holiday], holiday)
                  "
                  class="h-5 w-14.5 text-xs font-medium text-white rounded-md bg-blue-700"
                >
                  Cài đặt
                </button>
                <div
                  class="h-5 inline-flex text-red-500 bg-red-50 font-medium text-xs rounded-md px-2 py-0.5 items-center justify-center"
                  @click="handleDelete(`${holiday}`)"
                >
                  Xóa
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
      <header class="flex items-center justify-between h-10 px-6 py-2">
        <h3 class="h-6 text-base font-semibold">Hình thức làm việc</h3>
        <button
          @click="open = false"
          class="p-1 rounded-md hover:bg-gray-300 hover:text-black"
        >
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
            v-model="form_of_work_value.name"
            id="shortName"
            placeholder="Nhập tiêu đề"
            class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <!--  -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <IconPapers class="w-5 h-5 flex-shrink-0"></IconPapers>
            <p class="text-sm font-medium">Thời gian làm việc trong ngày</p>
          </div>
          <!-- select -->
          <!-- <Toggle /> -->
        </div>
        <!-- Vòng lặp qua mảng -->
        <div class="pl-8 overflow-hidden">
          <div
            v-for="(day, index) in form_of_work_value.working_time"
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
                <Toggle v-model="day.active" class="sm:hidden" />
              </div>
              <select
                v-model="day.work_status"
                class="outline-none mr-0 h-9 w-34 flex flex-none sm:hidden rounded-md border px-3 py-1.5"
              >
                <option value="full_time">Cố định</option>
                <option value="part_time">Không cố định</option>
              </select>
            </div>
            <!--  -->
            <div
              class="h-9 text-sm text-black flex flex-colflex-1 flex-shrink-0 items-center sm:flex-row sm:justify-end"
              :class="{ 'gap-1': !day.active, 'gap-4': day.active }"
            >
              <div class="flex items-center flex-shrink-0 gap-4">
                <!-- giờ làm -->
                <p class="flex-shrink-0 hidden sm:flex">
                  {{ day.active ? 'Giờ làm' : 'Ngày nghỉ' }}
                </p>
                <!-- cố định -->
                <select
                  v-if="day.active"
                  v-model="day.work_status"
                  class="outline-none mr-0 h-9 w-34 flex-none hidden sm:flex rounded-md border px-3 py-1.5"
                >
                  <option value="full_time">Cố định</option>
                  <option value="part_time">Không cố định</option>
                </select>
              </div>
              <!--từ  -->
              <div
                v-if="day.work_status === 'full_time' && day.active"
                class="flex items-center flex-shrink-0 gap-4"
              >
                <p class="text-center flex-shrink-0">từ</p>
                <!-- giờ bắt đầu -->
                <div>
                  <select
                    :value="`${day?.checkin?.hour
                      ?.toString()
                      .padStart(2, '0')}:${day?.checkin?.minute
                      ?.toString()
                      .padStart(2, '0')}`"
                    class="mr-0 flex h-9 w-30 rounded-md border px-3 py-2"
                    @change="($event:Event)=>{
                      const TARGET = $event.target as HTMLSelectElement
                      if(!day.checkin) return
                      day.checkin.hour = parseInt(TARGET.value.split(':')[0]);
                      day.checkin.minute = parseInt(TARGET.value.split(':')[1]);
                    }"
                  >
                    <template v-for="i in 24">
                      <option :value="`${i?.toString().padStart(2, '0')}:00`">
                        {{ `${i?.toString().padStart(2, '0')}:00` }}
                      </option>
                      <option
                        v-if="i < 24"
                        :value="`${i?.toString().padStart(2, '0')}:30`"
                      >
                        {{ `${i?.toString().padStart(2, '0')}:30` }}
                      </option>
                    </template>
                    <!-- Add more options as needed -->
                  </select>
                </div>
              </div>
              <!-- nghỉ trưa -->
              <div
                v-if="day.work_status === 'full_time' && day.active"
                class="flex items-center flex-shrink-0 gap-4"
              >
                <!--Nghỉ  -->
                <p class="text-center">Nghỉ</p>
                <!-- thời gian nghỉ trưa -->
                <div>
                  <select
                    v-model="day.rest_hours"
                    id="from-time"
                    class="mr-0 flex h-9 w-34 items-center rounded-md border px-3 py-1"
                  >
                    <option v-for="i in [0, 0.5, 1, 1.5, 2, 2.5]" :value="i">
                      {{ convertDecimalHoursToHoursAndMinutes(i) }}
                    </option>
                    <!-- <option value="0.5">30 phút</option>
                    <option value="1">1 giờ</option>
                    <option value="1.5">1 giờ 30 phút</option>
                    <option value="2">2 giờ</option>
                    <option value="2.5">2 giờ 30 phút</option> -->
                  </select>
                </div>
              </div>
              <!--đến  -->
              <div
                v-if="day.work_status === 'full_time' && day.active"
                class="flex items-center flex-shrink-0 gap-4"
              >
                <p class="text-center">đến</p>
                <!-- thời gian kết thúc -->
                <div>
                  <select
                    :value="`${day?.checkout?.hour
                      ?.toString()
                      .padStart(2, '0')}:${day?.checkout?.minute
                      ?.toString()
                      .padStart(2, '0')}`"
                    class="mr-0 flex h-9 w-30 rounded-md border px-3 py-2"
                    @change="($event:Event)=>{
                      const TARGET = $event.target as HTMLSelectElement
                      if(!day.checkout) return
                      day.checkout.hour = parseInt(TARGET.value.split(':')[0]);
                      day.checkout.minute = parseInt(TARGET.value.split(':')[1]);
                    }"
                  >
                    <template v-for="i in 24">
                      <option :value="`${i?.toString().padStart(2, '0')}:00`">
                        {{ `${i?.toString().padStart(2, '0')}:00` }}
                      </option>
                      <option
                        v-if="i < 24"
                        :value="`${i?.toString().padStart(2, '0')}:30`"
                      >
                        {{ `${i?.toString().padStart(2, '0')}:30` }}
                      </option>
                    </template>
                    <!-- Add more options as needed -->
                  </select>
                </div>
              </div>
              <!--  -->
              <div class="flex items-center flex-shrink-0 gap-4">
                <!-- số giờ làm  -->
                <p
                  v-if="day.active && day.work_status === 'full_time'"
                  class="text-center flex-shrink-0"
                >
                  Số giờ làm
                </p>
                <p
                  v-if="day.active && day.work_status === 'part_time'"
                  class="text-center flex-shrink-0"
                >
                  Chọn số giờ làm
                </p>

                <!-- icon -->
                <IconNext
                  v-if="day.active"
                  class="w-3.5 h-5 flex-shrink-0"
                ></IconNext>
                <!-- tổng số giờ làm -->
                <div v-if="day.active">
                  <p v-if="day.work_status === 'full_time'" class="w-24">
                    {{
                      convertDecimalHoursToHoursAndMinutes(
                        Number(day?.checkout?.hour || 0) +
                          Number(day?.checkout?.minute || 0) / 60 -
                          Number(day?.checkin?.hour || 0) -
                          Number(day?.checkin?.minute || 0) / 60 -
                          Number(day?.rest_hours || 0)
                      )
                    }}
                  </p>
                  <select
                    v-if="day.work_status !== 'full_time'"
                    id="from-time"
                    v-model="day.working_hours"
                    class="mr-0 flex h-9 w-34 rounded-md border px-3 py-1"
                  >
                    <template v-for="i in 10">
                      <option :value="i + 2">
                        {{ convertDecimalHoursToHoursAndMinutes(i + 2) }}
                      </option>
                      <option v-if="i < 10" :value="i + 2.5">
                        {{ convertDecimalHoursToHoursAndMinutes(i + 2.5) }}
                      </option>
                    </template>
                    <!-- Add more options as needed -->
                  </select>
                </div>
              </div>
              <!-- select -->
              <Toggle v-model="day.active" class="hidden sm:flex" />
            </div>
            <!--  -->
          </div>
        </div>
      </main>
      <!--  -->
      <footer class="flex items-center justify-between px-6 py-3">
        <button
          @click="handleOk"
          class="px-4 text-sm font-medium text-customDark py-2 bg-slate-200 rounded-md"
        >
          Đóng
        </button>

        <div class="flex gap-5">
          <button
            class="px-4 py-2 text-sm text-customDark font-medium bg-slate-200 rounded-md"
            @click="resetModal()"
          >
            Khôi phục mặc định
          </button>
          <button
            class="px-4 py-2 text-sm text-white font-medium bg-blue-700 rounded-md"
            @click="handleSave()"
          >
            Lưu
          </button>
        </div>
      </footer>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores'
import { copy } from '@/service/helper/format'
import { confirm } from '@/service/helper/alert'
import { setting } from '@/service/constant/setting_default'

// * libraries
import { ref } from 'vue'
import { format } from 'date-fns'
import { cloneDeep } from 'lodash'
import { storeToRefs } from 'pinia'

// * components
import Toggle from '@/components/Toggle.vue'
import Avatar from '@/components/avartar/Avatar.vue'

/**Icon*/
import IconNext from '@/components/icons/IconNext.vue'
import IconTicks from '@/components/icons/IconTicks.vue'
import IconPapers from '@/components/icons/IconPapers.vue'

// * interface
import { FormOfWork, FormOfWorkData } from '@/service/interface'

// * store
const commonStore = useCommonStore()
const { employees, user } = storeToRefs(commonStore)

/** dữ liệu thiết lập hình thức làm việc */
const form_of_work = defineModel<FormOfWork>({
  default: {},
})

/**Biến mở đóng modal*/
const open = ref(false)

/** loại modal mở ra */
const type_model = ref<'create' | 'update'>('create')

/** dữ liệu của hình thức làm việc đang chọn */
const form_of_work_value = ref<FormOfWorkData[string]>({
  name: '',
  working_hours: 0,
  working_time: [],
  created_by: user.value?._id,
  created_time: new Date(),
})

/** index hình thức làm việc */
const index = ref('')

/**Hàm mở modal*/
function showModal(item?: FormOfWorkData[string], idx?: string) {
  open.value = true
  // nếu update thì gán dữ liệu đang chọn
  if (item) {
    form_of_work_value.value = copy(item)
    type_model.value = 'update'
    index.value = idx || ''
  }
  // nếu thêm mới thì gán dữ liệu mặc định
  else {
    form_of_work_value.value = {
      name: '',
      working_hours: 0,
      working_time: cloneDeep(setting.form_of_work['1'].working_time),
      created_by: user.value?._id,
      created_time: new Date(),
    }
    type_model.value = 'create'
    index.value = (
      Number(Object.keys(form_of_work.value.setting_data || {})?.pop()) + 1
    )?.toString()
  }
}

/**Hàm đóng modal*/
function handleOk() {
  open.value = false
}

/** hàm chuyển đổi giờ */
function convertDecimalHoursToHoursAndMinutes(decimal_hours: number) {
  /** giờ */
  const HOURS = Math.floor(decimal_hours)

  /** phút */
  const MINUTES = Math.round((decimal_hours - HOURS) * 60)

  /** kết quả trả về */
  let result = ''

  // nếu có giờ thì mới hiẹn
  if (HOURS > 0 || !MINUTES) {
    result += `${HOURS} giờ `
  }

  // nếu có phút thì mới hiêjn
  if (MINUTES > 0) {
    result += `${MINUTES} phút`
  }

  // Xóa khoảng trắng ở cuối nếu có
  result = result.trim()

  // Trả về chuỗi rỗng nếu cả giờ và phút đều bằng 0
  if (result === '') {
    return '' // Hoặc bạn có thể trả về "0 phút" nếu muốn
  }

  return result
}

/** tính toán số giờ */
function calculateHours() {
  /** tổng số giờ / tuần */
  let sum = 0

  form_of_work_value.value.working_time?.forEach((item) => {
    if (!item.active) return

    if (item.work_status !== 'full_time') {
      item.working_hours =
        Number(item?.checkout?.hour || 0) +
        Number(item?.checkout?.minute || 0) / 60 -
        Number(item?.checkin?.hour || 0) -
        Number(item?.checkin?.minute || 0) / 60
    }

    sum += Number(item.working_hours || 0)
  })

  form_of_work_value.value.working_hours = sum
}

/** Lấy thông tin nhân viên */
function getInfo(id?: string, type?: string) {
  if (!id) return

  /** thông tin nhân viên */
  const EMPLOYEE = employees.value?.[id]

  if (type === 'name')
    return `${EMPLOYEE?.first_name || ''} ${EMPLOYEE?.last_name || ''}`?.trim()

  return EMPLOYEE?.avatar
}

/** lưu hình thức làm việc */
function handleSave() {
  if (!form_of_work.value.setting_data) form_of_work.value.setting_data = {}

  calculateHours()

  if (type_model.value === 'create') {
    form_of_work.value.setting_data[index.value] = {
      ...form_of_work_value.value,
    }
  } else {
    form_of_work.value.setting_data[index.value] = {
      ...form_of_work_value.value,
      created_by: user.value?._id,
      created_time: new Date(),
    }
  }
  open.value = false
}

/** xóa hình thức làm việc */
function handleDelete(id: string) {
  confirm(
    'warning',
    'Xác nhận hình thức làm việc này?',
    '',
    (is_cancel: boolean) => {
      if (is_cancel) return

      if (!form_of_work.value.setting_data) return
      delete form_of_work.value.setting_data[id]
    }
  )
}

/** khôi phục mặc định dữ liệu trong modal */
function resetModal() {
  confirm(
    'warning',
    'Xác nhận khôi phục mặc định?',
    '',
    (is_cancel: boolean) => {
      if (is_cancel) return
      form_of_work_value.value.working_time = cloneDeep(
        setting.form_of_work['1']
      ).working_time
    }
  )
}

/** khôi phục mặc định danh sách */
function reset() {
  confirm(
    'warning',
    'Xác nhận khôi phục mặc định?',
    '',
    (is_cancel: boolean) => {
      if (is_cancel) return
      form_of_work.value.setting_data = {
        '1': {
          ...cloneDeep(setting.form_of_work['1']),
          created_by: user.value?._id,
          created_time: new Date(),
        },
      }
    }
  )
}
</script>
