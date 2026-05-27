<template>
  <select
    v-model="selectedLocale"
    class="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm font-medium text-slate-700 outline-none"
    aria-label="Language"
  >
    <option value="vn">VN</option>
    <option value="en">EN</option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { i18n, setLocale } from '@/lang'

const selectedLocale = computed({
  get: () => (i18n.global.locale.value === 'en' ? 'en' : 'vn'),
  set: (value: string) => setLocale(value),
})
</script>
