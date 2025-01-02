<template>
  <!-- <img
      v-if="props.employee && props.employee.image_control"
      :src="props.employee.i"
      alt="Employee Avatar"
      class="custom-rounded"
      :class="{
        'w-9 h-9 text-sm': props.size === 5,
        'w-10 h-10 text-sm': props.size === 10,
        'w-20 h-20 text-3xl': props.size === 20,
      }"
    /> -->
  <!-- không có avatar -->
  <div
    :class="{
      'w-8 h-9 text-sm': props.size === 5,
      'w-10 h-10 text-sm': props.size === 10,
      'w-20 h-20 text-3xl': props.size === 20,
    }"
    :style="{ backgroundColor: getRandomColor() }"
    class="custom-rounded flex items-center justify-center font-semibold text-white"
  >
    {{
      (props.employee?.short_name?.charAt(0) || "").toUpperCase() || (props.employee?.name?.charAt(0) || "").toUpperCase()
    
    }}
  </div>
</template>

<script setup lang="ts">
import { BranchData } from "@/service/interface";

/**truyền đối tượng employee sang*/
const props = defineProps<{
  employee: BranchData;
  size: number;
}>();

function getRandomColor() {
  // Tạo một mã màu hex ngẫu nhiên
  const randomHex = Math.floor(Math.random()*16777215).toString(16);

  // Đảm bảo mã màu luôn có 6 ký tự bằng cách thêm số 0 vào đầu nếu cần
  const color = "#" + randomHex.padStart(6, '0');
  return color;

}

</script>

<style lang="scss" scoped></style>
