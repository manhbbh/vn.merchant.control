<template>
  <div
    class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconEmploye class="w-5 h-5"></IconEmploye>
    <!--content  -->
    <div class="flex flex-col gap-2 w-full overflow-hidden">
      <div class="flex h-5 items-center justify-between mb-3">
        <h4 class="flex justify-start text-sm font-medium">Nhân sự công ty</h4>
        <!-- <div
          class="flex items-center gap-2 bg-slate-100 py-3 px-3 h-5 cursor-pointer rounded-md"
          v-if="branch_data?._id"
          @click="openModal()"
        >
          <IconAdd class="w-4 h-4"></IconAdd>
          <p class="text-xs font-medium">Thêm nhân sự</p>
        </div> -->
      </div>
      <!-- danh sách nhân viên -->
      <div class="overflow-auto max-h-[60dvh]">
        <table class="w-full lg:min-w-max border-none bg-white rounded-lg z-10">
          <thead
            class="bg-slate-200 h-7 text-sm font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
          >
            <tr class="h-7">
              <th class="px-3 text-left font-semibold">#</th>
              <th class="px-3 text-left font-semibold">Họ và tên</th>
              <!-- <th class="px-3 text-left font-semibold">Email</th> -->
              <th
                v-if="!branch_data?._id"
                class="px-3 text-left font-semibold hidden md:table-cell"
              >
                Chi nhánh đang hoạt động
              </th>
              <th class="px-3 text-left font-semibold hidden md:table-cell">
                Ngày tạo
              </th>
              <th class="px-3 text-left font-semibold">Truy cập lần cuối</th>
              <th class="px-3 text-left font-semibold hidden md:table-cell">
                Trạng thái
              </th>
              <th class="px-3 text-left font-semibold hidden md:table-cell">
                Thao tác
              </th>
            </tr>
          </thead>
          <!--  -->
          <tbody>
            <RowEmployee
              v-for="(employee, index) in employee_list"
              :key="index"
              :employee="{
                name: `${employee.first_name || ''} ${
                  employee.last_name || ''
                }`?.trim(),
                email: employee.email,
                active: !branch_data?._id ? employee.active : !employee.archive,
                createdAt: employee.createdAt,
                branches: employee.branches,
                last_time_login: Object.values(employee?.last_time_login || {})?.[0]?.last_time_login || employee?.last_time_login,
              }"
              :handle-active="() => confirmActive(employee)"
              :index="index"
              :is_show_branch="!branch_data?._id"
            />
            <!-- stt-->
            <!-- tên viết tắt -->
            <!-- địa chỉ -->
            <!-- chi nhánh đang hoạt đông -->
            <!-- <tr
               v-for="(employee, index) in employee_list"
               :key="index"
               class="hover:bg-slate-100 text-black h-9 cursor-pointer text-sm overflow-y-auto"
             >
               <td class="py-2 text-left px-3 items-center space-x-4">
                 <p>{{ index + 1 }}</p>
               </td>
   
               <td class="text-left px-3 py-2 items-center space-x-4">
                 <p class="w-40 truncate">
                   {{ employee.first_name || '' }} {{ employee.last_name || '' }}
                 </p>
               </td>
   
               <td class="text-left px-3 py-2">
                 <p>{{ employee.email }}</p>
               </td>
   
               <td
                 class="text-left px-3 py-2 text-customGray hidden md:table-cell"
                 v-if="!branch_data?._id"
               >
                 <div class="flex max-w-48 gap-2 truncate">
                   <div
                     class="h-5 py-0.5 rounded bg-zinc-100 px-2 text-customDark text-xs font-medium"
                     v-for="branch in employee?.branches"
                   >
                     {{ branch?.name }}
                   </div>
                 </div>
               </td>
   
               <td class="text-left px-3 py-2 hidden md:table-cell">
                 <p class="text-sm" v-if="employee.createdAt">
                   {{ format(employee.createdAt, 'dd/MM/yyyy') }}
                 </p>
               </td>
   
               <td class="text-left px-3 py-2 hidden md:table-cell">
                 <p
                   class="text-sm"
                   :class="employee?.active ? 'text-green-500' : 'text-red-500'"
                 >
                   {{ employee?.active ? 'Đang hoạt động' : 'Không hoạt động' }}
                 </p>
               </td>
   
               <td class="text-left px-2 py-0.5 hidden md:table-cell">
                 <button
                   :class="{
                     'bg-green-500': employee?.active,
                     'bg-red-500': !employee.active,
                   }"
                   class="h-5 inline-flex items-center px-2 text-white rounded-md py-0.5"
                   @click="handleActive(employee)"
                 >
                   <p class="text-xs flex items-center font-medium">
                     {{ employee.active ? 'Kích hoạt' : 'Tạm ngừng' }}
                   </p>
                 </button>
               </td>
             </tr> -->
          </tbody>
        </table>
      </div>
    </div>
    <!-- modal thêm nhân viên -->
    <a-modal
      centered
      class="w-40"
      v-model:open="open"
      :auto-focus="false"
      @ok="handleOk"
      :footer="null"
      v-if="open"
    >
      <div class="flex flex-col w-full">
        <header class="flex items-center justify-between h-10 px-6 py-2">
          <h3 class="h-6 text-base font-semibold">Thêm nhân sự</h3>
          <button
            @click="open = false"
            class="p-1 rounded-md hover:bg-gray-300 hover:text-black"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </header>
        <!--  -->
        <main
          class="flex flex-col p-6 border-b border-t gap-2.5 border-gray-200"
        >
          <div class="flex flex-col gap-1">
            <p class="font-medium">Email</p>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
              placeholder="Nhập email nhân sự"
              v-model="form_add.email"
            />
          </div>
        </main>
        <footer class="flex items-center justify-between px-6 py-3">
          <button
            class="px-4 text-sm font-medium text-customDark py-2 border rounded-md border-slate-300"
            @click="open = false"
          >
            Hủy
          </button>
          <button
            class="px-4 py-2 text-sm text-white font-medium bg-primary rounded-md"
            @click="handleOk()"
          >
            Thêm nhân sự
          </button>
        </footer>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores'
