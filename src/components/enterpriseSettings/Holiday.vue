<template>
  <div class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3">
    <!-- icon -->
    <IconCalendar class="w-5 h-5 flex-shrink-0"></IconCalendar>
    <!--content  -->
    <div class="flex flex-col gap-2.5 w-full">
      <div class="flex items-start justify-between">
        <h4 class="flex justify-start text-sm font-medium">Nghỉ lễ</h4>
        <div class="hidden lg:flex items-center gap-2.5">
          <button class="text-sm font-medium text-slate-500 h-9 px-6 py-2" @click="reset()">
            <span v-if="!branch_data?._id">Khôi phục mặc định</span>
            <span v-else>Khôi phục theo Doanh nghiệp</span>
          </button>
          <button class="h-9 w-18 text-sm font-medium text-white rounded-md bg-black" @click="is_show_add = true">
            Thêm
          </button>
        </div>
      </div>
      <!--  -->
      <div class="grid grid-cols-3">
        <div class="flex gap-1 items-center w-full">
          <label class="flex-shrink-0 text-sm font-medium" for="">
            Tính lương nghỉ lễ
          </label>
          <div class="relative w-full flex justify-start">
            <select class="appearance-none w-full outline-none rounded-lg border-border border text-sm px-3 py-2">
              <option value="">Tính cả P1 và P2</option>
              <option value="p1">Tính P1</option>
              <option value="p1">Tính P2</option>
            </select>
            <IconDown class="w-5 h-5 text-down absolute right-3 top-2 "></IconDown>
          </div>
        </div>
      </div>
      <!--  -->
      <table class="min-w-full border-none bg-white rounded-lg z-10">
        <thead class="bg-slate-200 h-7 text-xs font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10">
          <tr class="h-7">
            <th class="w-18 px-2 text-left font-semibold">ID|Ngày</th>
            <th class="w-50 text-left font-semibold">Tiêu đề</th>
            <th class="w-25 text-center font-semibold">Ngày lễ</th>
            <th class="w-50 text-left font-semibold hidden md:table-cell">
              Người tạo
            </th>
            <th class="w-25 text-center sm:text-left font-semibold">Xóa</th>
            <th class="w-[170px] text-left font-semibold hidden md:table-cell"></th>
          </tr>
        </thead>
        <!--  -->
        <tbody>
          <tr v-for="(holiday, index) in Object.keys(
                  holidays?.setting_data || {}
                )" :key="index"
            class="hover:bg-slate-100 text-black h-15 cursor-pointer text-sm border-b border-gray-200 overflow-y-auto">
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
            <td class="text-left py-2 text-customGray flex-col text-15px hidden md:flex">
              <div class="flex items-center gap-1 h-5">
                <Avatar class="w-4 h-4" :src="getInfo(holidays?.setting_data?.[holiday]?.created_by)" :text="
                        getInfo(
                          holidays?.setting_data?.[holiday]?.created_by,
                          'name'
                        ) || ''
                      "></Avatar>
                <!--  -->
                <div class="flex gap-1 items-end justify-between">
                  <p class="text-sm">
                    {{
                    getInfo(
                    holidays?.setting_data?.[holiday]?.created_by,
                    'name'
                    )
                    }}
                  </p>
                  <IconTicks class="w-4 h-4"></IconTicks>
                </div>
              </div>
              <!--  -->
              <div class="h5 flex ml-5 items-center justify-start text-xs">
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
                @click="handleDelete(holiday)">
                Xóa
              </div>
            </td>
            <!-- stt-->
            <td class="py-2 text-left px-3 w-18 items-center justify-center hidden md:flex"></td>
          </tr>
        </tbody>
      </table>
      <!--  -->
      <div class="grid grid-cols-2 lg:flex flex-col gap-4 sm:flex-row" v-if="is_show_add">
        <!-- Ngày thành lập-->
        <div class="flex flex-col lg:flex-row text-left gap-1 lg:gap-4">
          <label for="taxCode" class="block text-sm font-medium flex-shrink-0 text-start px-1">
            Tiêu đề
          </label>
          <input v-model="add_form.title" class="border border-gray-300 px-3 rounded-md lg:w-67 py-2"
            placeholder="Nhập tiêu đề ngày nghỉ" type="text" />
        </div>
        <!-- Ngày thành lập-->
        <div class="flex flex-col lg:flex-row text-left gap-1 lg:gap-4">
          <label for="taxCode" class="block text-sm font-medium text-gray-700 px-1">
            Ngày
          </label>
          <CustomVuePicker v-model="add_form.date" placeholder="Chọn ngày" :handle-date="() => {}"
            :input_class="'!border-transparent'" class="border border-gray-300 w-full lg:w-40" />
        </div>
  
        <!--  -->
        <button class="col-span-2 bg-green-600 text-sm font-medium text-white rounded-md px-4 py-2" @click="handleAdd">
          Lưu
        </button>
      </div>
  
      <div class="flex lg:hidden items-center gap-2.5 text-white">
        <button class="min-w-60 text-sm font-medium bg-slate-500 p-2 border rounded-md" @click="reset()">
          <span v-if="!branch_data?._id">Khôi phục mặc định</span>
          <span v-else>Khôi phục theo Doanh nghiệp</span>
        </button>
        <button class="flex-1 text-sm font-medium text-white rounded-md bg-black p-2" @click="is_show_add = true">
          Thêm
        </button>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores'
