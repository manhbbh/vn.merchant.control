import { useCommonStore } from '@/stores'
import { Toast } from '@/service/helper/toast'
import { getBusinessInfo } from '@/service/api/api'

export function useGetData() {
  // * store
  const commonStore = useCommonStore()

  // * toast
  const $toast = new Toast()

  /** hàm lấy thông tin doanh nghiệp và chi nhánh */
  async function getBusinessInfos() {
    try {
      const RES = await getBusinessInfo({
        body: {
          business_id: commonStore.business_id,
        },
      })

      // nếu không có dữ liệu thì thôi
      if (!RES.data) return
      // nếu có thông tin doanh nghiệp thì lưu lại
      if (RES.data?.business) commonStore.business_data = RES.data?.business
      // nếu có danh sách chi nhanh thì lưu lại
      if (RES.data?.branches) {
        commonStore.branches = RES.data?.branches

        commonStore.branches_ids = RES.data?.branches?.reduce(
          (acc: any, curr: any) => {
            acc[curr._id] = curr
            return acc
          },
          {}
        )
      }
      // nếu có danh sách nhân viên thì lưu lại
      if (RES.data?.users) commonStore.users = RES.data?.users
      // nếu có danh sách nhân sự thì lưu lại
      if (RES.data?.employees) {
        commonStore.employees_user_ids = {}
        commonStore.employees_ids = {}

        RES.data?.employees?.forEach((item: any) => {
          commonStore.employees_user_ids = {
            ...commonStore.employees_user_ids,
            [item.user_id]: item,
          }
          commonStore.employees_ids = {
            ...commonStore.employees_ids,
            [item._id]: item,
          }
        })
      }
      // nếu có thôn tin nhân sự hiện tại thì lưu lại
      if (RES?.data?.user) commonStore.user = RES?.data?.user
    } catch (e) {
      $toast.error(e)
    }
  }

  return { getBusinessInfos }
}
