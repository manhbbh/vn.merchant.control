import { LocationDetail } from './location'

/** Thiết lập chấm công và làm việc của nhân viên */
export interface WorkingTimeSettingData {
  /** Trạng thái làm việc */
  work_status?: 'day_off' | 'full_time' | 'part_time'
  /** Tình trạng hoạt động */
  active?: boolean
  /** Thời gian checkin */
  checkin?: {
    /** Giờ */
    hour?: number
    /** Phút */
    minute?: number
  }
  /** Thời gian checkout */
  checkout?: {
    /** Giờ */
    hour?: number
    /** Phút */
    minute?: number
  }
  /** Tên lịch làm việc */
  title?: string
  /** Lý do nghỉ */
  reason?: {
    /** Lý do xin nghỉ */
    reason_message?: string
    /** Dạng xin nghỉ */
    reason_type?: string
  }
  /** Số giờ làm việc 1 ngày */
  working_hours?: number

  /** thời gian nghỉ */
  rest?: {
    from?: {
      hour?: number
      minute?: number
    }
    to?: {
      hour?: number
      minute?: number
    }
  }
  /** số giờ nghỉ */
  rest_hours?: number
}

/** dữ liệu cài đặt cơ bản */
export interface PrimarySettingData {
  /** ID của cài đặt */
  _id?: string
  /** Đã được lưu trữ hay chưa */
  archive?: boolean
  /** ID của doanh nghiệp */
  business_id?: string
  /** Loại hình doanh nghiệp */
  business_type?: string
  /** Có thể lưu trữ hay không */
  canArchive?: boolean
  /** Thời gian tạo */
  createdAt?: string
  /** ID của người tạo */
  createdBy?: string
  /** Loại cài đặt (ví dụ: monthly_business_period) */
  setting_type?: string
  /** Thời gian cập nhật */
  updatedAt?: string
  /** ID của người cập nhật */
  updatedBy?: string
  /** ID của người dùng */
  user_id?: string
  /** Phiên bản */
  __v?: number
}

/** Dữ liệu chu kỳ kinh doanh tháng */
export interface MonthlyBusinessPeriodData {
  /** Ngày bắt đầu */
  start?: number
  /** Ngày kết thúc */
  end?: number
}

/** Dữ liệu thiết lập ngày nghỉ lễ */
export interface HolidaySettingData {
  [index: string]: {
    /** Tên ngày nghỉ lễ */
    name?: string
    /** Người tạo */
    created_by?: string
    /** Ngày tạo */
    created_time?: Date | string
  }
}

/** Dữ liệu thiết lập phép năm */
export interface AnnualLeaveYearData{
  /** Số ngày nghỉ */
  annual_leave_days?: number, 
  /** Tự động xóa */
  auto_clear?: boolean
}

/** Dữ liệu chu kỳ kinh doanh năm */
export interface YearBusinessPeriodData {
  /** Ngày tháng bắt đầu */
  start?: {
    day?: number
    month?: number
  }
  /** Ngày tháng kết thúc */
  end?: {
    day?: number
    month?: number
  }
}

/** Dữ liệu thiết lập hình thức làm việc */
export interface FormOfWorkData {
  [index: string]: {
    /** Tên hình thức làm việc */
    name?: string
    /** Tổng thời gian làm việc */
    working_hours?: number
    /** Thời gian */
    working_time?: WorkingTimeSettingData[]
    /** Người tạo */
    created_by?: string
    /** Thời gian tạo */
    created_time?: Date | string
  }
}

interface WorkingTimeDay {
  /** Tên của ngày trong tuần (ví dụ: "Thứ hai") */
  title?: string
  /** Thời gian check-in */
  checkin?: {
    /** Giờ check-in */
    hour?: number
    /** Phút check-in */
    minute?: number
  }
  /** Thời gian check-out */
  checkout?: {
    /** Giờ check-out */
    hour?: number
    /** Phút check-out */
    minute?: number
  }

  /** Trạng thái hoạt động của ngày (true: làm việc, false: nghỉ) */
  active?: boolean
}

interface OrganizationWorkingTime {
  /** Trạng thái hoạt động (true: đang hoạt động, false: không hoạt động) */
  active?: boolean
  /** Thời gian làm việc cho mỗi ngày trong tuần (mảng 7 phần tử, mỗi phần tử đại diện cho một ngày) */
  working_time?: WorkingTimeDay[]
}

/** dữ liệu thiết lập thời gian làm việc */
export interface WorkingTimeSettingData {
  /** Cài đặt thời gian làm việc của tổ chức */
  organization_working_time?: OrganizationWorkingTime
  /** Múi giờ của tổ chức (ví dụ: "+7") */
  time_zone?: string
}