import { Toast } from '@/service/helper/toast'
import {
  activeEmployee,
  businessAddEmployee,
  inactiveEmployee,
} from '@/service/api/api'

// * libraries
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { confirm } from '@/service/helper/alert'

// * components
import RowEmployee from '@/components/enterpriseSettings/RowEmployee.vue'

/**Icon*/
import IconAdd from '@/components/icons/IconAdd.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import IconEmploye from '@/components/icons/IconEmploye.vue'

// * interfaces
import { EmployeeData, FullEmployeeData } from '@/service/interface'

interface Employee extends EmployeeData, FullEmployeeData {}

// * store
const commonStore = useCommonStore()
const { employees_ids, branch_data, users, branches_ids, is_get_data } =
  storeToRefs(commonStore)

// * toast
const $toast = new Toast()

/** ẩn hiện modal */
const open = ref(false)

/** form thêm nhân viên */
const form_add = ref<{ email?: string }>({})

/** danh sách nhân viên */
const employee_list = computed<Employee[]>(() => {
  let result: Employee[] = []
  if (!branch_data.value?._id)
    result = Object.keys(users.value)?.map((id) => {
      return {
        ...users.value[id],
        _id: id,
      }
    })
  else {
    result = Object.values(employees_ids.value)?.filter(
      (user: FullEmployeeData) => user?.branch_id === branch_data.value?._id
    )
  }

  return result.sort((a, b) => {
    /** thời gian truy cập gần nhất của A */
    const A_LAST_TIME_LOGIN = Object.values(a?.last_time_login || {})?.[0]?.last_time_login || a?.last_time_login

    /** thời gian truy cập gần nhất của B */
    const B_LAST_TIME_LOGIN = Object.values(b?.last_time_login || {})?.[0]?.last_time_login || b?.last_time_login

    // Nếu cả 2 đều không có thì ko sắp xếp
    if (!A_LAST_TIME_LOGIN && !B_LAST_TIME_LOGIN) return 0

    // Nếu A không có thì cũng không sắp xếp
    if (!A_LAST_TIME_LOGIN) return 1

    // Nếu B không có thì sắp xếp
    if (!B_LAST_TIME_LOGIN) return -1

    // Nếu cả hai đều có last_time_login, so sánh giá trị
    return B_LAST_TIME_LOGIN - A_LAST_TIME_LOGIN
  })
})

