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
import { getBusinessInfo, getSetting, getUserInfo } from '@/service/api/api'
import { Toast } from '@/service/helper/toast'
import { queryString } from '@/service/helper/queryString'

// * libraries
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// * components
import Loading from '@/components/Loading.vue'
import Network from '@/components/Network.vue'
import AdBlocker from '@/components/AdBlocker.vue'
import Template401 from '@/components/Template401.vue'

// * hook
const { getBusinessInfos } = useGetData()

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

    console.log(RES.data)

    RES.data?.forEach((item: any) => {
      if (item.setting_type === 'monthly_business_period') {
        commonStore.monthly_business_period = item
        return
      }

      if (item.setting_type === 'year_business_period') {
        commonStore.year_business_period = item
        return
      }

      if (item.setting_type === 'holiday') {
        commonStore.holidays = item
        return
      }

      if (item.setting_type === 'form_of_work') {
        commonStore.form_of_work = item
        return
      }

      if (item.setting_type === 'background') {
        commonStore.background = item
        return
      }

      if (item.setting_type === 'working_time') {
        commonStore.working_time = item
        return
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