/** dữ liệu thiết lập background */
export interface BackgroundSettingData {
  pc?: {
    /** link ảnh */
    link?: string
    /** người tạo */
    created_by?: string
    /** trạng thái */
    active?: boolean
  }[]
  mobile?: {
    /** link ảnh */
    link?: string
    /** người tạo */
    created_by?: string
    /** trạng thái */
    active?: boolean
  }[]
}

/** Chu kỳ kinh doanh theo tháng */
export interface MonthlyBusinessPeriod extends PrimarySettingData {
  setting_data?: MonthlyBusinessPeriodData
}

/** Chu kỳ kinh doanh theo năm */
export interface YearBusinessPeriod extends PrimarySettingData {
  /** ID của cài đặt */
  _id?: string
  /** Đã được lưu trữ hay chưa */
  archive?: boolean
  /** ID của doanh nghiệp */
  business_id?: string
  /** Loại hình doanh nghiệp */
  business_type?: string
  /** Có thể lưu trữ hay không */
  canArchive?: boolean
  /** Thời gian tạo */
  createdAt?: string
  /** ID của người tạo */
  createdBy?: string
  /** Dữ liệu cài đặt */
  setting_data?: YearBusinessPeriodData
  /** Loại cài đặt (ví dụ: year_business_period) */
  setting_type?: string
  /** Thời gian cập nhật */
  updatedAt?: string
  /** ID của người cập nhật */
  updatedBy?: string
  /** ID của người dùng */
  user_id?: string
  /** Phiên bản */
  __v?: number
}

/** Cách tính lương */
export enum CalculationMethod {
  /** Tính đủ P1 và P2 */
  P1_AND_P2 = 'P1_AND_P2',
  /** Tính P1 */
  ONLY_P1 = 'ONLY_P1',
  /** Tính P2 */
  ONLY_P2 = 'ONLY_P2',
  /** Không tính */
  NONE = 'NONE'
}

/** Thiết lập ngày nghỉ lễ */
export interface HolidaySetting extends PrimarySettingData {
  setting_data?: HolidaySettingData
  calculate_holiday_pay?: CalculationMethod
}

/** thiết lập hình thức làm việc */
export interface FormOfWork extends PrimarySettingData {
  setting_data?: FormOfWorkData
}

/** thiếp lập phép năm */
export interface AnnualLeaveYear extends PrimarySettingData {
  setting_data?: AnnualLeaveYearData
  calculate_holiday_pay?: CalculationMethod
}

/** thiết lập thời gian làm việc */
export interface WorkingTimeSetting extends PrimarySettingData {
  setting_data?: WorkingTimeSettingData
}

/** thiết lập background */
export interface BackgroundSetting extends PrimarySettingData {
  setting_data?: BackgroundSettingData
}

/** dữ liệu chi nhánh */
export interface BranchData {
  /** Phiên bản ứng dụng */
  VERSION_APP?: string
  /** Phiên bản cơ sở dữ liệu */
  VERSION_DB?: string
  /** Token truy cập */
  access_token?: string
  /** Cờ lưu trữ (true nếu đã lưu trữ) */
  archive?: boolean
  /** ID công ty */
  company_id?: string
  /** Thời điểm tạo dữ liệu */
  createdAt?: string
  /** ID duy nhất của chi nhánh */
  id?: string
  /** Cờ xác định đây có phải là chi nhánh hay không */
  is_branch?: boolean
  /** Cờ xác định trạng thái gộp chi nhánh */
  is_merge?: boolean
  /** Cờ xác định đây có phải là kênh trực tuyến hay không */
  is_online_channel?: boolean
  /** Cờ đồng bộ sản phẩm với Facebook */
  is_sync_facebook_product?: boolean
  /** Tên chi nhánh */
  name?: string
  /** tên viết tắt */
  short_name?: string
  /** ID của chủ sở hữu */
  owner?: string
  /** Trạng thái ứng dụng (READY, ERROR, v.v.) */
  status_app?: string
  /** Trạng thái cơ sở dữ liệu (READY, ERROR, v.v.) */
  status_db?: string
  /** Tổng số người dùng trong chi nhánh */
  total_users?: number
  /** Loại hình chi nhánh (headquarter, branch, v.v.) */
  type?: string
  /** Thời điểm cập nhật dữ liệu gần nhất */
  updatedAt?: string
  /** ID người dùng tạo dữ liệu */
  user_id?: string
  /** Mã định danh của hệ thống */
  xnode?: string
  /** Phiên bản của tài liệu */
  __v?: number
  /** ID MongoDB của tài liệu */
  _id?: string
  /** id người dùng chủ sở hữu */
  business_owner_id?: string
  /** ngày thành lập */
  establish_date?: Date
  /** địa chỉ */
  address?: string
  /** địa chỉ cụ thể */
  locations?: LocationDetail
  /** logo */
  logo?: string
  /** quốc gia */
  country_code?: string
  /** tiền tệ */
  currency?: string

