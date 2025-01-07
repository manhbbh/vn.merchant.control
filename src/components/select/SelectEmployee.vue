<template>
  <DropBox
    :close="
      () => (
        (is_show_drop_box = false),
        (search = employee_id ? getFullName(employees_ids[employee_id]) : '')
      )
    "
  >
    <template v-slot:trigger>
      <input
        @click="
          () => {
            is_show_drop_box = true
            search = ''
          }
        "
        v-model="search"
        type="text"
        placeholder="Chọn nhân sự"
        class="outline-none border w-full lg:w-auto rounded-md py-2 px-3 placeholder:text-slate-500"
      />
    </template>
    <template v-slot:box>
      <ul
        v-if="is_show_drop_box"
        class="bg-white border rounded-md overflow-hidden cursor-pointer overflow-y-auto max-h-72 min-w-44 scrollbar-thin my-1"
      >
        <li
          v-for="(item, index) in list_employee"
          class="px-4 py-2 hover:bg-gray-200 flex gap-2 items-center justify-between"
          @click="handleChooseEmployee(item)"
        >
          <p>
            {{ `${item?.first_name || ''} ${item?.last_name || ''}`?.trim() }}
          </p>
          <CheckCircleIcon
            v-if="employee_id === item?._id"
            class="w-4 h-4 text-blue-700"
          />
        </li>
      </ul>
    </template>
  </DropBox>
</template>

<script setup lang="ts">
import { useTimeboxingStore } from '@/stores/timeboxing'
import { nonAccentVn } from '@/service/helper/format'

// * libraries
import { computed, PropType, ref } from 'vue'
import { storeToRefs } from 'pinia'

// * components
import DropBox from '@/components/DropBox.vue'

// * icons
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

// * interfaces
import { FullEmployeeData } from '@/service/interface'


// * props
const props = defineProps({
  list_employees_added: {
    type: Object as PropType<{[key: string]: boolean}>,
    required: true,
  },
})
// * store
const { employees_ids } = storeToRefs(useTimeboxingStore())

/** ẩn hiện dropbox */
const is_show_drop_box = ref(false)

/** từ khóa tìm kiếm nhân viên */
const search = ref('')

/** id của nhân viên */
const employee_id = defineModel<string>({
  default: '',
})

/** danh sách nhân viên */
const list_employee = computed(() => {
  let result = Object.values(employees_ids.value)

  return result.filter(item => {
    const FULL_NAME = getFullName(item)
    return (
      nonAccentVn(FULL_NAME)?.includes(nonAccentVn(search.value)) &&
      (item._id && !props.list_employees_added?.[item._id])
    )
  })
})

/** hàm lấy tên đẩy đủ */
function getFullName(item?: FullEmployeeData) {
  if (!item) return ''
  return `${item?.first_name} ${item?.last_name}`
}

/** hàm xử lý chọn nhân viên */
function handleChooseEmployee(item: FullEmployeeData) {
  employee_id.value = item?._id || ''
  search.value = getFullName(item)
  is_show_drop_box.value = false
}
</script>
