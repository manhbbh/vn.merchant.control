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
  return ''
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
