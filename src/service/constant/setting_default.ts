import {
  BackgroundSettingData,
  FormOfWorkData,
  HolidaySettingData,
  MonthlyBusinessPeriodData,
  WorkingTimeSetting,
  WorkingTimeSettingData,
  YearBusinessPeriodData,
} from '../interface'

/** Thiết lập mặc định */
export const setting: {
  monthly_business_period: MonthlyBusinessPeriodData
  year_business_period: YearBusinessPeriodData
  holiday: HolidaySettingData
  working_time: WorkingTimeSettingData
  form_of_work: FormOfWorkData
  background: BackgroundSettingData
} = {
  /** Chu kỳ kinh doanh tháng */
  monthly_business_period: {
    /** Ngày bắt đầu chu kỳ kinh doanh của tháng */
    start: 1,

    /** Ngày kết thúc chu kỳ kinh doanh của tháng */
    end: 32,
  },

  /** Chu kỳ kinh doanh năm */
  year_business_period: {
    /** Ngày/tháng bắt đầu chu kỳ kinh doanh của năm */
    start: {
      day: 21,
      month: 1,
    },

    /** Ngày/tháng kết thúc chu kỳ kinh doanh của năm */
    end: {
      day: 20,
      month: 12,
    },
  },

  /** Thiết lập ngày nghỉ lễ */
  holiday: {
    '1/1': {
      name: 'Nghỉ tết dương lịch',
      created_by: '',
      created_time: '',
    },
    '30/4': {
      name: 'Nghỉ lễ quốc tế lao động',
      created_by: '',
      created_time: '',
    },
    '1/5': {
      name: 'Nghỉ lễ quốc tế lao động',
      created_by: '',
      created_time: '',
    },
    '2/9': {
      name: 'Nghỉ lễ quốc khánh',
      created_by: '',
      created_time: '',
    },
  },

  /** Thời gian làm việc */
  working_time: {
    /** Múi giờ */
    time_zone: 'GMT +7:00 Hanoi, Bangkok, Jakarta',

    /** Thời gian làm việc của tổ chức */
    organization_working_time: {
      /** Trạng thái kích hoạt */
      active: true,

      /** Các ngày làm việc trong tuần */
      working_time: [
        {
          title: 'Thứ hai',
          checkin: {
            hour: 7,
            minute: 0,
          },
          checkout: {
            hour: 22,
            minute: 0,
          },
          active: true,
        },
        {
          title: 'Thứ ba',
          checkin: {
            hour: 7,
            minute: 0,
          },
          checkout: {
            hour: 22,
            minute: 0,
          },
          active: true,
        },
        {
          title: 'Thứ tư',
          checkin: {
            hour: 7,
            minute: 0,
          },
          checkout: {
            hour: 22,
            minute: 0,
          },
          active: true,
        },
        {
          title: 'Thứ năm',
          checkin: {
            hour: 7,
            minute: 0,
          },
          checkout: {
            hour: 22,
            minute: 0,
          },
          active: true,
        },
        {
          title: 'Thứ sáu',
          checkin: {
            hour: 7,
            minute: 0,
          },
          checkout: {
            hour: 22,
            minute: 0,
          },
          active: true,
        },
        {
          title: 'Thứ bảy',
          checkin: {
            hour: 7,
            minute: 0,
          },
          checkout: {
            hour: 22,
            minute: 0,
          },
          active: true,
        },
        {
          title: 'Chủ nhật',
          checkin: {
            hour: 7,
            minute: 0,
          },
          checkout: {
            hour: 22,
            minute: 0,
          },
          active: false,
        },
      ],
    },
  },

  /**
   * Hình thức làm việc
   * full_time: Toàn thời gian (Giờ làm cố định)
   * part_time: Bán thời gian (Giờ làm không cố định)
   * day_off: Ngày nghỉ
   * */
  form_of_work: {
    '1': {
      name: 'Toàn thời gian',
      working_hours: 45,
      working_time: [
        {
          title: 'Thứ hai',
          checkin: {
            hour: 9,
            minute: 0,
          },
          checkout: {
            hour: 18,
            minute: 0,
          },
          rest: {
            from: {
              hour: 12,
              minute: 0,
            },
            to: {
              hour: 13,
              minute: 30,
            },
          },
          active: true,
          work_status: 'full_time',
          working_hours: 7.5,
          rest_hours: 1.5,
        },
        {
          title: 'Thứ ba',
          checkin: {
            hour: 9,
            minute: 0,
          },
          checkout: {
            hour: 18,
            minute: 0,
          },
          rest: {
            from: {
              hour: 12,
              minute: 0,
            },
            to: {
              hour: 13,
              minute: 30,
            },
          },
          active: true,
          work_status: 'full_time',
          working_hours: 7.5,
          rest_hours: 1.5,
        },
        {
          title: 'Thứ tư',
          checkin: {
            hour: 9,
            minute: 0,
          },
          checkout: {
            hour: 18,
            minute: 0,
          },
          rest: {
            from: {
              hour: 12,
              minute: 0,
            },
            to: {
              hour: 13,
              minute: 30,
            },
          },
          active: true,
          work_status: 'full_time',
          working_hours: 7.5,
          rest_hours: 1.5,
        },
        {
          title: 'Thứ năm',
          checkin: {
            hour: 9,
            minute: 0,
          },
          checkout: {
            hour: 18,
            minute: 0,
          },
          rest: {
            from: {
              hour: 12,
              minute: 0,
            },
            to: {
              hour: 13,
              minute: 30,
            },
          },
          active: true,
          work_status: 'full_time',
          working_hours: 7.5,
          rest_hours: 1.5,
        },
        {
          title: 'Thứ sáu',
          checkin: {
            hour: 9,
            minute: 0,
          },
          checkout: {
            hour: 18,
            minute: 0,
          },
          rest: {
            from: {
              hour: 12,
              minute: 0,
            },
            to: {
              hour: 13,
              minute: 30,
            },
          },
          active: true,
          work_status: 'full_time',
          working_hours: 7.5,
          rest_hours: 1.5,
        },
        {
          title: 'Thứ bảy',
          checkin: {
            hour: 9,
            minute: 0,
          },
          rest: {
            from: {
              hour: 12,
              minute: 0,
            },
            to: {
              hour: 13,
              minute: 30,
            },
          },
          checkout: {
            hour: 18,
            minute: 0,
          },
          active: true,
          work_status: 'full_time',
          working_hours: 7.5,
          rest_hours: 1.5,
        },
        {
          title: 'Chủ nhật',
          checkin: {
            hour: 9,
            minute: 0,
          },
          checkout: {
            hour: 18,
            minute: 0,
          },
          active: false,
          work_status: 'day_off',
          working_hours: 0,
          rest_hours: 0,
        },
      ],
      created_by: '',
      created_time: '',
    },
  },

  /** Hình nền */
  background: {
    /** hình nền trên máy tính */
    pc: [],

    /** hình nền trên điện thoại */
    mobile: [],
  },
}
