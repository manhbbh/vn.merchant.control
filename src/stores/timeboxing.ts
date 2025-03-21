import { ref } from 'vue'
import { defineStore } from 'pinia'

import {
  BranchData,
  EmployeeSetting,
  FormOfWorkData,
  FullEmployeeData,
  HistoryTimeboxingSetting,
} from '@/service/interface'

export const useTimeboxingStore = defineStore('timeboxing_store', () => {
  /** danh sách nhân viên dạng object*/
  const employees_ids = ref<{ [key: string]: FullEmployeeData }>({})
  
  /** danh sách nhân viên toàn bộ BM dạng object */
  const business_employees_ids = ref<{ [key: string]: FullEmployeeData }>({})

  /** Dữ liệu chi nhánh của doanh nghiệp */
  const business_branches = ref<{ [id: string]: BranchData }>({})

  /** profile */
  const profile = ref<FullEmployeeData>({})

  /** danh sách hình thức làm việc */
  const form_of_work = ref<FormOfWorkData>({})

  /** danh sách thiết lập nhân viên */
  const employee_setting = ref<EmployeeSetting[]>([])

  /** lịch sử thiết lập timeboxing */
  const history_timeboxing_setting = ref<HistoryTimeboxingSetting[]>([])

  return {
    employees_ids,
    business_employees_ids,
    business_branches,
    profile,
    form_of_work,
    employee_setting,
    history_timeboxing_setting
  }
})
