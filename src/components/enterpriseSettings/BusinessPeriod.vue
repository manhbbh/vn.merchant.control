<template>
  <div class="py-3 px-4 bg-white rounded-lg flex items-start gap-3">
    <!-- icon -->
    <IconPeriod class="w-5 h-5"></IconPeriod>
    <!--content  -->
    <div class="flex-col flex-1  ">
      <div class="flex flex-col items-start mb-3">
        <h4 class="flex justify-start text-sm font-medium">Kỳ kinh doanh</h4>
        <p class="text-sm text-left text-muted">
          <span class="font-medium">Tháng:</span> Ngày bắt đầu và kết thúc để
          tính Lương P1, P2. <span class="font-medium">Năm:</span> Ngày bắt đầu
          và kết thúc 1 năm kinh doanh để hiển thị dữ liệu trong báo cáo năm.
        </p>
      </div>
      <!-- phần các ô input  -->
      <div class="flex gap-3 ">
        <div class="flex flex-col gap-1 text-sm items-start w-80 overflow-hidden ">
          <h3 class="text-sm font-medium">
            Tháng<span class="text-error"> *</span>
          </h3>
          <!--  -->
          <div class="flex items-center border  border-gray-300 h-9  py-2 rounded-md">
            <input type="text" class="outline-none text-muted pl-3 w-[117px] text-sm " placeholder="Ngày bắt đầu" />
            <div class="border-l w-[46px] border-gray-300 flex items-center justify-center h-9">{{ day_start }}</div>
          </div>
          <!--  -->
          <div class="flex items-center border  border-gray-300 h-9  py-2 rounded-md">
            <input type="text" class="outline-none text-muted pl-3 w-[117px] text-sm " placeholder="Ngày bắt đầu" />
            <div class="border-l w-[46px] border-gray-300 flex items-center justify-center h-9">{{ day_start }}</div>
          </div>
        </div>
        <div class="flex flex-col gap-1 items-start w-80 ">
          <h3 class="text-sm font-medium">
            Năm<span class="text-error"> *</span>
          </h3>
          <!--  -->
          <div class="flex items-center border text-sm  border-gray-300 h-9  py-2 rounded-md">
            <input type="text" class="outline-none text-muted pl-3 w-[162px] text-sm " placeholder="Ngày/Tháng bắt đầu" />
            <div class="border-l w-[60px]  border-gray-300 flex items-center justify-center h-9">{{ month_start }}</div>
          </div>
          <!--  -->
          <div class="flex items-center border text-sm border-gray-300 h-9  py-2 rounded-md">
            <input type="text" class="outline-none text-muted pl-3 w-[162px] text-sm " placeholder="Ngày/Tháng bắt đầu" />
            <div class="border-l w-[60px] border-gray-300 flex items-center justify-center h-9">{{ month_start }}</div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

/**ICon*/
import IconPeriod from "@/components/icons/IconPeriod.vue";
import IconTick from "../icons/IconTick.vue";
import IconPause from "@/components/icons/IconPause.vue";
/**Biến*/
const date = ref(new Date());
const day_start = ref('20');
const month_start = ref('04/09');
</script>

<style lang="scss" scoped></style>
