<template>
  <div class="w-screen h-screen text-sm">
    <Network />
    <AdBlocker />
    <Loading v-if="commonStore.is_loading_full_screen" type="FULL" />
    <div
      class="h-screen overflow-hidden overflow-y-auto"
      
    >
      <router-view />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores'

// * libraries

// * components
import Loading from '@/components/Loading.vue'
import Network from '@/components/Network.vue'
import AdBlocker from '@/components/AdBlocker.vue'

// * store
const commonStore = useCommonStore()

</script>

<style lang="scss">
@use '@/assets/css/index.scss';
</style>
