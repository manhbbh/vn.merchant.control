<template>
  <div class="w-screen h-screen text-sm">
    <Network />
    <AdBlocker />
    <Loading v-if="commonStore.is_loading_full_screen" type="FULL" />
    <div
      class="h-screen overflow-hidden overflow-y-auto"
      v-if="is_authenticated"
    >
      <router-view />
    </div>
    <Template401 v-else />
  </div>
</template>

<script setup lang="ts">
import { useGetData } from '@/hook.ts'
import { useCommonStore } from '@/stores'
import { Toast } from '@/service/helper/toast'
import { copy } from '@/service/helper/format'
import { queryString } from '@/service/helper/queryString'
import { setting } from '@/service/constant/setting_default'
import { getBusinessInfo, getSetting, getUserInfo } from '@/service/api/api'

// * libraries
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// * components
import Loading from '@/components/Loading.vue'
import Network from '@/components/Network.vue'
import AdBlocker from '@/components/AdBlocker.vue'
import Template401 from '@/components/Template401.vue'

// * hook
const {
  getBusinessInfos,
  saveBusinessInfo,
  savesSettingBackground,
  savesSettingFormOfWork,
  savesSettingHolidays,
  savesSettingPeriodMonthly,
  savesSettingPeriodYearly,
  savesSettingTimeworking,
} = useGetData()

// * store
const commonStore = useCommonStore()

// * toast
const $toast = new Toast()

// * router
const router = useRouter()

// * có token hay không
const is_authenticated = ref(false)

onMounted(() => {
  getDataFromUrl()
  getSettings()
  getBusinessInfos()
  // getUserInfos()
})

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

    console.log(HAD_DATA)

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

/** lấy thông tin khách hàng */
async function getUserInfos() {
  try {
    await getUserInfo({
      body: {},
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
</script>

<style lang="scss">
@use '@/assets/css/index.scss';
</style>
