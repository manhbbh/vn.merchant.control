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
            @click="open = true"
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
                      time?.work_status === 'full_time' && time?.active,
                    'bg-orange-500':
                      time?.work_status !== 'full_time' && time?.active,
                    'bg-slate-500': !time?.active,
                  }"
                  class="w-2.5 text-ss text-white flex items-center justify-center h-2.5 rounded-full"
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
                  :src="getInfo(form_of_work?.setting_data?.[holiday]?.created_by)"
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
                      form_of_work?.setting_data?.[holiday]?.created_time as Date,
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
                  @click="showModal"
                  class="h-5 w-14.5 text-xs font-medium text-white rounded-md bg-blue-700"
                >
                  Cài đặt
                </button>
                <div
                  class="h-5 inline-flex text-red-500 bg-red-50 font-medium text-xs rounded-md px-2 py-0.5 items-center justify-center"
                  @click="handleDelete()"
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
        <div class="pl-8 overflow-hidden">
          <div
            v-for="(day, index) in LIST_DAYS"
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
                class="outline-none mr-0 h-9 w-34 flex flex-none sm:hidden rounded-md border px-3 py-1.5"
              >
                <option value="permanent">Cố định</option>
                <option value="not_fixed">Không cố định</option>
              </select>
            </div>
            <!--  -->
            <div
              :class="{ 'gap-1': !day.active, 'gap-4': day.active }"
              class="h-9 text-sm text-black flex flex-colflex-1 flex-shrink-0 items-center sm:flex-row sm:justify-end"
            >
              <div class="flex items-center flex-shrink-0 gap-4">
                <!-- giờ làm -->
                <p class="flex-shrink-0 hidden sm:flex">
                  {{ day.active ? 'Giờ làm' : 'Ngày nghỉ' }}
                </p>
                <!-- cố định -->
                <select
                  v-if="day.active"
                  v-model="day.status"
                  class="outline-none mr-0 h-9 w-34 flex-none hidden sm:flex rounded-md border px-3 py-1.5"
                >
                  <option value="permanent">Cố định</option>
                  <option value="not_fixed">Không cố định</option>
                </select>
              </div>
              <!--từ  -->
              <div
                v-if="day.status === 'permanent'"
                class="flex items-center flex-shrink-0 gap-4"
              >
                <p
                  v-if="day.active && day.status === 'permanent'"
                  class="text-center flex-shrink-0"
                >
                  từ
                </p>
                <!-- giờ bắt đầu -->
                <div v-if="day.active && day.status === 'permanent'" class="">
                  <select
                    v-model="day.checkin.hour"
                    id="from-time"
                    class="mr-0 flex h-9 w-22.5 rounded-md border px-3 py-2"
                  >
                    <option value="7">9:00</option>
                    <option value="8">8:00</option>
                    <option value="9">7:00</option>
                    <!-- Add more options as needed -->
                  </select>
                </div>
              </div>
              <!--  -->
              <div
                v-if="day.status === 'permanent'"
                class="flex items-center flex-shrink-0 gap-4"
              >
                <!--Nghỉ  -->
                <p
                  v-if="day.active && day.status === 'permanent'"
                  class="text-center"
                >
                  Nghỉ
                </p>
                <!-- thời gian nghỉ trưa -->
                <div v-if="day.active && day.status === 'permanent'" class="">
                  <select
                    v-model="day.lunch_break"
                    id="from-time"
                    class="mr-0 flex h-9 w-34 items-center rounded-md border px-3 py-1"
                  >
                    <option value="90 phút">1 giờ 30 phút</option>
                    <option value="0">0 giờ</option>
                    <!-- Add more options as needed -->
                  </select>
                </div>
              </div>
              <!--đến  -->
              <div
                v-if="day.status === 'permanent'"
                class="flex items-center flex-shrink-0 gap-4"
              >
                <p
                  v-if="day.active && day.status === 'permanent'"
                  class="text-center"
                >
                  đến
                </p>
                <!-- thời gian kết thúc -->
                <div v-if="day.active && day.status === 'permanent'">
                  <select
                    v-model="day.checkout.hour"
                    id="from-time"
                    class="mr-0 flex h-9 w-22.5 rounded-md border px-3 py-2"
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
                  Số giờ làm
                </p>
                <p
                  v-if="day.active && day.status === 'not_fixed'"
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
                  <select
                    v-model="day.work_status"
                    id="from-time"
                    :class="{ 'bg-slate-100': day.status === 'permanent' }"
                    class="mr-0 flex h-9 w-34 rounded-md border px-3 py-1"
                  >
                    <option value="full_time">8 giờ</option>
                    <option value="part_morning">3 giờ 30 phút</option>
                    <option value="part_afternoon">4 giờ 30 phút</option>
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
          >
            Khôi phục mặc định
          </button>
          <button
            class="px-4 py-2 text-sm text-white font-medium bg-blue-700 rounded-md"
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
import { confirm } from '@/service/helper/alert'
import { setting } from '@/service/constant/setting_default'

// * libraries
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'

// * components
import Avatar from '@/components/avartar/Avatar.vue'

/**Icon*/
import IconNext from '@/components/icons/IconNext.vue'
import IconTicks from '@/components/icons/IconTicks.vue'
import IconPapers from '@/components/icons/IconPapers.vue'


/**Biến*/
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
    title: "Thứ 2",
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
    title: "Thứ 3",
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
    title: "Thứ 4",
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
    title: "Thứ 5",
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
    title: "Thứ 6",
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
    title: "Thứ 7",
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
    title: "Chủ nhật",
    work_status: "day_off",
  },
];

// * store
const commonStore = useCommonStore()
const { form_of_work, employees, user } = storeToRefs(commonStore)

/**biến*/
const active = ref(true)

/**Biến mở đóng modal*/
const open = ref(false)

/** loại modal mở ra */
const type_model = ref<'create'|'update'>('create')

/** dữ liệu của hình thức làm việc đang chọn */
const form_of_work_value = ref({
  name: '',
  working_hours: 0,
  setting_data: {},
  created_by: user.value?._id,
  created_time: new Date(),
})

/**Hàm mở modal*/
function showModal() {
  open.value = true
}
/**Hàm đóng modal*/
function handleOk() {
  open.value = false
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

/** xóa hình thức làm việc */
function handleDelete() {
  confirm('warning', 'Xác nhận hình thức làm việc này?', '', (is_cancel: boolean) => {
    if (is_cancel) return
  })
}

/** khôi phục mặc định */
function reset() {
  confirm('warning', 'Xác nhận khôi phục mặc định?', '', (is_cancel: boolean) => {
    if (is_cancel) return

    form_of_work.value.setting_data = {}
    for (const key in setting.form_of_work) {
      form_of_work.value.setting_data[key] = {
        ...setting.form_of_work[key],
        created_by: user.value?._id,
        created_time: new Date()
      }
    }
  })
}

</script>
