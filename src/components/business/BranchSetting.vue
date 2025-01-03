<template>
  <div v-if="!branch_data?._id" class="py-3">
    <p class="text-sm font-semibold">Vui lòng chọn Chi nhánh</p>
  </div>
  <!--  -->
  <div v-else class="flex-1 flex flex-col gap-2 overflow-y-auto">
    <InforBranch></InforBranch>
    <!-- 2 -->
    <ListEmployee></ListEmployee>
    <!-- 3 -->
    <Holiday
      v-model="branch_holidays"
      :setting_holiday="holidays.setting_data || {}"
    ></Holiday>
    <!-- 4 -->
    <WorkingForm
      v-model="branch_form_of_work"
      :setting_form_of_work="form_of_work.setting_data || {}"
    ></WorkingForm>
    <!-- 5 -->
    <Timeworking
      v-model="branch_working_time"
      :setting_working_time="working_time.setting_data || {}"
    ></Timeworking>
    <!-- nút lưu -->
    <div
      class="py-2 px-3 bg-white rounded-lg flex items-center justify-end sticky bottom-0 z-40"
      @click="saveSetting()"
    >
      <button
        class="h-9 text-sm font-medium bg-blue-700 px-4 py-2 flex justify-center items-center rounded-lg text-white"
      >
        Lưu thiết lập
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCommonStore } from '@/stores'
import { Toast } from '@/service/helper/toast'
import { branchSaveSetting, businessUpdate } from '@/service/api/api'

// * libraries
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

/**component */
import Holiday from '@/components/enterpriseSettings/Holiday.vue'
import InforBranch from '@/components/enterpriseSettings/InforBranch.vue'
import Timeworking from '@/components/enterpriseSettings/Timeworking.vue'
import WorkingForm from '@/components/enterpriseSettings/WorkingForm.vue'
import ListEmployee from '@/components/enterpriseSettings/ListEmployee.vue'
import { BranchData } from '@/service/interface'

// * store
const commonStore = useCommonStore()
const {
  branch_data,
  branch_holidays,
  branch_form_of_work,
  branch_working_time,
  branches,
  holidays,
  form_of_work,
  working_time,
} = storeToRefs(commonStore)

// * toast
const $toast = new Toast()

/** lưu thiết lập ngày nghỉ lễ */
async function savesSettingHolidays() {
  try {
    await branchSaveSetting({
      body: {
        setting_type: 'holiday',
        setting_data: branch_holidays.value?.setting_data,
      },
    })
  } catch (e) {
    throw e
  }
}

/** lưu thiết lập hình thức làm việc */
async function savesSettingFormOfWork() {
  try {
    await branchSaveSetting({
      body: {
        setting_type: 'form_of_work',
        setting_data: branch_form_of_work.value?.setting_data,
      },
    })
  } catch (e) {
    throw e
  }
}

/** lưu thiết lập thời gian làm việc */
async function savesSettingTimeworking() {
  try {
    await branchSaveSetting({
      body: {
        setting_type: 'working_time',
        setting_data: branch_working_time.value?.setting_data,
      },
    })
  } catch (e) {
    throw e
  }
}

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

async function saveSetting() {
  try {
    await Promise.all([
      saveBusinessInfo(),
      savesSettingHolidays(),
      savesSettingFormOfWork(),
      savesSettingTimeworking(),
    ])
    $toast.success('Lưu thiết lập thành công')
  } catch (e) {
    $toast.error(e)
  }
}
</script>
