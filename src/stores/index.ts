import {
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
import { defineStore } from 'pinia'
import { ref } from 'vue'

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

  /** danh sách chi nhánh */
  const branches = ref<BranchData[]>([])

  /** dữ liệu của doanh nghiệp */
  const business_data = ref<CompanyData>({})

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

  return {
    user_token,
    business_id,
    is_loading_full_screen,
    user,
    users,
    employees,
    branches,
    business_data,
    monthly_business_period,
    year_business_period,
    holidays,
    form_of_work,
    working_time,
    background,
  }
})
