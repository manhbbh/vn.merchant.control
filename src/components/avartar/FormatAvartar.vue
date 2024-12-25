<template>
  <img
      v-if="props.employee && props.employee.image_control"
      :src="props.employee.image_control"
      alt="Employee Avatar"
      class="custom-rounded"
      :class="{
        'w-9 h-9 text-sm': props.size === 5,
        'w-10 h-10 text-sm': props.size === 10,
        'w-20 h-20 text-3xl': props.size === 20,
      }"
    />
  <!-- không có avatar -->
  <div
    v-else
    :class="{
      'w-8 h-9 text-sm': props.size === 5,
      'w-10 h-10 text-sm': props.size === 10,
      'w-20 h-20 text-3xl': props.size === 20,
      ' bg-sky-600':props.employee.type_control === 'main',
      ' bg-purple-600':props.employee.type_control === 'HN',
      'bg-emerald-700':props.employee.type_control === 'HCM',
    }"
  
    class="custom-rounded flex items-center justify-center font-semibold text-white"
  >
    {{
      (props.employee.name_control?.charAt(0) || "").toUpperCase() 
    
    }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

/**truyền đối tượng employee sang*/
const props = defineProps<{
  employee: {
    name_control: string;
    address_control: string;
    image_control:string;
    star_control: boolean;
    type_control: string;
  };
  size: number;
}>();
</script>

<style lang="scss" scoped></style>
