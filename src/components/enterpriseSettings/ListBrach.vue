<template>
  <div
    class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconHome class="w-5 h-5"></IconHome>
    <!--content  -->
    <div class="flex flex-col gap-2 w-full">
      <div class="flex h-5 items-center justify-between mb-3">
        <h4 class="flex justify-start text-sm font-medium">
          Danh sách chi nhánh
        </h4>
        <div
          @click="showModal()"
          class="flex items-center gap-2 bg-slate-100 py-3 px-3 h-5 cursor-pointer rounded-md"
        >
          <!-- icon -->
          <IconAdd class="w-4 h-4"></IconAdd>
          <p class="text-xs font-medium">Thêm chi nhánh</p>
        </div>
      </div>
      <table class="min-w-full border-none bg-white rounded-lg z-10">
        <thead
          class="bg-slate-200 h-7 text-sm font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
        >
          <tr class="h-7">
            <th class="w-6 text-left font-semibold text-slate-800">#</th>
            <th class="text-left font-semibold text-slate-800">Tên viết tắt</th>
            <th class="text-left font-semibold text-slate-800">Địa chỉ</th>
            <th
              class="text-left font-semibold text-slate-800 hidden md:table-cell"
            >
              Ngày thành lập
            </th>
            <th
              class="text-left font-semibold text-slate-800 hidden md:table-cell"
            >
              Số nhân sự
            </th>
            <th
              class="text-left font-semibold text-slate-800 hidden md:table-cell"
            >
              Trạng thái
            </th>
            <th
              class="text-left font-semibold text-slate-800 hidden md:table-cell"
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(branch, index) in branches"
            :key="index"
            class="hover:bg-slate-100 text-black text-sm overflow-y-auto h-full"
          >
            <!-- stt-->
            <td class="py-2 text-left items-center space-x-4">
              <p>{{ index + 1 }}</p>
            </td>
            <!-- tên viết tắt -->
            <td class="text-left py-2 items-center space-x-4">
              <p>{{ branch?.short_name || branch?.name || '' }}</p>
            </td>

            <!-- địa chỉ -->
            <td class="text-left py-2">
              <p>{{ branch?.address || '' }}</p>
            </td>

            <!-- ngày thành lập -->
            <td
              class="text-left py-2 text-customGray hidden md:table-cell text-15px"
            >
              <p v-if="branch?.establish_date">
                {{ format(branch?.establish_date, 'dd/MM/yyyy') }}
              </p>
            </td>

            <!-- số nhân sự -->
            <td class="text-left py-2 hidden md:table-cell">
              <p class="text-sm">
                {{ branch?.total_users }}
              </p>
            </td>

            <!-- trạng thái -->
            <td class="text-left py-2 hidden md:table-cell">
              <p
                class="text-sm"
                :class="!branch.archive ? 'text-green-500' : 'text-red-500'"
              >
                {{ !branch.archive ? 'Đang hoạt động' : 'Không hoạt động' }}
              </p>
            </td>
            <!-- thao tác -->
            <td class="text-left py-2 hidden md:table-cell">
              <button
                class="h-5 w-15 flex justify-center px-2 bg-slate-100 rounded-md py-0.5"
                @click="detaiBranch(branch)"
              >
                <span class="text-xs font-medium"> Cài đặt </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--  -->
  </div>
  <a-modal
    centered
    :style="{ width: '720px' }"
    v-model:open="open"
    :auto-focus="false"
    @ok="handleOk"
    :footer="null"
    v-if="open"
  >
    <div class="flex flex-col w-full">
      <header class="flex items-center justify-between h-10 px-6 py-2">
        <h3 class="h-6 text-base font-semibold">Thêm chi nhánh</h3>
        <button
          @click="open = false"
          class="p-1 rounded-md hover:bg-gray-300 hover:text-black"
        >
          <IconClose class="w-5 h-5"></IconClose>
        </button>
      </header>
      <!--  -->
      <main class="flex flex-col p-6 border-b border-t gap-2.5 border-gray-200">
        <div class="flex gap-2.5 sm:flex-row flex-col">
          <!-- Tên viết tắt -->
          <div class="sm:w-40 text-left h-16 space-y-1">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5.5"
            >
              Tên viết tắt
            </label>
            <input
              type="text"
              v-model="form_add.short_name"
              id="shortName"
              placeholder="Nhập tên chi nhánh"
              class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div class="sm:w-80 text-left h-16 space-y-1">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5.5"
            >
              Tên chi nhánh <span class="text-error"> *</span>
            </label>
            <input
              type="text"
              v-model="form_add.name"
              id="shortName"
              placeholder="Nhập tên chi nhánh"
              class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <!-- Tngày thành lập-->
          <div class="flex-1 text-left h-16 relative space-y-1">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5.5"
            >
              Ngày thành lập
            </label>
            <CustomVuePicker
              v-model="form_add.establish_date"
              placeholder="Chọn ngày"
              :handle-date="() => {}"
              :input_class="'!border-transparent'"
              class="border border-gray-300"
            />
            <IconArrow
              class="w-4 h-4 text-slate-600 absolute right-10 sm:right-2 top-1/2"
            ></IconArrow>
          </div>
        </div>
        <!--  -->
        <div class="flex gap-2.5 sm:flex-row flex-col w-full">
          <Location class="w-full" v-model="form_add" />
        </div>
      </main>
      <footer class="flex items-center justify-between px-6 py-3">
        <button
          class="px-4 text-sm font-medium text-customDark py-2 border rounded-md border-slate-300"
          @click="open = false"
        >
          Hủy
        </button>
        <button
          class="px-4 py-2 text-sm text-white font-medium bg-primary rounded-md"
          @click="handleOk"
        >
          Tạo chi nhánh
        </button>
      </footer>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores'
import { Toast } from '@/service/helper/toast'
import { businessAddBranch } from '@/service/api/api'

// * libraries
import { inject, ref } from 'vue'
import { storeToRefs } from 'pinia'

// * components
import Location from '@/components/Location.vue'
import CustomVuePicker from '@/components/CustomVuePicker.vue'

/**Icon*/
import IconAdd from '@/components/icons/IconAdd.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconArrow from '@/components/icons/IconArrow.vue'

// * interface
import { BranchData } from '@/service/interface'
import { format } from 'date-fns'

const detaiBranch = inject('detaiBranch') as Function

// * store
const commonStore = useCommonStore()
const { branches, business_id } = storeToRefs(commonStore)

/** dữ liệu thêm */
const form_add = ref<BranchData>({})

// * toast
const $toast = new Toast()

/**Biến mở đóng modal*/
const open = ref(false)

/**Hàm mở modal*/
function showModal() {
  open.value = true
  form_add.value = {
    name: '',
    address: '',
    establish_date: new Date(),
    business_owner_id: business_id.value,
    locations: {},
  }
}

/**Hàm xử lý thêm*/
async function handleOk() {
  try {
    if (!form_add.value.name) throw 'Vui lòng tên chi nhánh'

    const RES = await businessAddBranch({
      body: {
        ...form_add.value,
      },
    })

    if (RES.data.branch) {
      branches.value = [...branches.value, RES.data.branch]
      $toast.success('Tạo chi nhánh thành công')
    }
    open.value = false
  } catch (e) {
    $toast.error(e)
  }
}
</script>
