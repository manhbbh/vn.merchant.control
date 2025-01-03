<template>
  <label class="inline-flex items-center cursor-pointer gap-2">
    <input type="checkbox" v-model="active" class="sr-only peer hidden" />
    <div
      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"
    ></div>
    <p class="font-medium">{{ title }}</p>
  </label>
</template>

<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  }
})

const active = defineModel({
  type: Boolean,
  default: false
})

</script>