import { confirm } from '@/service/helper/alert'

// * libraries
import { PropType, ref } from 'vue'
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'

// * components
import Avatar from '@/components/avartar/Avatar.vue'
import CustomVuePicker from '@/components/CustomVuePicker.vue'

/**Icon*/
import IconTicks from '@/components/icons/IconTicks.vue'
import IconCalendar from '@/components/icons/IconCalendar.vue'
import IconDown from '@/components/icons/IconDown.vue'

// * interfaces
import { HolidaySetting, HolidaySettingData } from '@/service/interface'

// * props
const props = defineProps({
  setting_holiday: {
    type: Object as PropType<HolidaySettingData>,
    required: true,
  },
})

// * store
const commonStore = useCommonStore()
const { employees_user_ids, user, branch_data } = storeToRefs(commonStore)

/** dữ liệu thiết lập nghỉ lễ */
const holidays = defineModel<HolidaySetting>({ default: {} })

/**Biến*/
/** ẩn hiện modal thêm nhân viên */
const is_show_add = ref(false)

/** form thêm mới ngày lễ */
const add_form = ref({
  title: '',
  date: new Date(),
})

/** lấy thông tin nhân viên */
function getInfo(id?: string, type?: string) {
  if (!id) return

  /** thông tin nhân viên */
  const EMPLOYEE = employees_user_ids.value?.[id]

  // nếu lấy tên thì trả tên
  if (type === 'name')
    return `${EMPLOYEE?.first_name || ''} ${EMPLOYEE?.last_name || ''}`?.trim()

  // còn lại trả về ảnh đại diện
  return EMPLOYEE?.avatar
}

/** xử lý thêm ngày lễ */
function handleAdd() {
  /** đổi ngày sang dạng chuỗi lưu làm key */
  const DATE_STR = format(add_form.value.date, 'dd/MM')

  // nếu không có ngày thì thôi
  if (!DATE_STR) return

  // thêm vào ngày lễ
  holidays.value = {
    ...holidays.value,
    setting_data: {
      ...holidays.value?.setting_data,
      [DATE_STR]: {
        name: add_form.value.title,
        created_time: add_form.value.date,
        created_by: user.value?._id,
      },
    },
  }

  // reset form
  add_form.value = {
    title: '',
    date: new Date(),
  }

  // đóng form
  is_show_add.value = false
}

/** xử lý xóa ngày lễ */
function handleDelete(date: string) {
  confirm('warning', 'Xác nhận xóa nghỉ lễ?', '', (is_cancel: boolean) => {
    // nếu hủy thì thôi
    if (is_cancel) return

    // xóa
    delete holidays.value?.setting_data?.[date]
  })
}

/** khôi phục mặc định */
function reset() {
  confirm(
    'warning',
    'Xác nhận khôi phục mặc định?',
    '',
    (is_cancel: boolean) => {
      // nếu hủy thì thôi
      if (is_cancel) return

      /** ngày hôm này */
      const TODAY = new Date()

      // xóa hết dữ liệu
      holidays.value.setting_data = {}

      // lấy dữ liệu trong default
      for (const key in props.setting_holiday) {
        holidays.value.setting_data[key] = {
          ...props.setting_holiday[key],
          created_by: user.value?._id,
          created_time: TODAY,
        }
      }
    }
  )
}
</script>
