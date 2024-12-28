<template>
    <div
      class="py-3 px-2 sm:px-4 border border-gray-200 rounded-lg flex text-black items-start gap-2 sm:gap-3"
    >
      <!-- icon -->
      <IconSettings class="w-5 h-5"></IconSettings>
      <!--content  -->
      <div class="flex-col flex-1 gap-3">
        <div class="flex h-5 items-center mb-3">
          <h4 class="flex justify-start text-sm font-medium">Thiết lập chung</h4>
        </div>
        <!-- phần các ô input  -->
        
      </div>
      <!--  -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  /**ICon*/
  import IconSettings from "@/components/icons/iconMenu/IconSettings.vue";
  /**Biến*/
  const date = ref(new Date());
  /**biến tích*/
  const all_checked = ref(false);
  </script>
  
  <style lang="scss" scoped></style>
  