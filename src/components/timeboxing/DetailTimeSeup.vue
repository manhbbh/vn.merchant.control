<template>
  <!-- các phần con -->
  <div class="flex-1 flex flex-col gap-2 overflow-y-auto">
    <GeneralSettings id="general"></GeneralSettings>
    <!-- 2 -->
    <EmployeeSettings id="employee"></EmployeeSettings>
    <!-- 3-->
    <HistorySetting id="history"></HistorySetting>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
/**Component*/
import GeneralSettings from "@/components/componentSeup/GeneralSetting.vue";
import EmployeeSettings from "@/components/componentSeup/EmployeeSeup.vue";
import FingerprintSetting from "@/components/componentTime/FingerprintSetting.vue";
import HistorySetting from "@/components/componentTime/HistorySetting.vue";
</script>

<style lang="scss" scoped></style>
