import { useCommonStore } from '@/stores'
import { requestAxios } from '@/service/api/request'

import type { InputRequestApi } from '@/service/interface'

/** Lấy token business từ store */
function getTokenUser() {
  const $store = useCommonStore()
  return $store.user_token
}

/** Lấy token business từ store */
function getBusinessToken() {
  const $store = useCommonStore()
  return $store.branch_data.access_token
}

/** Lấy id business từ store */
function getBusinessID() {
  const $store = useCommonStore()
  return $store.business_id
}

/** request api merchant */
async function apiMerchantRequest({
  end_point,
  body,
  headers,
  access_token,
}: InputRequestApi) {
  try {
    const RES = await requestAxios({
      uri: `${$env.host.merchant}/${end_point}`,
      method: 'POST',
      headers: {
        'token-user': getTokenUser(),
        'token-business': access_token || getBusinessToken(),
        ...headers,
      },
      body,
    })

    // nếu có lỗi thì throw lỗi ra
    if(RES?.context_error?.message) {
      throw RES?.context_error?.message
    }

    return RES
  } catch (e) {
    throw e
  }
}

/** Request api của sản phẩm */
async function apiProductRequest({
  end_point,
  body,
  access_token,
}: InputRequestApi) {
  try {
    const RES = await requestAxios({
      uri: `${$env.host.product}/${end_point}`,
      method: 'POST',
      headers: {
        'token-user': getTokenUser(),
        'token-business': getBusinessToken(),
      },
      body,
    })

    // * Trả về dữ liệu
    return RES
  } catch (e) {
    throw e
  }
}

/** lấy thông tin người dùng hiện tại */
export async function getUserInfo(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'apps/info/profile',
    })
  } catch (e) {
    throw e
  }
}

/** lấy danh sách nhân viên của chi nhánh */
export async function getEmployee(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      ...params.access_token ? { access_token: params.access_token } : {},
      end_point: 'systems/employee/get_employee',
    })
  } catch (e) {
    throw e
  }
}

/** Cập nhật thông tin nhân sự */
export async function updateEmployee(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      ...params.access_token ? { access_token: params.access_token } : {},
      end_point: 'systems/employee/update_employee',
    })
  } catch (e) {
    throw e
  }
}

/** lấy dữ liệu phòng ban, nhân viên, chi nhánh của toàn bộ BM */
export async function getBusinessEmployee(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'apps/info/business_employees',
    })
  } catch (e) {
    throw e
  }
}

/** Upload ảnh */
export async function uploadImage(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'internals/attachment/upload',
    })
  } catch (e) {
    throw e
  }
}

/** Lấy danh sách nhân sự liên kết */
export async function getLinkedUser(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'business/get_linked_users',
    })
  } catch (e) {
    throw e
  }
}

/** liên kết user của bm với bm khác */
export async function linkUser(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'business/link_user',
    })
  } catch (e) {
    throw e
  }
}

// * Thiết lập doanh nghiệp
/** lấy danh sách thiết lập */
export async function getSetting(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'business/get_setting',
    })
  } catch (e) {
    throw e
  }
}

/** lấy thông tin doanh nghiệp */
export async function getBusinessInfo(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'business/get_business_info',
    })
  } catch (e) {
    throw e
  }
}

/** Lưu thiết lập doanh nghiệp */
export async function businessSaveSetting(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'business/save_setting',
      body: { ...params.body, business_id: getBusinessID() },
    })
  } catch (e) {
    throw e
  }
}

/** cập nhật thông tin doanh nghiệp */
export async function businessUpdate(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'business/update_business',
    })
  } catch (e) {
    throw e
  }
}

/** lấy danh sách doanh nghiệp */
export async function getBusiness(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'business/get_business',
    })
  } catch (e) {
    throw e
  }
}

/** api cập nhật doanh nghiệp */
export async function updateBusiness(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'business/update_business',
    })
  } catch (e) {
    throw e
  }
}

// * Thiết lập chi nhánh
/** thêm mới chi nhánh */
export async function businessAddBranch(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'business/create_branch',
    })
  } catch (e) {
    throw e
  }
}

/** thêm mới nhân viên */
export async function businessAddEmployee(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'systems/employee/create_employee',
    })
  } catch (e) {
    throw e
  }
}

/** lưu thiết lập chi nhánh */
export async function branchSaveSetting(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'systems/branchsetting/save_setting',
    })
  } catch (e) {
    throw e
  }
}

/** lấy danh sách thiết lập */
export async function getSettingBranch(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'systems/branchsetting/get_setting',
    })
  } catch (e) {
    throw e
  }
}

/** kích hoạt nhân viên */
export async function activeEmployee(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'systems/employee/create_employee',
    })
  } catch (e) {
    throw e
  }
}

/** tạm ngừng nhân viên */
export async function inactiveEmployee(params: InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'systems/employee/delete_employee',
    })
  } catch (e) {
    throw e
  }
}

// * API LOCATION
/** Lấy danh sách tỉnh thành */
export const getProvince = async (data: {}) => {
  try {
    return await apiProductRequest({
      body: data,
      end_point: 'locations/province',
    })
  } catch (e) {
    throw e
  }
}

/** Lấy danh sách quận huyện */
export const getDistrict = async (data: {}) => {
  try {
    return await apiProductRequest({
      body: data,
      end_point: 'locations/district',
    })
  } catch (e) {
    throw e
  }
}

/** Lấy danh sách xã phường */
export const getWard = async (data: {}) => {
  try {
    return await apiProductRequest({
      body: data,
      end_point: 'locations/ward',
    })
  } catch (e) {
    throw e
  }
}

/**
 * @deprecated
 * Nhận diện địa chỉ cũ
 * */
export const detectAddress = async (data: {}) => {
  try {
    return await apiProductRequest({
      body: data,
      end_point: 'locations/detect_address',
    })
  } catch (e) {
    throw e
  }
}

/** nhận diện địa chỉ mới */
export const detectAddressV2 = async (data: {}) => {
  try {
    return await apiProductRequest({
      body: data,
      end_point: 'locations/detect_address_v2',
    })
  } catch (e) {
    throw e
  }
}

/** Lấy ra thông tin chi tiết địa chỉ */
export const getAddress = async (data: {}) => {
  try {
    return await apiProductRequest({
      body: data,
      end_point: 'locations/get_address',
    })
  } catch (e) {
    throw e
  }
}


