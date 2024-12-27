<template>
  <!-- các phần con -->
  <div class="flex-1 flex flex-col gap-2 overflow-y-auto">
    <InforGeneral></InforGeneral>
    <!-- 2 -->
    <ListBrach></ListBrach>
    <!-- 3 -->
    <ListEmployee></ListEmployee>
    <!-- 4 -->
    <BusinessPeriod></BusinessPeriod>
    <!-- 5 -->
    <Holiday></Holiday>
    <!-- 6 -->
    <WorkingForm></WorkingForm>
    <!-- 7 -->
    <Timeworking></Timeworking>
    <!-- 8 -->
    <Background></Background>
    <!-- nút lưu -->
    <div class="py-2 px-3  bg-white rounded-lg flex  items-center justify-end ">
      <button class="h-9 text-sm font-medium bg-blue-700 px-4 py-2 flex justify-center items-center rounded-lg text-white">Lưu thiết lập</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
/**Component*/
import InforGeneral from "@/components/enterpriseSettings/InforGeneral.vue";
import ListBrach from "@/components/enterpriseSettings/ListBrach.vue";
import ListEmployee from "@/components/enterpriseSettings/ListEmployee.vue";
import Timeworking from "@/components/enterpriseSettings/Timeworking.vue";
import Holiday from "@/components/enterpriseSettings/Holiday.vue";
import WorkingForm from "@/components/enterpriseSettings/WorkingForm.vue";
import BusinessPeriod from "@/components/enterpriseSettings/BusinessPeriod.vue";
import Background from "@/components/enterpriseSettings/Background.vue";
</script>

<style lang="scss" scoped></style>