/** hàm active/inactive nhân viên chi nhánh */
async function handleActive(employee: FullEmployeeData) {
  try {
    if (employee?.archive) {
      await activeEmployee({
        body: {
          email: employee?.email,
        },
      })
    } else {
      await inactiveEmployee({
        body: {
          email: employee?.email,
        },
      })
    }

    // cập nhật trong mảng nhân sự hiện tại
    if (employee._id)
      employees_ids.value[employee._id] = {
        ...employee,
        archive: !employee.archive,
      }

    // bật cờ gọi lại dữ liệu để cập nhật danh sách nhân sự ở BM hoặc chi nhánh
    is_get_data.value = true
  } catch (e) {
    $toast.error(e)
  }
}

/** hàm active/inactive nhân viên BM */
async function handleActiveBM(employee: EmployeeData) {
  try {
    const BRANCH_IDS = employee?.branch_ids || []

    for (let i = 0; i < BRANCH_IDS.length || 0; i++) {
      const BRANCH_ID = BRANCH_IDS[i]
      if (!employee?.active) {
        // thêm nhân viên
        await activeEmployee({
          body: {
            email: employee?.email,
          },
          headers: {
            'token-business': branches_ids.value[BRANCH_ID]?.access_token,
          },
        })
      } else {
        // xóa nhân viên
        await inactiveEmployee({
          body: {
            email: employee?.email,
          },
          headers: {
            'token-business': branches_ids.value[BRANCH_ID]?.access_token,
          },
        })
      }
    }

    // bật cờ gọi lại dữ liệu để cập nhật danh sách nhân sự ở BM hoặc chi nhánh
    is_get_data.value = true

    // cập nhật trong mảng nhân sự hiện tại
    if (employee?._id) users.value[employee?._id].active = !employee.active
  } catch (e) {
    $toast.error(e)
  }
}

/** hàm mở modal */
function openModal() {
  open.value = true
  form_add.value = {
    email: '',
  }
}

function confirmActive(employee: Employee) {
  confirm(
    'warning',
    'Xác nhận cập nhật trạng thái?',
    '',
    (is_cancel: boolean) => {
      if (is_cancel) return
      if (branch_data.value?._id) handleActive(employee)
      else handleActiveBM(employee)
    }
  )
}
/** hàm xác nhận */
async function handleOk() {
  try {
    const RES = await businessAddEmployee({ body: form_add.value })

    if (!RES.data || !RES.data.user_id) {
      throw 'Thêm thất bại'
    }

    // thông tin của người dùng được thêm nếu đã trong doanh nghiệp
    const USER = users.value?.[RES.data.user_id]

    //chưa có thì thêm vào danh sách
    if (!USER) {
      users.value = {
        ...users.value,
        [RES.data.user_id]: RES.data,
      }
    }
    // có rồi thì bổ sung chi nhánh hiện tại
    else {
      users.value[RES.data.user_id] = {
        ...USER,
        branch_ids: [...(USER?.branch_ids || []), branch_data.value?._id || ''],
        branches: [
          ...(USER?.branches || []),
          {
            _id: branch_data.value?._id,
            name: branch_data.value?.name,
          },
        ],
      }
    }
    $toast.success('Thêm nhân sự thành công')
  } catch (e) {
    $toast.error(e)
  } finally {
    open.value = false
  }
}
</script>
