<template>
  <div v-if="props.detaiBranch" class="py-3">
    <p class="text-sm font-semibold">Vui lòng chọn Chi nhánh</p>
  </div>
  <!--  -->
  <div v-else class="flex-1 flex flex-col gap-2 overflow-y-auto">
    <InforBranch></InforBranch>
    <!-- 2 -->
    <ListEmployee></ListEmployee>
    <!-- 3 -->
    <Holiday></Holiday>
    <!-- 4 -->
    <WorkingForm></WorkingForm>
    <!-- 5 -->
    <Timeworking></Timeworking>
    <!-- nút lưu -->
    <div class="py-2 px-3 bg-white rounded-lg flex items-center justify-end">
      <button
        class="h-9 text-sm font-medium bg-blue-700 px-4 py-2 flex justify-center items-center rounded-lg text-white"
      >
        Lưu thiết lập
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
/**component */
import InforBranch from "@/components/enterpriseSettings/InforBranch.vue";
import ListEmployee from "@/components/enterpriseSettings/ListEmployee.vue";
import Timeworking from "@/components/enterpriseSettings/Timeworking.vue";
import Holiday from "@/components/enterpriseSettings/Holiday.vue";
import WorkingForm from "@/components/enterpriseSettings/WorkingForm.vue";
/**Prod*/
/**truyền đối tượng employee sang*/
const props = defineProps<{
  detaiBranch: boolean;
}>();
</script>
