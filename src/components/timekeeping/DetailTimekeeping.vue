<template>
  <!-- các phần con -->
  <div class="flex-1 flex flex-col gap-2 overflow-y-auto">
   <GeneralSettings></GeneralSettings>
   <!-- 2 -->
    <EmployeeSettings></EmployeeSettings>
    <!-- nút lưu -->
  
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
/**Component*/
import GeneralSettings from "@/components/componentTime/GeneralSettings.vue";
import EmployeeSettings from "@/components/componentTime/EmployeeSettings.vue";
</script>

<style lang="scss" scoped></style>
