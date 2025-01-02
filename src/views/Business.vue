<template>
  <div class="text-center overflow-y-auto sm:h-screen sm:overflow-hidden">
    <main
      class="w-full flex flex-col gap-2 bg-gray-100 p-2 h-screen overflow-hidden text-black"
    >
      <!-- phần trên -->
      <header
        class="rounded-xl static top-0 bg-white py-2 px-5 flex justify-between items-center flex-shrink-0"
      >
        <!-- logo and name -->
        <div class="flex gap-2 items-center justify-start">
          <img
            src="@/assets/imgs/merchant-icon.png"
            class="h-9 w-9"
            alt="logoMerchant"
          />
          <h2 class="text-2xl font-semibold">Merchant</h2>
        </div>
        <!-- avatar -->
        <div class="relative text-start group">
          <Avatar
            class="h-9 w-9 cursor-pointer"
            :text_class="'text-lg font-semibold'"
            :src="employees[user?._id || '']?.avatar"
            :text="`${user?.first_name || ''} ${user?.last_name || ''}`"
          />
          <div
            class="hidden group-hover:block hover:block absolute top-9 py-1 -right-4 z-50"
          >
            <div
              class="flex flex-col border mr-2 rounded-lg bg-white shadow-lg"
            >
              <div class="px-6 py-3 text-sm">
                <div class="text-black font-medium">
                  {{ user?.first_name || '' }} {{ user?.last_name || '' }}
                </div>
                <div class="font-medium text-xs text-slate-500 truncate">
                  {{ employees[user?._id || '']?.email }}
                </div>
              </div>
              <hr class="border-1 border-slate-200" />
              <ul class="space-y-1 p-4 font-medium cursor-pointer">
                <li>
                  <a
                    class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                    href="https://merchant.vn/profile"
                  >
                    <UserCircleIcon class="w-5 h-5" />
                    <span class="ms-3">Tài khoản</span>
                  </a>
                </li>
                <li>
                  <a
                    class="flex items-center p-2 rounded-lg text-red-500 hover:bg-gray-100"
                    href="https://merchant.vn/login"
                  >
                    <ArrowRightStartOnRectangleIcon class="w-5 h-5" />
                    <span class="flex-1 ms-3 whitespace-nowrap">
                      Đăng xuất
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <!-- Phần thân -->
      <div
        class="flex-1 flex flex-col gap-2 overflow-y-auto sm:overflow-hidden sm:flex-row"
      >
        <!-- Phần trái -->
        <nav
          class="relative px-2 gap-1 sm:h-full flex-shrink-0 rounded-xl bg-white overflow-hidden flex flex-col mb-2 md:w-60 sm:mb-0"
        >
          <!-- cài đặt doanh nghiệp & chi nhánh -->
          <ul class="pt-3 flex flex-col gap-1">
            <li
              @click="selectedBusiness"
              :class="{ 'bg-slate-100': is_business }"
              class="flex items-center gap-2 h-13 rounded-lg p-2 cursor-pointer"
            >
              <div
                class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <IconBusiness class="w-5 h-5"></IconBusiness>
              </div>
              <h3 class="text-sm font-semibold">Cài đặt Doanh nghiệp</h3>
            </li>
            <li
              @click="selectedBrach"
              :class="{ 'bg-slate-100': !is_business }"
              class="flex items-center gap-2 h-13 rounded-lg p-2 cursor-pointer"
            >
              <div
                class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <IconHome class="w-5 h-5"></IconHome>
              </div>
              <h3 class="text-sm font-semibold">Cài đặt Chi nhánh</h3>
            </li>
          </ul>
          <!-- danh sách chi nhánh  -->
          <ul v-if="!is_business" class="flex flex-col gap-3 ml-8 pb-2">
            <li
              v-for="control in branches"
              @click="detaiBranch(control)"
              :class="{ 'bg-slate-100': branch_data?._id === control?._id }"
              class="flex items-center cursor-pointer gap-2 h-13 rounded-lg border border-slate-200 p-2"
            >
              <FormatAvartar :employee="control" :size="5"></FormatAvartar>
              <!--  -->
              <div class="flex-1 flex flex-col justify-start overflow-hidden">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-medium truncate">
                    {{ control?.short_name || control?.name }}
                  </h3>
                  <IconStar
                    v-if="control.type === 'headquarter'"
                    class="h-5 w-5"
                  ></IconStar>
                </div>
                <!--  -->
                <p
                  class="text-slate-500 text-xs h-4 flex justify-start truncate"
                >
                  {{
                    control.type === 'headquarter'
                      ? 'Trụ sở chính'
                      : 'Chi nhánh'
                  }}
                </p>
              </div>
            </li>
          </ul>
        </nav>
        <!-- phần phải -->
        <div
          class="flex-1 flex flex-col gap-2 md:overflow-y-auto sm:overflow-hidden"
        >
          <BusinessSetting v-if="is_business"></BusinessSetting>
          <!--  -->
          <BranchSetting v-else></BranchSetting>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { useCommonStore } from '@/stores'
