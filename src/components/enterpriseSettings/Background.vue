<template>
  <div
    class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconBackground class="w-5 h-5 flex-shrink-0"></IconBackground>
    <!--content  -->
    <div class="flex flex-col flex-1 gap-2 lg:gap-3">
      <div class="flex items-start justify-between">
        <h4 class="flex justify-start text-sm font-medium">Hình nền</h4>
        <div class="hidden lg:flex items-center gap-2.5">
          <button
            class="text-sm font-medium text-slate-500 h-9 px-2 sm:px-6 sm:py-2"
            @click="reset()"
          >
            Khôi phục mặc định
          </button>
          <button
            class="h-9 w-18 text-sm font-medium text-white rounded-md bg-black"
            @click="is_show_add = true"
          >
            Thêm
          </button>
        </div>
      </div>
      <!-- hai bảng -->
      <div class="flex flex-col gap-3 sm:flex-row">
        <div class="flex flex-1 gap-1 flex-col">
          <p class="text-left text-xs font-medium">Web PC</p>
          <div>
            <table class="min-w-full h-fit bg-white flex-1 z-10">
              <thead class="bg-slate-200 h-7 text-semibold rounded-2xl text-xs">
                <tr class="rounded-lg">
                  <th class="px-2 w-8 text-left font-semibold">STT</th>
                  <th class="text-center w-20 sm:w-25 font-semibold">Ảnh</th>
                  <th class="text-left w-34 font-semibold hidden md:table-cell">
                    Người tạo
                  </th>
                  <th class="text-center w-15 font-semibold">Hiển thị</th>
                  <th class="text-center w-15 font-semibold">Xóa</th>
                  <th
                    class="text-center w-15 font-semibold hidden md:table-cell"
                  ></th>
                </tr>
              </thead>
              <!--  -->
              <tbody>
                <tr
                  v-for="(holiday, index) in background?.setting_data?.pc"
                  :key="index"
                  class="text-black h-15 cursor-pointer text-sm border-b border-gray-200 overflow-y-auto"
                >
                  <!-- stt-->
                  <td class="">
                    <p class="flex w-8 px-4 text-blue-500 font-semibold">
                      {{ index + 1 }}
                    </p>
                  </td>
                  <!-- ảnh -->
                  <td class="w-31 sm:w-25">
                    <div
                      class="h-16 text-center flex justify-center items-center"
                    >
                      <img
                        :src="holiday?.link || ''"
                        class="w-31 h-12.5 flex justify-center rounded"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  </td>

                  <!--tên -->
                  <td class="text-left hidden md:table-cell">
                    <p>{{ getInfo(holiday?.created_by, 'name') }}</p>
                  </td>

                  <!--  -->
                  <td class="">
                    <!-- select -->
                    <Toggle v-model="holiday.active" />
                  </td>

                  <!-- xóa -->
                  <td class="">
                    <div
                      class="h-6 inline-flex text-red-500 bg-red-50 font-medium text-xs rounded-md px-2 py-0.5 items-center justify-center"
                      @click="handleDelete(index, 'pc')"
                    >
                      Xóa
                    </div>
                  </td>

                  <td class="hidden md:flex"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--  -->
        <div class="flex flex-1 gap-1 flex-col">
          <p class="text-left text-xs font-medium">Mobie App</p>
          <div>
            <table
              class="min-w-full h-fit border-none bg-white flex-1 rounded-lg z-10"
            >
              <thead
                class="bg-slate-200 h-7 text-xs font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
              >
                <tr class="h-7">
                  <th class="px-2 w-8 text-left font-semibold">STT</th>
                  <th class="text-center w-20 sm:w-25 font-semibold">Ảnh</th>
                  <th class="text-left w-34 font-semibold hidden md:table-cell">
                    Người tạo
                  </th>
                  <th class="text-center w-15 font-semibold">Hiển thị</th>
                  <th class="text-center w-15 font-semibold">Xóa</th>
                  <th
                    class="text-center w-15 font-semibold hidden md:table-cell"
                  ></th>
                </tr>
              </thead>
              <!--  -->
              <tbody>
                <tr
                  v-for="(holiday, index) in background?.setting_data?.mobile"
                  :key="index"
                  class="text-black h-15 cursor-pointer text-sm border-b border-gray-200 overflow-y-auto"
                >
                  <!-- stt-->
                  <td class="">
                    <p class="flex w-8 px-4 text-blue-500 font-semibold">
                      {{ index + 1 }}
                    </p>
                  </td>
                  <!-- ảnh -->
                  <td class="w-20">
                    <div
                      class="h-16 text-center flex justify-center items-center"
                    >
                      <img
                        :src="holiday?.link"
                        class="w-7.5 h-11.5 flex overflow-hidden object-cover justify-center rounded"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  </td>

                  <!--tên -->
                  <!--tên -->
                  <td class="text-left hidden md:table-cell">
                    <p>{{ getInfo(holiday?.created_by, 'name') }}</p>
                  </td>

                  <!--  -->
                  <td class="">
                    <!-- select -->
                    <Toggle v-model="holiday.active" />
                  </td>

                  <!-- xóa -->
                  <td class="">
                    <div
                      class="h-6 inline-flex text-red-500 bg-red-50 font-medium text-xs rounded-md px-2 py-0.5 items-center justify-center"
                      @click="handleDelete(index, 'mobile')"
                    >
                      Xóa
                    </div>
                  </td>
                  <td class="hidden md:flex"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="flex flex-col py-2 text-start" v-if="is_show_add">
        <div class="flex flex-col gap-2 lg:gap-4 sm:flex-row">
          <div class="flex items-center justify-between gap-4">
            <p class="text-sm font-medium w-28 flex-shrink-0 lg:w-auto">Link</p>
            <input
              v-model="form_add.link"
              type="text"
              class="w-full lg:w-67 border rounded-md px-3 py-2 border-slate-300 outline-none"
              placeholder="https://"
            />
          </div>
          <div class="flex items-center gap-4">
            <p class="text-sm font-medium flex-shrink-0 w-28 lg:w-auto">
              Loại hình nền
            </p>
            <select
              v-model="form_add.type"
              class="mr-0 flex items-center w-full sm:w-30 rounded-md border px-3 py-2"
            >
              <option value="pc">Web PC</option>
              <option value="mobile">Mobie App</option>
            </select>
          </div>
          <button
            class="px-4 py-2 flex justify-center items-center rounded-lg bg-green-500 text-white"
            @click="handleAdd()"
          >
            Lưu
          </button>
        </div>
        <p class="h-4 text-xs text-left text-slate-700 hidden sm:flex">
          Lưu ý: Kích thước ảnh Web PC (2560 x 1440), Mobile App (440 x 956),
          loại File (.png , .jpg). Sử dụng https://imgbb.com để upload ảnh.
        </p>
      </div>
      <div class="flex lg:hidden items-center gap-2.5 text-white">
        <button
          class="min-w-60 text-sm font-medium bg-slate-500 p-2 border rounded-md"
          @click="reset()"
        >
          Khôi phục mặc định
        </button>
        <button
          class="flex-1 text-sm font-medium text-white rounded-md bg-black p-2"
          @click="is_show_add = true"
        >
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
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

