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
    <Timeworking></Timeworking>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
/**component */
import InforBranch from "@/components/enterpriseSettings/InforBranch.vue";
import ListEmployee from "@/components/enterpriseSettings/ListEmployee.vue";
import Timeworking from "@/components/enterpriseSettings/Timeworking.vue";
/**Prod*/
/**truyền đối tượng employee sang*/
const props = defineProps<{
  detaiBranch: boolean
}>(); 
</script>
