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
      <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
        <!-- Tên viết tắt -->
        <div class="col-span-2 md:col-span-1 text-left h-16">
          <label
            for="shortName"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Tên viết tắt
          </label>
          <input
            v-model="business_data.short_name"
            type="text"
            id="shortName"
            placeholder="Nhập tên viết tắt"
            class="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
          />
        </div>
        <!-- Tên đầy đủ Doanh nghiệp -->
        <div class="col-span-2 text-left h-16">
          <label
            for="fullName"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Tên đầy đủ Doanh nghiệp
          </label>
          <input
            v-model="business_data.name"
            type="text"
            id="fullName"
            placeholder="Nhập tên đầy đủ"
            class="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
          />
        </div>
        <!-- Mã số thuế -->
        <div class="col-span-2 md:col-span-1 text-left h-16">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Mã số thuế
          </label>
          <input
            v-model="business_data.tax_code"
            type="text"
            id="taxCode"
            placeholder="Nhập mã số thuế"
            class="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
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
            v-model="business_data.establish_date"
            placeholder="Chọn ngày"
            :handle-date="() => {}"
            :teleport="true"
            class="border border-gray-300"
            :input_class="'leading-normal border-none'"
          />
        </div>
        <!-- Địa chỉ -->
        <div class="col-span-2 md:col-span-3 text-left h-16">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Địa chỉ
          </label>
          <input
            v-model="business_data.address"
            type="text"
            id="taxCode"
            placeholder="Nhập địa chỉ Doanh nghiệp"
            class="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
          />
        </div>
        <!-- Trạng thái-->
        <div class="text-left">
          <label for="taxCode" class="block text-sm font-medium text-gray-700">
            Trạng thái
          </label>
          <div
            class="flex items-center py-2 text-green-600 gap-2"
            :class="{
              'text-green-600': !business_data.archive,
              'text-red-500': business_data.archive,
            }"
          >
            <template v-if="!business_data.archive">
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
        <div class="text-left">
          <label for="taxCode" class="block text-sm font-medium text-gray-700">
            Thao tác
          </label>
          <button
            class="flex items-center px-2.5 py-2 gap-2 border rounded-md hover:brightness-95"
            :class="{
              'bg-green-100 text-green-600  border-green-500':
                business_data.archive,
              'bg-red-100 text-red-500 border-red-500': !business_data.archive,
            }"
            @click="
              confirm(
                'warning',
                'Xác nhận thay đổi trạng thái?',
                '',
                (is_cancel: boolean) => {
                  if (is_cancel) return
                  business_data.archive = !business_data.archive
                  saveBusinessInfo()
                }
              )
            "
          >
            <template v-if="business_data.archive">
              <IconTick class="h-5 w-5"></IconTick>
              <p class="text-sm">Đang hoạt động</p>
            </template>
            <template v-else>
              <IconPause class="h-5 w-5"></IconPause>
              <p class="text-sm">Tạm dừng</p>
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

/**ICon*/
import IconTick from '@/components/icons/IconTick.vue'
import IconPause from '@/components/icons/IconPause.vue'
import IconInformation from '@/components/icons/IconInformation.vue'

// * store
const commonStore = useCommonStore()

// * toast
const $toast = new Toast()

const { business_data } = storeToRefs(commonStore)

/** lưu thông tin doanh nghiệp */
async function saveBusinessInfo() {
  try {
    await businessUpdate({
      body: {
        ...business_data.value,
        id: business_data.value?._id,
      },
    })
  } catch (e) {
    $toast.error(e)
  }
}

/**Biến*/
</script>
