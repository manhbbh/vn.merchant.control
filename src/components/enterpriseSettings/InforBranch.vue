<template>
  <div
    class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconInformation class="w-5 h-5"></IconInformation>
    <!--content  -->
    <div class="flex-col flex-1 flex gap-3">
      <div class="flex items-center">
        <h4 class="flex justify-start text-sm font-medium">{{ $t('v1.form.common_info') }}</h4>
      </div>
      <div class="flex flex-col lg:flex-row gap-2 w-full">
        <div class="flex-shrink-0 flex flex-col gap-1.5 text-start">
          <label class="block text-sm font-medium text-gray-700"> Logo </label>
          <div
            v-if="!branch_data.logo"
            class="bg-slate-200 rounded-md w-9 h-9 flex items-center justify-center cursor-pointer"
            @click="selectFile()"
          >
            <ArrowUpTrayIcon class="w-4 h-4 text-slate-800" />
          </div>
          <img
            v-else
            @click="selectFile()"
            :src="branch_data.logo"
            class="rounded-md w-9 h-9 border"
          />
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-2 w-full">
          <!-- Tên viết tắt -->
          <div class="col-span-2 lg:col-span-1 text-left flex flex-col gap-1.5">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5.5"
            >
              {{ $t('v1.form.short_name') }}
            </label>
            <input
              v-model="branch_data.short_name"
              type="text"
              id="shortName"
              :placeholder="$t('v1.form.short_name_placeholder')"
              class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <!-- Tên đầy đủ -->
          <div class="col-span-2 text-left flex flex-col gap-1.5">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5.5"
            >
              {{ $t('v1.form.full_business_name') }}
            </label>
            <input
              v-model="branch_data.name"
              type="text"
              id="shortName"
              :placeholder="$t('v1.form.full_name_placeholder')"
              class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <!-- Địa chỉ -->
          <div class="col-span-2 text-left flex flex-col gap-1.5">
            <label
              for="taxCode"
              class="block text-sm font-medium text-gray-700 h-5.5"
            >
              {{ $t('v1.form.address') }}
            </label>
            <input
              type="text"
              id="taxCode"
              v-model="branch_data.address"
              :placeholder="$t('v1.form.business_address_placeholder')"
              class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- phần các ô input  -->
      <div class="grid grid-cols-2 lg:grid-cols-11 gap-2">
        <!-- Tiền tệ -->
        <div class="col-span-2 lg:col-span-2 text-left flex flex-col gap-1.5">
          <label class="block text-sm font-medium text-gray-700">
            {{ $t('v1.form.currency') }}
          </label>
          <select
            v-model="branch_data.currency"
            class="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
          >
            <option selected hidden value="undefined">{{ $t('v1.form.select_currency') }}</option>
            <option selected hidden value="null">{{ $t('v1.form.select_currency') }}</option>
            <option selected hidden value="">{{ $t('v1.form.select_currency') }}</option>
            <option v-for="(currency, index) in CURRENCIES" :value="index">
              {{ $t(`v1.currency.${index}`) }}
            </option>
          </select>
        </div>
        <!-- Quốc gia -->
        <div class="col-span-2 lg:col-span-2 text-left flex flex-col gap-1.5">
          <label class="block text-sm font-medium text-gray-700">
            {{ $t('v1.form.country') }}
          </label>
          <select
            v-model="branch_data.country_code"
            class="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
          >
            <option selected hidden value="undefined">{{ $t('v1.form.select_country') }}</option>
            <option selected hidden value="null">{{ $t('v1.form.select_country') }}</option>
            <option selected hidden value="">{{ $t('v1.form.select_country') }}</option>
            <option v-for="(country, index) in COUNTRIES" :value="index">
              {{ $t(`v1.country.${index}`) }}
            </option>
          </select>
        </div>
        <!-- Ngày thành lập-->
        <div class="col-span-2 lg:col-span-2 text-left flex flex-col gap-1.5">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700"
          >
            {{ $t('v1.form.founded_date') }}
          </label>
          <CustomVuePicker
            v-model="branch_data.establish_date"
            :placeholder="$t('v1.form.select_date')"
            :handle-date="() => {}"
            :teleport="true"
            class="border border-gray-300"
            :input_class="'leading-normal border-none'"
          />
        </div>
        <!-- Trạng thái-->
        <div class="col-span-2 text-left flex flex-col gap-1.5">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700"
          >
            {{ $t('v1.form.status') }}
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
              <p class="text-sm">{{ $t('v1.common.active') }}</p>
            </template>
            <template v-else>
              <IconPause class="h-5 w-5"></IconPause>
              <p class="text-sm">{{ $t('v1.common.inactive') }}</p>
            </template>
          </div>
        </div>
        <!-- Thao tác-->
        <div class="col-span-2 text-left flex flex-col gap-1.5">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700"
          >
            {{ $t('v1.form.action') }}
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
                t('v1.confirm.change_status'),
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
              <p class="text-sm">{{ $t('v1.common.activate') }}</p>
            </template>
            <template v-else>
              <IconPause class="h-5 w-5"></IconPause>
              <p class="text-sm">{{ $t('v1.common.inactive') }}</p>
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
import { businessUpdate, uploadImage } from '@/service/api/api'

// * libraries
import { ref } from 'vue'
import { get } from 'lodash'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

// * components
import CustomVuePicker from '@/components/CustomVuePicker.vue'

// * icons
import IconTick from '@/components/icons/IconTick.vue'
import IconPause from '@/components/icons/IconPause.vue'
import IconInformation from '@/components/icons/IconInformation.vue'

// * interfaces
import { BranchData } from '@/service/interface'
import { ArrowUpTrayIcon } from '@heroicons/vue/24/solid'
import { COUNTRIES, CURRENCIES } from '@/service/constant'

// * store
const commonStore = useCommonStore()
const { branch_data, branches } = storeToRefs(commonStore)

// * toast
const $toast = new Toast()
const { t } = useI18n()

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

/** Chọn file để upload */
function selectFile() {
  /**input upload file */
  const INPUT = document.createElement('input')

  // * Thêm các thuộc tính cần thiết
  INPUT.type = 'file'
  INPUT.accept = 'image/*'
  INPUT.style.display = 'none'
  INPUT.multiple = false

  // * Hàm xử lý sau khi upload thành công
  INPUT.onchange = () => {
    // * Nếu không có file nào được chọn thì thoát
    if (!INPUT.files) return

    // * Upload file
    uploadFile(INPUT.files)

    // * xoá input sau khi xong việc
    if (INPUT && INPUT.parentNode) INPUT.parentNode.removeChild(INPUT)
  }

  // * Thêm input vào html
  document.body.appendChild(INPUT)

  // * Click vào input
  INPUT.click()
}

/** Upload file */
async function uploadFile(files: FileList) {
  try {
    for (let i = 0; i < files.length; i++) {
      // * Lấy file
      let file = files[i]

      // * Tạo form data
      let form_data = new FormData()

      // * Thêm file vào form data
      form_data.append('file', file)

      /** Upload ảnh lên merchant */
      let res = await uploadImage({
        body: form_data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      /** Lấy về dữ liệu ảnh upload lên merchants */
      let image = get(res, 'data.file_path')

      if (image) {
        branch_data.value.logo = image
      }
    }
  } catch (e) {
    $toast.error(e as string)
  }
}
</script>
