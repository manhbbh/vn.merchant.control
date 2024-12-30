/** Thiết lập chấm công và làm việc của nhân viên */
export interface WorkingTimeSetting {
  /** Trạng thái làm việc */
  work_status?: 'day_off' | 'full_time' | 'part_time'
  /** Tình trạng hoạt động */
  active?: boolean
  /** Thời gian checkin */
  checkin?: {
      /** Giờ */
      hour?: number,
      /** Phút */
      minute?: number
  },
  /** Thời gian checkout */
  checkout?: {
      /** Giờ */
      hour?: number,
      /** Phút */
      minute?: number
  },
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
}

/** Chu kỳ kinh doanh tháng */
export interface MonthlyBusinessPeriod {
  /** Ngày bắt đầu */
  start?: number
  /** Ngày kết thúc */
  end?: number
}

/** Chu kỳ kinh doanh năm */
export interface YearBusinessPeriod {
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

/** Thiết lập ngày nghỉ lễ */
export interface HolidaySetting {
  [index: string]: {
      /** Tên ngày nghỉ lễ */
      name?: string
      /** Người tạo */
      created_by?: string
      /** Ngày tạo */
      created_time?: Date
  }
}

/** Thiết lập hình thức làm việc */
export interface FormOfWork {
  [index: string]: {
      /** Tên hình thức làm việc */
      name?: string
      /** Tổng thời gian làm việc */
      working_hours?: number
      /** Thời gian */
      working_time?: WorkingTimeSetting[]
      /** Người tạo */
      created_by?: string
      /** Thời gian tạo */
      created_time?: Date
  }
}

/** dữ liệu chi nhánh */
export interface BranchData {
  /** Phiên bản ứng dụng */
  VERSION_APP?: string;
  /** Phiên bản cơ sở dữ liệu */
  VERSION_DB?: string;
  /** Token truy cập */
  access_token?: string;
  /** Cờ lưu trữ (true nếu đã lưu trữ) */
  archive?: boolean;
  /** ID công ty */
  company_id?: string;
  /** Thời điểm tạo dữ liệu */
  createdAt?: string;
  /** ID duy nhất của chi nhánh */
  id?: string;
  /** Cờ xác định đây có phải là chi nhánh hay không */
  is_branch?: boolean;
  /** Cờ xác định trạng thái gộp chi nhánh */
  is_merge?: boolean;
  /** Cờ xác định đây có phải là kênh trực tuyến hay không */
  is_online_channel?: boolean;
  /** Cờ đồng bộ sản phẩm với Facebook */
  is_sync_facebook_product?: boolean;
  /** Tên chi nhánh */
  name?: string;
  /** ID của chủ sở hữu */
  owner?: string;
  /** Trạng thái ứng dụng (READY, ERROR, v.v.) */
  status_app?: string;
  /** Trạng thái cơ sở dữ liệu (READY, ERROR, v.v.) */
  status_db?: string;
  /** Tổng số người dùng trong chi nhánh */
  total_users?: number;
  /** Loại hình chi nhánh (headquarter, branch, v.v.) */
  type?: string;
  /** Thời điểm cập nhật dữ liệu gần nhất */
  updatedAt?: string;
  /** ID người dùng tạo dữ liệu */
  user_id?: string;
  /** Mã định danh của hệ thống */
  xnode?: string;
  /** Phiên bản của tài liệu */
  __v?: number;
  /** ID MongoDB của tài liệu */
  _id?: string;
}

/** dữ liệu chi nhánh trong dữ liệu nhân viên */
export interface BranchUserData {
  /** ID chi nhánh */
  _id?: string;
  /** Tên chi nhánh */
  name?: string;
}

/** dữ liệu nhân viên */
export interface EmployeeData {
  /** Trạng thái hoạt động */
  active?: boolean;
  /** Danh sách ID chi nhánh */
  branch_ids?: string[];
  /** Danh sách chi tiết các chi nhánh */
  branches?: BranchUserData[];
  /** Tên tài khoản hoặc chi nhánh */
  name?: string;
  /** ID MongoDB của tài liệu */
  _id?: string;
  /** Thời điểm tạo dữ liệu */
  createdAt?: Date;
  /** Email người dùng */
  email?: string;
  /** Họ của người dùng */
  first_name?: string;
  /** Tên của người dùng */
  last_name?: string;
}

/** dữ liệu doanh nghiệp */
export interface CompanyData {
  /** Phiên bản ứng dụng */
  VERSION_APP?: string;
  /** Phiên bản cơ sở dữ liệu */
  VERSION_DB?: string;
  /** Địa chỉ công ty */
  address?: string;
  /** Cờ lưu trữ (true nếu đã lưu trữ) */
  archive?: boolean;
  /** Thời điểm tạo dữ liệu */
  createdAt?: string;
  /** Ngày thành lập công ty */
  establish_date?: Date;
  /** ID duy nhất của công ty */
  id?: string;
  /** Cờ xác định đây có phải là chi nhánh hay không */
  is_branch?: boolean;
  /** Cờ xác định trạng thái gộp chi nhánh */
  is_merge?: boolean;
  /** Cờ xác định đây có phải là kênh trực tuyến hay không */
  is_online_channel?: boolean;
  /** Cờ đồng bộ sản phẩm với Facebook */
  is_sync_facebook_product?: boolean;
  /** Tên công ty */
  name?: string;
  /** ID của chủ sở hữu */
  owner?: string;
  /** Tên ngắn của công ty */
  short_name?: string;
  /** Trạng thái ứng dụng (READY, ERROR, v.v.) */
  status_app?: string;
  /** Trạng thái cơ sở dữ liệu (READY, ERROR, v.v.) */
  status_db?: string;
  /** Mã số thuế */
  tax_code?: string;
  /** Loại hình công ty (company, branch, v.v.) */
  type?: string;
  /** Thời điểm cập nhật dữ liệu gần nhất */
  updatedAt?: string;
  /** ID của người dùng tạo dữ liệu */
  user_id?: string;
  /** Mã định danh của hệ thống */
  xnode?: string;
  /** Phiên bản của tài liệu */
  __v?: number;
  /** ID MongoDB của tài liệu */
  _id?: string;
}