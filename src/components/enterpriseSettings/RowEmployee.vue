<template>
  <tr
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
        {{ employee.name }}
      </p>
    </td>

    <!-- địa chỉ -->
    <td class="text-left px-3 py-2">
      <p>{{ employee.email }}</p>
    </td>

    <!-- chi nhánh đang hoạt đông -->
    <td
      class="text-left px-3 py-2 text-customGray hidden md:table-cell"
      v-if="is_show_branch"
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
  </tr>
</template>

<script setup lang="ts">
import { BranchUserData } from '@/service/interface'
import { format } from 'date-fns'
import { PropType } from 'vue'

const props = defineProps({
  employee: {
    type: Object as PropType<{
      name?: string
      createdAt?: Date
      active?: boolean
      email?: string
      branches?: BranchUserData[]
    }>,
    default: () => ({}),
    required: true,
  },
  is_show_branch: {
    type: Boolean,
    default: false,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
    required: true,
  },
  handleActive: {
    type: Function,
    default: () => {},
    required: true,
  },
})
</script>
