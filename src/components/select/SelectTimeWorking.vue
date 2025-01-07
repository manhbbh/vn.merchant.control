<template>
  <DropBox :close="() => (is_show_drop_box = false)">
    <template v-slot:trigger>
      <div
        class="border rounded-md py-2 px-3 w-52 cursor-pointer flex gap-2 justify-between items-center"
        @click="is_show_drop_box = true"
      >
        <p v-if="!form_of_work_id" class="text-slate-500 truncate">Chọn hình thức làm việc</p>
        <p class="truncate" v-else>{{ form_of_work?.[form_of_work_id]?.name }}</p>
        <ChevronDownIcon class="w-4 h-4 flex-shrink-0" />
      </div>
    </template>
    <template v-slot:box>
      <ul
        v-if="is_show_drop_box"
        class="bg-white border rounded-md overflow-hidden cursor-pointer overflow-y-auto max-h-48 min-w-52 my-1 scrollbar-thin"
      >
        <li
          v-for="(item, index) in Object.keys(form_of_work)"
          class="px-4 py-2 hover:bg-gray-200 flex gap-2 items-center justify-between"
          @click="handleChoose(item)"
        >
          <p>
            {{ form_of_work?.[item]?.name }}
          </p>
          <CheckCircleIcon
            v-if="form_of_work_id === item"
            class="w-4 h-4 text-blue-700"
          />
        </li>
      </ul>
    </template>
  </DropBox>
</template>

<script setup lang="ts">
import { useTimeboxingStore } from '@/stores/timeboxing'

// * libraries
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

// * components
import DropBox from '@/components/DropBox.vue'

// * icons
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

// * store
const { form_of_work } = storeToRefs(useTimeboxingStore())

/** ẩn hiện dropbox */
const is_show_drop_box = ref(false)

/** id của nhân viên */
const form_of_work_id = defineModel<string>({
  default: '',
})

/** hàm xử lý chọn nhân viên */
function handleChoose(item: string) {
  form_of_work_id.value = item || ''
  is_show_drop_box.value = false
}
</script>
