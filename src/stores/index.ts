import { ref } from 'vue'
import { defineStore } from 'pinia'

import {
  PrimarySettingData,
  type BackgroundSetting,
  type BranchData,
  type CompanyData,
  type EmployeeData,
  type FormOfWork,
  type FullEmployeeData,
  type HolidaySetting,
  type MonthlyBusinessPeriod,
  type WorkingTimeSetting,
  type YearBusinessPeriod,
} from '@/service/interface'

export const useCommonStore = defineStore('common_store', () => {
  /**toggle loading toàn trang */
  const is_loading_full_screen = ref(false)

  /** token user */
  const user_token = ref('')

  /** id của business */
  const business_id = ref('')

  /** dữ liệu nhân viên hiện tại */
  const user = ref<{ _id?: string; first_name?: string; last_name?: string }>({})

  /** danh sách nhân viên */
  const users = ref<{ [key: string]: EmployeeData }>({})

  /** danh sách nhân viên */
  const employees = ref<{ [key: string]: FullEmployeeData }>({})

  /** danh sách nhân viên của 1 chi nhánh */
  const employees_branch = ref<FullEmployeeData[]>([])

  /** danh sách chi nhánh */
  const branches = ref<BranchData[]>([])

  /** dữ liệu của doanh nghiệp */
  const business_data = ref<CompanyData>({})

  /** dữ liệu chi nhánh đang chọn */
  const branch_data = ref<BranchData>({})

  /** dữ liệu chu kì kinh doanh theo tháng */
  const monthly_business_period = ref<MonthlyBusinessPeriod>({})

  /** dữ liệu chu kì kinh doanh theo năm */
  const year_business_period = ref<YearBusinessPeriod>({})

  /** dữ liệu nghỉ lễ */
  const holidays = ref<HolidaySetting>({})

  /** dữ liệu hình thức làm việc */
  const form_of_work = ref<FormOfWork>({})

  /** dữ liệu thời gian làm việc */
  const working_time = ref<WorkingTimeSetting>({})

  /** dữ liệu hình nền */
  const background = ref<BackgroundSetting>({})

  /** dữ liệu nghỉ lễ chi nhánh */
  const branch_holidays = ref<HolidaySetting>({})

  /** dữ liệu hình thức làm việc chi nhánh */
  const branch_form_of_work = ref<FormOfWork>({})

  /** dữ liệu thời gian làm việc chi nhánh */
  const branch_working_time = ref<WorkingTimeSetting>({})

  return {
    user_token,
    business_id,
    is_loading_full_screen,
    user,
    users,
    employees,
    employees_branch,
    branches,
    business_data,
    branch_data,
    monthly_business_period,
    year_business_period,
    holidays,
    form_of_work,
    working_time,
    background,
    branch_holidays,
    branch_form_of_work,
    branch_working_time,
  }
})
