<template>
  <VueDatePicker
    v-model="time_picker"
    @update:model-value="props.handleDate"
    :enable-time-picker="false"
    :format="format || 'dd/MM/yyyy'"
    :hide-input-icon="hidden_icon || false"
    auto-apply
    class="rounded-md datepicker"
		:ui="{
			input: input_class
		}"
    :teleport="teleport || false"
    :min-date="min_date || null"
    :clearable="clearable !== undefined ? clearable : true"
    :readonly="readonly !== undefined ? readonly : false"
    :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
  >
  </VueDatePicker>
</template>
<script lang="ts" setup>
const props = defineProps<{
  handleDate: Function
  input_class?: string
  teleport?: boolean
  min_date?: Date
  clearable?: boolean
  readonly?: boolean
  format?: string
  hidden_icon?: boolean
}>()

/** ngày được chọn */
const time_picker = defineModel({
  required: false,
})
</script>

<style lang="scss">
.datepicker {
  input:hover {
    border-color: transparent !important;
  }

  input:focus {
    border-color: transparent !important;
  }

  input {
    font-size: 14px;
  }

  .dp__menu_inner{
    font-size: 14px;
  }
}
</style>