  redirect_to?: string
}

/** dữ liệu chi nhánh trong dữ liệu nhân viên */
export interface BranchUserData {
  /** ID chi nhánh */
  _id?: string
  /** Tên chi nhánh */
  name?: string
}

/** dữ liệu nhân viên */
export interface EmployeeData {
  /** Trạng thái hoạt động */
  active?: boolean
  /** Danh sách ID chi nhánh */
  branch_ids?: string[]
  /** Danh sách chi tiết các chi nhánh */
  branches?: BranchUserData[]
  /** Tên tài khoản hoặc chi nhánh */
  name?: string
  /** ID MongoDB của tài liệu */
  _id?: string
  /** Thời điểm tạo dữ liệu */
  createdAt?: Date
  /** Email người dùng */
  email?: string
  /** Họ của người dùng */
  first_name?: string
  /** Tên của người dùng */
  last_name?: string
  /** lần truy cập gần nhất */
  last_time_login?:
    | {
        [key: string]: {
          branch_name?: string
          last_time_login?: number
        }
      }
    | number
}

/** dữ liệu doanh nghiệp */
export interface CompanyData {
  /** Phiên bản ứng dụng */
  VERSION_APP?: string
  /** Phiên bản cơ sở dữ liệu */
  VERSION_DB?: string
  /** Địa chỉ công ty */
  address?: string
  /** Cờ lưu trữ (true nếu đã lưu trữ) */
  archive?: boolean
  /** Thời điểm tạo dữ liệu */
  createdAt?: string
  /** Ngày thành lập công ty */
  establish_date?: Date
  /** ID duy nhất của công ty */
  id?: string
  /** Cờ xác định đây có phải là chi nhánh hay không */
  is_branch?: boolean
  /** Cờ xác định trạng thái gộp chi nhánh */
  is_merge?: boolean
  /** Cờ xác định đây có phải là kênh trực tuyến hay không */
  is_online_channel?: boolean
  /** Cờ đồng bộ sản phẩm với Facebook */
  is_sync_facebook_product?: boolean
  /** Tên công ty */
  name?: string
  /** ID của chủ sở hữu */
  owner?: string
  /** Tên ngắn của công ty */
  short_name?: string
  /** Trạng thái ứng dụng (READY, ERROR, v.v.) */
  status_app?: string
  /** Trạng thái cơ sở dữ liệu (READY, ERROR, v.v.) */
  status_db?: string
  /** Mã số thuế */
  tax_code?: string
  /** Loại hình công ty (company, branch, v.v.) */
  type?: string
  /** Thời điểm cập nhật dữ liệu gần nhất */
  updatedAt?: string
  /** ID của người dùng tạo dữ liệu */
  user_id?: string
  /** Mã định danh của hệ thống */
  xnode?: string
  /** Phiên bản của tài liệu */
  __v?: number
  /** ID MongoDB của tài liệu */
  _id?: string
  /** logo */
  logo?: string
  /** quốc gia */
  country_code?: string
  /** tiền tệ */
  currency?: string
  redirect_to?: string

  // * CUSTOME
  /** danh sách các chi nhánh */
  branchs?: {
    [key: string]: BusinessBranchData
  }
}

/**
 * Dữ liệu tổng thể của người dùng trong doanh nghiệp/chi nhánh
 */
export interface BusinessBranchData {
  /** ID doanh nghiệp */
  business_id: string;

  /** ID chi nhánh hiện tại */
  branch_id: string;

  /** ID phòng ban mà người dùng thuộc về */
  department_id: string;

  /** ID nhóm (nếu có, có thể để trống) */
  team_id: string;

  /** ID nhân viên hiện tại */
  employee_id: string;

  /** ID người dùng hiện tại */
  user_id: string;

  /** ID quyền hạn người dùng */
  permission_id: string;

  /** Tên chi nhánh hiện tại */
  branch_name: string;

  /** Thông tin mở rộng của chi nhánh (có thể rỗng hoặc thêm về sau) */
  branch_info: Record<string, any>;

  /** Có phải đang hoạt động tại chi nhánh không */
  is_branch: boolean;

  /** Loại chi nhánh (branch, head_office,...) */
  branch_type: string;

  /** Chi nhánh đã bị lưu trữ hay chưa */
  archive: boolean;

  /** Ngày tạo bản ghi */
  createdAt: string;

  /** Ngày cập nhật gần nhất */
  updatedAt: string;

  /** Token truy cập cho doanh nghiệp (JWT) */
  token_business: string;

  /** Người dùng có phải là chủ doanh nghiệp hay không */
  is_owner_business: boolean;

  /** doanh nghiệp của BU đó */
  business?: CompanyData

  redirect_to?: string
}
