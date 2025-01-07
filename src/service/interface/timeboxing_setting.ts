/**
 * Employee - Nhân viên
 */
export interface EmployeeSetting {
  /** salary_p2 */
  salary_p2?: number
  /** updated_by */
  updated_by?: string
  /** employee_id */
  employee_id?: string
  /** updated_time */
  updated_time?: Date
  /** working_time_id */
  working_time_id?: string
  /** thời gian làm việc chủ động */
  proactive_percent?: number
  /** thời gian làm việc bị động */
  passive_percent?: number
  /**  */
  paying_when_rejected?: boolean
}

/** thiết lập timeboxing */
export interface TimeboxingSetting {
  /** ID */
  id?: number;
  /** Loại cài đặt */
  type?: string;
  /** Dữ liệu */
  data?: {
    /** Danh sách nhân viên */
    employees?: EmployeeSetting[];
    /** gửi thông báo telegram */
    send_notification?: boolean
  };
  /** ID cài đặt */
  setting_id?: string;
  /** ID nhân viên */
  employee_id?: string;
  /** ID nhóm */
  team_id?: string | null;
  /** ID phòng ban */
  department_id?: string | null;
  /** ID chi nhánh */
  branch_id?: string | null;
  /** ID doanh nghiệp */
  business_id?: string;
  /** ID người dùng */
  user_id?: string;
  /** Ngày tạo */
  createdAt?: string;
  /** Ngày cập nhật */
  updatedAt?: string;
}

/** dữ liệu lịch sử chấm công */
export interface HistoryTimeboxingSetting {
  /** ID duy nhất */
  id?: number;
  /** Loại bản ghi */
  type?: string;
  /** Dữ liệu cũ của bản ghi */
  old_data?: {
    employees?: EmployeeSetting[]
  };
  /** Dữ liệu mới của bản ghi */
  new_data?: {
    employees?: EmployeeSetting[]
  };
  /** ID của nhân viên */
  employee_id?: string;
  /** ID của nhóm */
  team_id?: string | null;
  /** ID của phòng ban */
  department_id?: string;
  /** ID của chi nhánh */
  branch_id?: string;
  /** ID của doanh nghiệp */
  business_id?: string;
  /** ID của người dùng */
  user_id?: string;
  /** Thời gian tạo bản ghi */
  createdAt?: string;
  /** Thời gian cập nhật bản ghi */
  updatedAt?: string;
}