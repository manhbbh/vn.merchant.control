import { useCommonStore } from '@/stores'
import { Toast } from '@/service/helper/toast'
import {
  branchSaveSetting,
  businessSaveSetting,
  businessUpdate,
  getBusinessInfo,
} from '@/service/api/api'

import { storeToRefs } from 'pinia'

export function useGetData() {
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
    branch_form_of_work,
    branch_holidays,
    branch_working_time
  } = storeToRefs(commonStore)

  // * toast
  const $toast = new Toast()

  /** hàm lấy thông tin doanh nghiệp và chi nhánh */
  async function getBusinessInfos() {
    try {
      const RES = await getBusinessInfo({
        body: {
          business_id: commonStore.business_id,
        },
      })

      // nếu không có dữ liệu thì thôi
      if (!RES.data) return
      // nếu có thông tin doanh nghiệp thì lưu lại
      if (RES.data?.business) commonStore.business_data = RES.data?.business
      // nếu có danh sách chi nhanh thì lưu lại
      if (RES.data?.branches) {
        commonStore.branches = RES.data?.branches

        commonStore.branches_ids = RES.data?.branches?.reduce(
          (acc: any, curr: any) => {
            acc[curr._id] = curr
            return acc
          },
          {}
        )
      }
      // nếu có danh sách nhân viên thì lưu lại
      if (RES.data?.users) commonStore.users = RES.data?.users
      // nếu có danh sách nhân sự thì lưu lại
      if (RES.data?.employees) {
        commonStore.employees_user_ids = {}
        commonStore.employees_ids = {}

        RES.data?.employees?.forEach((item: any) => {
          commonStore.employees_user_ids = {
            ...commonStore.employees_user_ids,
            [item.user_id]: item,
          }
          commonStore.employees_ids = {
            ...commonStore.employees_ids,
            [item._id]: item,
          }
        })
      }
      // nếu có thôn tin nhân sự hiện tại thì lưu lại
      if (RES?.data?.user) commonStore.user = RES?.data?.user
    } catch (e) {
      $toast.error(e)
    }
  }

  /** lưu thiết lập chu kỳ kinh doanh theo tháng */
  async function savesSettingPeriodMonthly() {
    try {
      await businessSaveSetting({
        body: {
          setting_type: 'monthly_business_period',
          setting_data: monthly_business_period.value?.setting_data,
        },
      })
    } catch (e) {
      throw e
    }
  }

  /** lưu thiết lập chu kỳ kinh doanh theo năm */
  async function savesSettingPeriodYearly() {
    try {
      await businessSaveSetting({
        body: {
          setting_type: 'year_business_period',
          setting_data: year_business_period.value?.setting_data,
        },
      })
    } catch (e) {
      throw e
    }
  }

  /** lưu thiết lập ngày nghỉ lễ */
  async function savesSettingHolidays() {
    try {
      await businessSaveSetting({
        body: {
          setting_type: 'holiday',
          setting_data: holidays.value?.setting_data,
        },
      })
    } catch (e) {
      throw e
    }
  }

  /** lưu thiết lập hình thức làm việc */
  async function savesSettingFormOfWork() {
    try {
      await businessSaveSetting({
        body: {
          setting_type: 'form_of_work',
          setting_data: form_of_work.value?.setting_data,
        },
      })
    } catch (e) {
      throw e
    }
  }

  /** lưu thiết lập thời gian làm việc */
  async function savesSettingTimeworking() {
    try {
      await businessSaveSetting({
        body: {
          setting_type: 'working_time',
          setting_data: working_time.value?.setting_data,
        },
      })
    } catch (e) {
      throw e
    }
  }

  /** lưu thiết lập hình nền */
  async function savesSettingBackground() {
    try {
      await businessSaveSetting({
        body: {
          setting_type: 'background',
          setting_data: background.value?.setting_data,
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
          ...business_data.value,
          id: business_data.value?._id,
        },
      })
    } catch (e) {
      $toast.error(e)
    }
  }

  /** lưu thiết lập ngày nghỉ lễ của chi nhánh */
async function saveBranchSettingHolidays() {
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

/** lưu thiết lập hình thức làm việc của chi nhánh */
async function saveBranchSettingFormOfWork() {
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

/** lưu thiết lập thời gian làm việc của chi nhánh */
async function saveBranchSettingTimeworking() {
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
  return {
    /** hàm lấy thông tin doanh nghiệp và chi nhánh */
    getBusinessInfos,
    /** lưu thiết lập chu kỳ kinh doanh theo tháng */
    savesSettingPeriodMonthly,
    /** lưu thiết lập chu kỳ kinh doanh theo năm */
    savesSettingPeriodYearly,
    /** lưu thiết lập ngày nghỉ lễ */
    savesSettingHolidays,
    /** lưu thiết lập hình thức làm việc */
    savesSettingFormOfWork,
    /** lưu thiết lập thời gian làm việc */
    savesSettingTimeworking,
    /** lưu thiết lập hình nền */
    savesSettingBackground,
    /** lưu thông tin doanh nghiệp */
    saveBusinessInfo,
    /** lưu thiết lập ngày nghỉ lễ của chi nhánh */
    saveBranchSettingFormOfWork,
    /** lưu thiết lập hình thức làm việc của chi nhánh */
    saveBranchSettingHolidays,
    /** lưu thiết lập thời gian làm việc của chi nhánh */
    saveBranchSettingTimeworking
  }
}
