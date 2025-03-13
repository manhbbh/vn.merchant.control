<template>
  <div class="text-center overflow-y-auto sm:h-screen sm:overflow-hidden">
    <main
      v-if="is_authenticated"
      class="w-full flex flex-col gap-2 bg-gray-100 p-2 h-screen overflow-hidden text-black"
    >
      <!-- phần trên -->
      <header
        class="rounded-xl static top-0 bg-white py-2 px-5 flex justify-between items-center flex-shrink-0"
      >
        <!-- logo and name -->
        <a
          class="flex gap-2 items-center justify-star cursor-pointer"
          href="https://merchant.vn/bm"
        >
          <img
            src="@/assets/imgs/merchant-icon.png"
            class="h-9 w-9"
            alt="logoMerchant"
          />
          <h2 class="text-2xl font-semibold">Merchant</h2>
        </a>
        <!-- avatar -->
        <div class="relative text-start group">
          <Avatar
            class="h-9 w-9 cursor-pointer"
            :text_class="'text-lg font-semibold'"
            :src="employees_user_ids[user?._id || '']?.avatar"
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
                  {{ employees_user_ids[user?._id || '']?.email }}
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
          <ul v-if="!is_business" class="flex flex-col gap-3 ml-8 pb-2 overflow-auto">
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
    <Template401 v-else />
  </div>
</template>
<script setup lang="ts">
import { useGetData } from '@/hook.ts'
import { useCommonStore } from '@/stores'
import { copy } from '@/service/helper/format'
import { Toast } from '@/service/helper/toast'
import { queryString } from '@/service/helper/queryString'
import { setting } from '@/service/constant/setting_default'
import { getSetting, getSettingBranch } from '@/service/api/api'

// * libraries
import { isEmpty } from 'lodash'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { onMounted, provide, ref, watch } from 'vue'

/**compomnet con*/
import Avatar from '@/components/avartar/Avatar.vue'
import Template401 from '@/components/Template401.vue'
import FormatAvartar from '@/components/avartar/FormatAvartar.vue'
import BranchSetting from '@/components/business/BranchSetting.vue'
import BusinessSetting from '@/components/business/BusinessSetting.vue'

/**Icon*/
import IconHome from '@/components/icons/IconHome.vue'
import IconStar from '@/components/icons/IconStar.vue'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import IconBusiness from '@/components/icons/IconBusiness.vue'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline'

/**ảnh */

// * interface
import { BranchData, CalculationMethod } from '@/service/interface'

// * hook
const {
  getBusinessInfos,
  savesSettingBackground,
  savesSettingFormOfWork,
  savesSettingHolidays,
  savesSettingPeriodMonthly,
  savesSettingPeriodYearly,
  savesSettingTimeworking,
  saveBranchSettingFormOfWork,
  saveBranchSettingHolidays,
  saveBranchSettingAnnualLeaveYear,
  saveBranchSettingTimeworking,
} = useGetData()

// * store
const commonStore = useCommonStore()
const { branches, branch_data, employees_user_ids, user, is_get_data } =
  storeToRefs(commonStore)

// * toast
const $toast = new Toast()

// * router
const router = useRouter()

/**Biến kiểm tra hiện doanh nghiệp hay ứng dụng */
const is_business = ref(true)

// * có token hay không
const is_authenticated = ref(false)

onMounted(() => {
  getDataFromUrl()
  getSettings()
  getBusinessInfos()
})

watch(
  () => is_business.value,
  async (value) => {
    // nếu cần gọi là thì mới gọi lại
    if (is_get_data.value) {
      await getBusinessInfos()
      // tắt cờ gọi dữ liệu
      is_get_data.value = false
    }
  }
)

