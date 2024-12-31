<template>
  <ComboboxRoot
    class="w-full"
    v-model="selected"
    v-on:update:model-value="select($event)"
    v-slot="{ open }"
    v-on:update:open="(value:boolean)=>{
      if(value) search = ''
      openDropdown()
    }"
  >
    <ComboboxAnchor
      class="w-full flex items-center text-sm border p-2 rounded-lg group overflow-hidden bg-white"
      :class="trigger_class"
    >
      <ComboboxInput
        v-show="open && is_search"
        :value="search"
        @input="(e:Event)=>{
          const TARGET = e.target as HTMLInputElement;
          search = TARGET.value
          start_search()
        }"
        class="w-full text-start outline-none"
        placeholder="Tìm kiếm..."
      />
      <ComboboxTrigger
        class="w-full text-start overflow-hidden"
        :class="{
          'cursor-default': !is_update,
        }"
        v-show="!open || !is_search"
      >
        <p
          v-if="show || getShow(selected) || getLabel(selected)"
          class="truncate"
        >
          {{ show || getShow(selected) || getLabel(selected) }}
        </p>
        <p v-else class="truncate text-slate-500">
          {{ placeholder }}
        </p>
      </ComboboxTrigger>
      <ChevronDownIcon
        v-if="
          !show &&
          !getShow(selected) &&
          (!is_clearable || !isEmpty(selected)) &&
          is_update
        "
        class="w-4 h-4 flex-shrink-0"
      />
      <XCircleIcon
        v-if="
          (show || getShow(selected) || !isEmpty(selected)) &&
          !open &&
          is_update &&
          is_clearable
        "
        class="w-4 h-4 flex-shrink-0 cursor-pointer text-slate-500 group-hover:text-slate-900"
        @click="clearSelect"
      />
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent
        v-if="is_update"
        class="text-sm border p-1 min-w-max rounded-lg bg-white max-h-60 overflow-auto popover-content-width-same-as-its-trigger"
        :class="content_class"
        :sideOffset="5"
        :position="'popper'"
        :align="align"
      >
        <ComboboxItem
          v-for="(option, index) in options"
          :key="option[name] || index"
          class="select-itemv3 px-3 py-1.5 cursor-pointer flex justify-between gap-4 rounded"
          :value="option"
          v-show="filter(option, search)"
        >
          <slot :name="option[name] || index">
            <span>
              {{ getLabel(option) }}
            </span>
            <CheckCircleIcon
              v-if="
                getValue(option) === getValue(props.default_value) ||
                getValue(option) === getValue(selected)
              "
              class="w-4 h-4 text-blue-700"
            />
          </slot>
        </ComboboxItem>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>

<script setup lang="ts">
// * libraries
import {
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  watch,
  WatchStopHandle,
} from 'vue'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
} from 'radix-vue'
import { debounce, isEmpty } from 'lodash'

// * Icons
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/solid'

let stop_watch: WatchStopHandle | null = null

const props = defineProps({
  /** danh sách các option */
  options: {
    type: Array as PropType<any[]>,
    default: () => [],
    required: true,
  },
  /** giá trị khởi tạo */
  default_value: {
    type: Object as PropType<any>,
    required: false,
    default: {},
  },
  /** cập nhật */
  update: {
    type: Function,
    required: true,
    default: () => {},
  },
  /** lấy giá trị */
  getValue: {
    type: Function,
    required: false,
    default: () => '',
  },
  /** lấy hiển thị */
  getLabel: {
    type: Function,
    required: false,
    default: () => '',
  },
  /** hiển thị giá trị đã chọn */
  getShow: {
    type: Function,
    required: false,
    default: () => '',
  },
  /** bật/tắt tìm kiếm */
  is_search: {
    type: Boolean,
    required: false,
    default: true,
  },
  /** hàm lọc */
  filter: {
    type: Function,
    required: false,
    default: () => true,
  },
  /** tên của slot */
  name: {
    type: String,
    required: false,
    default: '',
  },
  /** placeholder */
  placeholder: {
    type: String,
    required: false,
    default: 'Chọn',
  },
  /** hàm tìm kiếm */
  onSearch: {
    type: Function,
    required: false,
    default: () => {},
  },
  /** hàm xóa */
  onClear: {
    type: Function,
    required: false,
    default: () => {},
  },
  /** lắng nghe sự thay đổi giá trị */
  is_watch_value: {
    type: Boolean,
    required: false,
    default: false,
  },
  /** cập nhật */
  is_update: {
    type: Boolean,
    required: false,
    default: true,
  },
  /** hàm thực hiện khi mở select */
  onOpen: {
    type: Function,
    required: false,
    default: () => {},
  },
  /** căn cho dropdown */
  align: {
    type: String as PropType<'start' | 'center' | 'end'>,
    default: 'start',
  },
  /** class custom cho nút trigger */
  trigger_class: {
    type: String,
    required: false,
    default: '',
  },
  /** class custom cho dropdown */
  content_class: {
    type: String,
    required: false,
    default: '',
  },
  /** cho phép clear giá trị */
  is_clearable: {
    type: Boolean,
    required: false,
    default: true,
  },
})

/** giá trị đã chọn */
const selected = ref<any>(getDefault())

/** giá trị hiển thị */
const show = defineModel<string>('show', {
  default: '',
})

/** giá trị tìm kiếm */
const search = defineModel<string>('search', {
  default: '',
})

/** bắt đầu tìm kiếm */
const start_search = debounce(() => {
  props.onSearch?.(search.value)
}, 500)

onMounted(() => {
  if (props.is_watch_value) startWatching()
})

onUnmounted(() => {
  stopWatching()
})

/** bắt đầu lắng nghe sự thay đổi của giá trị */
function startWatching() {
  stop_watch = watch(
    () => props.default_value,
    (newValue, oldValue) => {
      if (props.getValue(newValue) === props.getValue(oldValue)) return
      selected.value = getDefault()
    }
  )
}

/** ngừng lắng nghe thay đổi giá trị */
function stopWatching() {
  if (stop_watch) {
    stop_watch() // Dừng watcher
    stop_watch = null
  }
}

/** mở dropdown */
function openDropdown() {
  props?.onOpen?.()
}

/** chọn giá trị */
function select(data: any) {
  selected.value = data
  props.update(data)
}

/** lấy giá trị mặc định */
function getDefault() {
  if (!props.getValue) return props.default_value

  return props.options.find(
    (option) => props.getValue(option) === props.getValue(props.default_value)
  )
}

/** xóa giá trị đã chọn */
function clearSelect() {
  selected.value = {}
  props.onClear?.()
}
</script>
<style>
.select-itemv3[data-highlighted] {
  @apply bg-gray-100;
}

/* .select-item[data-state='checked'] {
  @apply bg-blue-700 text-white rounded-md;
} */

.popover-content-width-same-as-its-trigger {
  width: var(--radix-combobox-trigger-width);
}
</style>
