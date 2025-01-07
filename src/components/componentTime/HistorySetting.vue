<template>
  <div class="flex text-sm gap-3 border rounded-lg py-3 px-4 w-full text-start">
    <IconHistory class="w-5 h-5"></IconHistory>
    <div class="w-full flex-grow flex flex-col gap-2.5">
      <p class="font-medium">Lịch sử thiết lập</p>
      <div class="grid grid-cols-2 gap-x-6 gap-y-3 overflow-auto max-h-[60dvh]">
        <div
          class="flex flex-col col-span-2 lg:col-span-1 py-2 border-b"
          v-for="history in history_timeboxing_setting"
        >
          <div class="flex justify-between">
            <div class="flex gap-2">
              <Avatar
                class="h-4 w-4 rounded-full overflow-hidden mt-1"
                :text_class="'text-[8px]'"
                :src="getEmployee(history.employee_id)?.avatar || ''"
                :text="getFullName(getEmployee(history.employee_id))"
              />
              <div>
                <p class="flex items-center gap-1 font-medium">
                  {{ getFullName(getEmployee(history.employee_id)) }}
                  <IconTicks class="w-4 h-4"/>
                </p>
                <p class="text-slate-500 text-xs" v-if="history.branch_id">
                  {{ business_branches[history.branch_id]?.name }}
                </p>
              </div>
            </div>
            <div class="flex flex-col items-end text-slate-500 text-xs">
              <p>Thêm mới lúc</p>
              <p v-if="history.createdAt">
                {{ format(history.createdAt, 'HH:mm:ss - dd/MM/yyyy') }}
              </p>
            </div>
          </div>
          <p class="py-1 ml-6">
            Thay đổi {{ TYPE[history.type || ''] }}.
            <u
              class="cursor-pointer"
              @click="
                () => {
                  is_show_modal = true
                  history_data = history?.new_data || {}
                }
              "
              >Xem dữ liệu thay đổi</u
            >
          </p>
        </div>
      </div>
    </div>
    <Modal v-if="is_show_modal" :close="()=>is_show_modal = false">
      <template #content>
        <article class="w-96">
          <header class="flex justify-end py-2 px-4">
            <div class="rounded-md bg-slate-100 p-1.5 cursor-pointer">
              <XMarkIcon class="w-5 h-5" @click="is_show_modal = false" />
            </div>
          </header>
          <main class="border-y py-2 px-4 max-h-[70dvh] overflow-auto">
            <p class="whitespace-pre-wrap truncate">{{ history_data }}</p>
          </main>
          <footer class="py-2 px-4">
            <button
              class="px-3 py-2 bg-slate-100 font-medium rounded"
              @click="is_show_modal = false"
            >
              Đóng
            </button>
          </footer>
        </article>
      </template>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { useTimeboxingStore } from '@/stores/timeboxing'

// * libraries
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { format } from 'date-fns/format'

// * components
import Modal from '@/components/Modal.vue'
import Avatar from '@/components/avartar/Avatar.vue'

//* icons
import { XMarkIcon } from '@heroicons/vue/24/solid'
import IconTicks from '@/components/icons/IconTicks.vue'
import IconHistory from '@/components/icons/iconMenu/IconHistory.vue'

// * interfaces
import { EmployeeSetting, FullEmployeeData } from '@/service/interface'

/** các loại lịch sử */
const TYPE: { [key: string]: string } = {
  EMPLOYEE: 'Nhân sự',
  GENERAL: 'Thiết lập chung',
  ATTENDANCE: 'Thiết bị chấm công',
}

/** Sử dụng state trong store */
const { business_employees_ids, business_branches, history_timeboxing_setting } = storeToRefs(useTimeboxingStore())

/** dữ liệu lịch sử cần xem chi tiết */
const history_data = ref<{
  employees?: EmployeeSetting[]
}>({})

/** ẩn hiện modal */
const is_show_modal = ref(false)

/** dữ liệu nhân sự */
function getEmployee(id?: string) {
  if (!id) return
  return business_employees_ids.value?.[id]
}

/** hàm lấy tên đẩy đủ */
function getFullName(item?: FullEmployeeData) {
  if (!item) return ''
  return `${item?.first_name} ${item?.last_name}`
}
</script>
