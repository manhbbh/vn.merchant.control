<template>
  <div class="w-4 h-4 rounded-full bg-blue-700 flex justify-center items-center">
    <img
      v-if="image_src"
      :src="image_src"
      @error="onImageError"
      class="image"
    />
    <div v-else class="text-white" :class="text_class">{{ fallback_text }}</div>
  </div>
</template>

<script setup lang="ts">
// * libraries
import { computed, ref } from 'vue';

// * props
const $props = defineProps({
  src: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    required: true,
  },
  text_class: {
    type: String,
    required: false,
    default: "text-[8px]",
  }
})

/** link ảnh */
const image_src = ref($props.src)

/** đoạn text hiện khi ảnh lỗi */
const fallback_text = computed(() => {
  return $props.text?.charAt(0)?.toUpperCase()
})

/** hàm chạy khi load ảnh lỗi */
function onImageError() {
  image_src.value = ""
}
</script>
