import { requestAxios } from '@/service/api/request'
import type { InputRequestApi } from '@/service/interface'
import { useCommonStore } from '@/stores'

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
  access_token,
}: InputRequestApi) {
  try {
    const RES = await requestAxios({
      uri: `${$env.host.merchant}/${end_point}`,
      method: 'POST',
      headers: {
        'token-user': getTokenUser(),
        'token-business': getBusinessToken(),
      },
      body,
    })

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

/** lấy danh sách nhân viên */
export async function getEmployee(params:InputRequestApi) {
  try {
    return await apiMerchantRequest({
      ...params,
      end_point: 'systems/employee/get_employee',
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