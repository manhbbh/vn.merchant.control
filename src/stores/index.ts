import { type BranchData, type CompanyData, type EmployeeData } from '@/service/interface/business_setting'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common_store', () => {
  /**toggle loading toàn trang */
  const is_loading_full_screen = ref(false)

  /** token user */
  const user_token = ref('')

  /** id của business */
  const business_id = ref('')

	/** danh sách nhân viên */
  const employees = ref<{[key:string]:EmployeeData}>({})

	/** danh sách chi nhánh */
  const branches = ref<BranchData[]>([])

  /** dữ liệu của doanh nghiệp */
  const business_data = ref<CompanyData>({})

  return {
    user_token,
    business_id,
    is_loading_full_screen,
    employees,
    branches,
    business_data
  }
})