/** lấy các dữ liệu thiết lập trừ thiết lập chung */
async function getSettings() {
  try {
    const RES = await getSetting({
      body: {
        business_id: commonStore.business_id,
      },
    })
    // nếu không có dữ liệu thì thôi
    if (!RES.data) return

    /** trạng thái có data của các dữ liệu thiết lập */
    const HAD_DATA = {
      monthly_business_period: false,
      year_business_period: false,
      holidays: false,
      form_of_work: false,
      background: false,
      working_time: false,
    }

    RES.data?.forEach((item: any) => {
      if (item.setting_type === 'monthly_business_period') {
        commonStore.monthly_business_period = item
        HAD_DATA['monthly_business_period'] = true
        return
      }

      if (item.setting_type === 'year_business_period') {
        commonStore.year_business_period = item
        HAD_DATA['year_business_period'] = true
        return
      }

      if (item.setting_type === 'holiday') {
        commonStore.holidays = item
        HAD_DATA['holidays'] = true
        return
      }

      if (item.setting_type === 'form_of_work') {
        commonStore.form_of_work = item
        HAD_DATA['form_of_work'] = true
        return
      }

      if (item.setting_type === 'background') {
        commonStore.background = item
        HAD_DATA['background'] = true
        return
      }

      if (item.setting_type === 'working_time') {
        commonStore.working_time = item
        HAD_DATA['working_time'] = true
        return
      }
    })

    // lặp qua xem dữ liệu nào chưa có thì lấy dữ liệu mặc định
    Object.keys(HAD_DATA).forEach((key: string) => {
      switch (key) {
        case 'monthly_business_period':
          if (!HAD_DATA['monthly_business_period']) {
            commonStore.monthly_business_period = {
              setting_data: copy(setting.monthly_business_period),
            }
            savesSettingPeriodMonthly()
          }
          break
        case 'year_business_period':
          if (!HAD_DATA['year_business_period']) {
            commonStore.year_business_period = {
              setting_data: copy(setting.year_business_period),
            }
            savesSettingPeriodYearly()
          }
          break
        case 'holidays':
          if (!HAD_DATA['holidays']) {
            commonStore.holidays = {
              setting_data: copy(setting.holidays),
            }
            savesSettingHolidays()
          }
          break
        case 'form_of_work':
          if (!HAD_DATA['form_of_work']) {
            commonStore.form_of_work = {
              setting_data: copy(setting.form_of_work),
            }
            savesSettingFormOfWork()
          }
          break
        case 'background':
          if (!HAD_DATA['background']) {
            commonStore.background = {
              setting_data: copy(setting.background),
            }
            savesSettingBackground()
          }
          break
        case 'working_time':
          if (!HAD_DATA['working_time']) {
            commonStore.working_time = {
              setting_data: copy(setting.working_time),
            }
            savesSettingTimeworking()
          }
          break
        default:
          break
      }
    })
  } catch (e) {
    $toast.error(e)
  }
}

/** lấy dữ liệu từ url */
function getDataFromUrl() {
  /** lấy user_token */
  const USER_TOKEN =
    queryString('token_user') || localStorage.getItem('user_token')

  /** id doanh nghiệp */
  const BUSINESS_ID =
    queryString('business_id') || localStorage.getItem('business_id')

  // nếu thiếu dữ liệu thôi
  if (!USER_TOKEN || !BUSINESS_ID) {
    return
  }

  // lưu lại dữ liệu vào store
  commonStore.user_token = USER_TOKEN
  commonStore.business_id = BUSINESS_ID

  localStorage.setItem('user_token', USER_TOKEN)
  localStorage.setItem('business_id', BUSINESS_ID)

  router.replace({ query: {} })

  is_authenticated.value = true
}

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

    // clear data cũ
    commonStore.branch_holidays = {}
    commonStore.branch_form_of_work = {}
    commonStore.branch_working_time = {}
    commonStore.branch_annual_leave_year = {}

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

      if (item.setting_type === 'annual_leave_year') {
        commonStore.branch_annual_leave_year = item
        return
      }

    })

    // nếu chưa thiết lập ngày lễ thì lấy dữ liệu ở thiết lập doanh nghiệp
    if (isEmpty(commonStore.branch_holidays)) {
      commonStore.branch_holidays = copy(commonStore.holidays)
      saveBranchSettingHolidays()
    }

    // nếu chưa thiết lập hình thức làm việc thì lấy dữ liệu ở thiết lập doanh nghiệp
    if (isEmpty(commonStore.branch_form_of_work)) {
      commonStore.branch_form_of_work = copy(commonStore.form_of_work)
      saveBranchSettingFormOfWork()
    }

    // nếu chưa thiết lập thời gian làm việc thì lấy dữ liệu ở thiết lập doanh nghiệp
    if (isEmpty(commonStore.branch_working_time)) {
      commonStore.branch_working_time = copy(commonStore.working_time)
      saveBranchSettingTimeworking()
    }

    // nếu chưa có thiết lập phép năm thì khởi tạo
    if (isEmpty(commonStore.branch_annual_leave_year)) {
      commonStore.branch_annual_leave_year = {
        calculate_holiday_pay: 'NONE' as CalculationMethod,
        setting_data: {
          /** Số ngày nghỉ */
          annual_leave_days: 12,
          /** Tự động xóa */
          auto_clear: false
        }
      }

      saveBranchSettingAnnualLeaveYear()
    }
  } catch (e) {}
}

provide('detaiBranch', detaiBranch)
</script>
