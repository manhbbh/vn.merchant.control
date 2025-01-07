import { useCommonStore } from "@/stores"
import { requestAxios } from "@/service/api/request"

import { InputRequestApi } from "@/service/interface"

/** Lấy token business từ store */
function getBusinessToken() {
  const $store = useCommonStore()
  return $store.branch_data.access_token
}

/** request token timeboxing */
async function apiTimeboxingRequest({
  end_point,
  body,
  access_token,
}: InputRequestApi) {
  try {
    const RES = await requestAxios({
      uri: `${$env.host.timeboxing}/${end_point}`,
      method: 'POST',
      headers: {
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
export async function getSettingTimeboxing(params: InputRequestApi) {
  try {
    return await apiTimeboxingRequest({
      ...params,
      end_point: 'setting/get_setting',
    })
  } catch (e) {
    throw e
  }
}

/** lưu thiết lập timeboxing */
export async function saveSettingTimeboxing(params: InputRequestApi) {
  try {
    return await apiTimeboxingRequest({
      ...params,
      end_point: 'setting/save_setting',
    })
  } catch (e) {
    throw e
  }
}

/** lấy lịch sử thiết lập */
export async function getHistorySettingTimeboxing(params: InputRequestApi) {
  try {
    return await apiTimeboxingRequest({
      ...params,
      end_point: 'setting/get_setting_histories',
    })
  } catch (e) {
    throw e
  }
}