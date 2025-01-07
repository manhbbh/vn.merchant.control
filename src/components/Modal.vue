<template>
  <!-- Background modal -->
  <div
    id="default-modal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-[#abafb8bf]"
    @click="$props.close?.()"
  ></div>
  <!-- Modal content -->
  <div
    class="fixed z-[51] bg-white rounded-lg shadow w-fit h-fit flex items-center justify-center"
    style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
  >
    <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts">
const $props = defineProps<{
  close?: Function
}>()
</script>
