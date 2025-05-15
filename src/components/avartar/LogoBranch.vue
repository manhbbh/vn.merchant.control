<template>
	<div class="w-9 h-9 flex-shrink-0 custom-rounded border overflow-hidden">
   <object
      v-if="src"
      class="h-full w-full"
      :data="src"
      type="image/png"
   >
      <p
         class="text-white h-full w-full custom-rounded flex items-center justify-center text-lg font-semibold"
         :class="randomBackgroundColors()"
      >
         {{ name?.charAt(0)?.toLocaleUpperCase() }}
      </p>
   </object>
   <p
      v-else
      class="text-white h-full w-full flex items-center justify-center text-lg font-semibold"
      :class="randomBackgroundColors()"
   >
      {{ name?.charAt(0)?.toLocaleUpperCase() }}
   </p>
	</div>
</template>

<script setup lang="ts">
import { randomBackgroundColors } from '@/service/helper/randomColor'

/** props */
const props = defineProps({
   src: {
      type: String,
      default: '',
   },
   name: {
      type: String,
      required: true,
   },
})
</script>
