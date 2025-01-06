<template>
  <div
    class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconInformation class="w-5 h-5"></IconInformation>
    <!--content  -->
    <div class="flex-col flex-1 gap-3">
      <div class="flex h-5 items-center mb-3">
        <h4 class="flex justify-start text-sm font-medium">Thông tin chung</h4>
      </div>
      <!-- phần các ô input  -->
      <div class="grid grid-cols-2 md:grid-cols-6 gap-2">
        <!-- Tên viết tắt -->
        <div class="col-span-2 md:col-span-1 text-left h-16">
          <label
            for="shortName"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Tên viết tắt
          </label>
          <input
            v-model="branch_data.short_name"
            type="text"
            id="shortName"
            placeholder="Nhập tên viết tắt"
            class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <!-- Tên viết tắt -->
        <div class="col-span-2 text-left h-16">
          <label
            for="shortName"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Tên đầy đủ
          </label>
          <input
            v-model="branch_data.name"
            type="text"
            id="shortName"
            placeholder="Nhập tên đầy đủ"
            class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <!-- Địa chỉ -->
        <div class="col-span-2 text-left">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Địa chỉ
          </label>
          <input
            type="text"
            id="taxCode"
            v-model="branch_data.address"
            placeholder="Nhập địa chỉ"
            class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <!-- Ngày thành lập-->
        <div class="col-span-2 md:col-span-1 text-left h-16">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Ngày thành lập
          </label>
          <CustomVuePicker
            v-model="branch_data.establish_date"
            placeholder="Chọn ngày"
            :handle-date="() => {}"
            :teleport="true"
            class="border border-gray-300"
            :input_class="'leading-normal border-none'"
          />
        </div>
        <!-- Trạng thái-->
        <div class="text-left flex flex-col gap-1.5">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Trạng thái
          </label>
          <div
            class="flex items-center text-green-600 gap-2"
            :class="{
              'text-green-600': !branch_data.archive,
              'text-red-500': branch_data.archive,
            }"
          >
            <template v-if="!branch_data.archive">
              <IconTick class="h-5 w-5"></IconTick>
              <p class="text-sm">Đang hoạt động</p>
            </template>
            <template v-else>
              <IconPause class="h-5 w-5"></IconPause>
              <p class="text-sm">Tạm dừng hoạt động</p>
            </template>
          </div>
        </div>
        <!-- Thao tác-->
        <div class="text-left flex flex-col gap-1.5">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Trạng thái
          </label>
          <button
            class="flex items-center p-1 lg:px-2 lg:py-2 gap-1 border rounded-md hover:brightness-95"
            :class="{
              'bg-green-100 text-green-600  border-green-500':
                branch_data.archive,
              'bg-red-100 text-red-500 border-red-500': !branch_data.archive,
            }"
            @click="
              confirm(
                'warning',
                'Xác nhận thay đổi trạng thái?',
                '',
                (is_cancel: boolean) => {
                  if (is_cancel) return
                  branch_data.archive = !branch_data.archive
                  saveBusinessInfo()
                }
              )
            "
          >
            <template v-if="branch_data.archive">
              <IconTick class="h-5 w-5"></IconTick>
              <p class="text-sm">Kích hoạt</p>
            </template>
            <template v-else>
              <IconPause class="h-5 w-5"></IconPause>
              <p class="text-sm">Tạm dừng hoạt động</p>
            </template>
          </button>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores'
import { Toast } from '@/service/helper/toast'
import { confirm } from '@/service/helper/alert'
import { businessUpdate } from '@/service/api/api'

// * libraries
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

// * components
import CustomVuePicker from '@/components/CustomVuePicker.vue'

// * icons
import IconTick from '@/components/icons/IconTick.vue'
import IconPause from '@/components/icons/IconPause.vue'
import IconInformation from '@/components/icons/IconInformation.vue'

// * interfaces
import { BranchData } from '@/service/interface'

// * store
const commonStore = useCommonStore()
const { branch_data, branches } = storeToRefs(commonStore)

// * toast
const $toast = new Toast()

/** lưu thông tin doanh nghiệp */
async function saveBusinessInfo() {
  try {
    await businessUpdate({
      body: {
        ...branch_data.value,
        id: branch_data.value?._id,
      },
    })

    branches.value = branches.value.map((item: BranchData) => {
      if (item._id === branch_data.value?._id) return branch_data.value
      return item
    })
  } catch (e) {
    $toast.error(e)
  }
}
</script>