/**ICon*/
import IconBackground from '@/components/icons/IconBackground.vue'
import Toggle from '../Toggle.vue'

// * store
const commonStore = useCommonStore()
const { background, employees_user_ids, user } = storeToRefs(commonStore)

/** ẩn hiệm form thêm */
const is_show_add = ref(false)

/** form thêm mới background */
const form_add = ref<{
  link: string
  type: 'pc' | 'mobile'
}>({
  link: '',
  type: 'pc',
})

/** lấy thông tin nhân viên */
function getInfo(id?: string, type?: string) {
  if (!id) return

  /** thông tin nhân viên */
  const EMPLOYEE = employees_user_ids.value?.[id]

  if (type === 'name')
    return `${EMPLOYEE?.first_name || ''} ${EMPLOYEE?.last_name || ''}`?.trim()

  return EMPLOYEE?.avatar
}

/** thêm background */
function handleAdd() {
  // nếu không có dữ liệu thì thôi
  if (!background.value.setting_data) return

  // nếu thêm pc
  if (form_add.value.type === 'pc') {
    background.value.setting_data = {
      ...background.value.setting_data,
      pc: [
        ...(background.value.setting_data?.pc || []),
        {
          link: form_add.value.link,
          active: false,
          created_by: user.value?._id,
        },
      ],
    }
  }

  // nếu thêm mobile
  if (form_add.value.type === 'mobile') {
    background.value.setting_data = {
      ...background.value.setting_data,
      mobile: [
        ...(background.value.setting_data?.mobile || []),
        {
          link: form_add.value.link,
          active: false,
          created_by: user.value?._id,
        },
      ],
    }
  }

  form_add.value = {
    link: '',
    type: 'pc',
  }

  is_show_add.value = false
}

/** xử lý xóa ngày lễ */
function handleDelete(index: number, type: 'pc' | 'mobile') {
  confirm('warning', 'Xác nhận xóa hình nền?', '', (is_cancel: boolean) => {
    if (is_cancel) return

    // nếu không có dữ liệu thì thôi
    if (!background.value.setting_data) return

    // nếu là xóa pc
    if (type === 'pc') {
      background.value.setting_data?.pc?.splice(index, 1)
    }

    // nếu là xóa mobile
    if (type === 'mobile') {
      background.value.setting_data?.mobile?.splice(index, 1)
    }
  })
}

/** khôi phục mặc định */
function reset() {
  confirm(
    'warning',
    'Xác nhận khôi phục mặc định?',
    '',
    (is_cancel: boolean) => {
      if (is_cancel) return
      background.value.setting_data = {
        pc: [],
        mobile: [],
      }
    }
  )
}
</script>