import { copy } from '@/service/helper/format'
import { Toast } from '@/service/helper/toast'
import { getSettingBranch } from '@/service/api/api'

// * libraries
import { provide, ref } from 'vue'
import { storeToRefs } from 'pinia'

/**compomnet con*/
import Avatar from '@/components/avartar/Avatar.vue'
import FormatAvartar from '@/components/avartar/FormatAvartar.vue'
import BranchSetting from '@/components/business/BranchSetting.vue'
import BusinessSetting from '@/components/business/BusinessSetting.vue'

/**Icon*/
import IconHome from '@/components/icons/IconHome.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconBusiness from '@/components/icons/IconBusiness.vue'

/**ảnh */

// * interface
import { BranchData } from '@/service/interface'
import { isEmpty } from 'lodash'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline'

// * store
const commonStore = useCommonStore()
const { branches, branch_data, employees, user } = storeToRefs(commonStore)

// * toast
const $toast = new Toast()

/**Biến kiểm tra hiện doanh nghiệp hay ứng dụng */
const is_business = ref(true)

/** reset dữ liệu thiết lập của branch */
function resetBranch() {
  branch_data.value = {}
  commonStore.branch_holidays = {}
  commonStore.branch_form_of_work = {}
  commonStore.branch_working_time = {}
}

/**hàm bấm chọn cài đặt Chi nhánh*/
function selectedBrach() {
  is_business.value = false
  resetBranch()
}

/** hàm bấm chọn cài đặt Doanh nghiệp*/
function selectedBusiness() {
  is_business.value = true
  resetBranch()
}

/**Hàm khi bấm vào một chi nhánh nào đó*/
async function detaiBranch(branch: BranchData) {
  try {
    is_business.value = false
    resetBranch()

    // lưu lại dữ liệu chi nhánh đã chọn
    branch_data.value = copy(branch)

    // call api lấy dữ liệu thiết lập của chi nhánh đó
    const RES = await getSettingBranch({})

    // không có data thì thôi
    if (!RES.data) return

    // lặp qua các dữ liệu thiết lập để lưu lại
    RES.data?.forEach((item: any) => {
      if (item.setting_type === 'holiday') {
        commonStore.branch_holidays = item
        return
      }

      if (item.setting_type === 'form_of_work') {
        commonStore.branch_form_of_work = item
        return
      }

      if (item.setting_type === 'working_time') {
        commonStore.branch_working_time = item
        return
      }
    })

    // nếu chưa thiết lập ngày lễ thì lấy dữ liệu ở thiết lập doanh nghiệp
    if (isEmpty(commonStore.branch_holidays)) {
      commonStore.branch_holidays = copy(commonStore.holidays)
    }

    // nếu chưa thiết lập hình thức làm việc thì lấy dữ liệu ở thiết lập doanh nghiệp
    if (isEmpty(commonStore.branch_form_of_work)) {
      commonStore.branch_form_of_work = copy(commonStore.form_of_work)
    }

    // nếu chưa thiết lập thời gian làm việc thì lấy dữ liệu ở thiết lập doanh nghiệp
    if (isEmpty(commonStore.branch_working_time)) {
      commonStore.branch_working_time = copy(commonStore.working_time)
    }
  } catch (e) {}
}

provide('detaiBranch', detaiBranch)
</script>
