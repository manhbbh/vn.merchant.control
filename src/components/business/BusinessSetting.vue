<template>
  <!-- các phần con -->
  <div class="flex-1 flex flex-col gap-2 overflow-y-auto">
    <InforGeneral></InforGeneral>
    <!-- 2 -->
    <ListBrach></ListBrach>
    <!-- 3 -->
    <ListEmployee></ListEmployee>
    <!-- 4 -->
    <BusinessPeriod></BusinessPeriod>
    <!-- 5 -->
    <Holiday v-model="holidays" :setting_holiday="setting.holidays"></Holiday>
    <!-- 6 -->
    <WorkingForm v-model="form_of_work" :setting_form_of_work="setting.form_of_work"></WorkingForm>
    <!-- 7 -->
    <Synchronous ref="synchrononus_ref" />
    <!-- 8 -->
    <Timeworking v-model="working_time" :setting_working_time="setting.working_time"></Timeworking>
    <!-- 9 -->
    <Background></Background>
    <!-- nút lưu -->
    <div class="py-2 px-3 sticky bottom-0 bg-white rounded-lg flex items-center justify-end z-30">
      <button
        class="w-full lg:w-auto h-9 text-sm font-medium bg-blue-700 px-4 py-2 flex justify-center items-center rounded-lg text-white"
        @click="saveSetting()">
        Lưu thiết lập
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetData } from '@/hook.ts'
import { useCommonStore } from '@/stores'
import { Toast } from '@/service/helper/toast'
import { setting } from '@/service/constant/setting_default'

// * libraries
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

/**Component*/
import Holiday from '@/components/enterpriseSettings/Holiday.vue'
import ListBrach from '@/components/enterpriseSettings/ListBrach.vue'
import Background from '@/components/enterpriseSettings/Background.vue'
import Timeworking from '@/components/enterpriseSettings/Timeworking.vue'
import WorkingForm from '@/components/enterpriseSettings/WorkingForm.vue'
import ListEmployee from '@/components/enterpriseSettings/ListEmployee.vue'
import InforGeneral from '@/components/enterpriseSettings/InforGeneral.vue'
import BusinessPeriod from '@/components/enterpriseSettings/BusinessPeriod.vue'
import Synchronous from '@/components/enterpriseSettings/Synchronous.vue'

// * store
const commonStore = useCommonStore()
const {
  holidays,
  background,
  working_time,
  form_of_work,
  year_business_period,
  monthly_business_period,
  business_data,
} = storeToRefs(commonStore)

/** hook logic lưu các thiết lập */
const {
  saveBusinessInfo,
  savesSettingPeriodMonthly,
  savesSettingPeriodYearly,
  savesSettingHolidays,
  savesSettingFormOfWork,
  savesSettingTimeworking,
  savesSettingBackground,
} = useGetData()

/** reference tới component đồng bộ trang */
const synchrononus_ref = ref<typeof Synchronous | null>(null)

// * toast
const $toast = new Toast()

async function saveSetting() {
  try {
    // bật loading
    commonStore.is_loading_full_screen = true

    // call các api lưu thiết lập của doanh nghiệp
    await Promise.all([
      saveBusinessInfo(),
      savesSettingPeriodMonthly(),
      savesSettingPeriodYearly(),
      savesSettingHolidays(),
      savesSettingFormOfWork(),
      savesSettingTimeworking(),
      savesSettingBackground(),
    ])

    // call hàm lưu đồng bộ trang
    await synchrononus_ref.value?.save()

    // thông báo thành công
    $toast.success('Lưu thiết lập thành công')
  } catch (e) {
    $toast.error(e)
  } finally {
    // tắt loading
    commonStore.is_loading_full_screen = false
  }
}
</script>
