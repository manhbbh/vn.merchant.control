<template>
  <div
    class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconEmploye class="w-5 h-5"></IconEmploye>
    <!--content  -->
    <div class="flex flex-col gap-2 w-full">
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
      <table class="min-w-full border-none bg-white rounded-lg z-10">
        <thead
          class="bg-slate-200 h-7 text-sm font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
        >
          <tr class="h-7">
            <th class="px-3 text-left font-semibold">#</th>
            <th class="px-3 text-left font-semibold">Họ và tên</th>
            <th class="px-3 text-left font-semibold">Email</th>
            <th class="px-3 text-left font-semibold hidden md:table-cell">
              Chi nhánh đang hoạt động
            </th>
            <th class="px-3 text-left font-semibold hidden md:table-cell">
              Ngày tạo
            </th>
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
          <tr
            v-for="(employee, index) in employees"
            :key="index"
            class="hover:bg-slate-100 text-black h-9 cursor-pointer text-sm overflow-y-auto"
          >
            <!-- stt-->
            <td class="py-2 text-left px-3 items-center space-x-4">
              <p>{{ index + 1 }}</p>
            </td>
            <!-- tên viết tắt -->
            <td class="text-left px-3 py-2 items-center space-x-4">
              <p class="w-40 truncate">
                {{ employee.first_name || '' }} {{ employee.last_name || '' }}
              </p>
            </td>

            <!-- địa chỉ -->
            <td class="text-left px-3 py-2">
              <p>{{ employee.email }}</p>
            </td>

            <!-- chi nhánh đang hoạt đông -->
            <td
              class="text-left px-3 py-2 text-customGray hidden md:table-cell"
            >
              <div class="flex max-w-48 gap-2 truncate">
              <div
                class="h-5 py-0.5 rounded bg-zinc-100 px-2 text-customDark text-xs font-medium"
                v-for="branch in employee.branches"
              >
                {{ branch?.name }}
              </div>
              </div>
            </td>

            <!-- ngày tạo -->
            <td class="text-left px-3 py-2 hidden md:table-cell">
              <p class="text-sm" v-if="employee.createdAt">
                {{ format(employee.createdAt, 'dd/MM/yyyy') }}
              </p>
            </td>

            <!-- trạng thái -->
            <td class="text-left px-3 py-2 hidden md:table-cell">
              <p
                class="text-sm"
                :class="employee?.active ? 'text-green-500' : 'text-red-500'"
              >
                {{ employee?.active ? 'Đang hoạt động' : 'Không hoạt động' }}
              </p>
            </td>
            <!-- thao tác -->
            <td class="text-left px-2 py-0.5 hidden md:table-cell">
              <div
                :class="{
                  'bg-green-500': employee?.active,
                  'bg-red-500': !employee.active,
                }"
                class="h-5 inline-flex items-center px-2 text-white rounded-md py-0.5"
              >
                <p class="text-xs flex items-center font-medium">
                  {{ employee.active ? 'Kích hoạt' : 'Tạm dừng' }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
            <XMarkIcon class="w-5 h-5"/>
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
import { businessAddEmployee } from '@/service/api/api'

// * libraries
import { format } from 'date-fns'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

/**Icon*/
import IconAdd from '@/components/icons/IconAdd.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import IconEmploye from '@/components/icons/IconEmploye.vue'

// * interfaces
import { EmployeeData } from '@/service/interface'

// * store
const commonStore = useCommonStore()
const { users, branch_data } = storeToRefs(commonStore)

// * toast
const $toast = new Toast()

/** ẩn hiện modal */
const open = ref(false)

/** form thêm nhân viên */
const form_add = ref<{ email?: string }>({})

/** danh sách nhân viên */
const employees = computed(() => {
  return Object.values(users.value)?.filter(
    (user: EmployeeData) =>
      !branch_data.value?._id ||
      user?.branch_ids?.includes(branch_data.value?._id)
  )
})

/** hàm mở modal */
function openModal() {
  open.value = true
  form_add.value = {
    email: '',
  }
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
    if(!USER){
      users.value = {
        ...users.value,
        [RES.data.user_id]: RES.data,
      }
    }
    // có rồi thì bổ sung chi nhánh hiện tại
    else{
      users.value[RES.data.user_id] = {
        ...USER,
        branch_ids: [...USER?.branch_ids || [], branch_data.value?._id || ''],
        branches: [...USER?.branches || [], {
          _id: branch_data.value?._id,
          name: branch_data.value?.name,
        }],
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
