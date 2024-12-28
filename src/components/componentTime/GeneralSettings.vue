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
      <div class="flex gap-2 items-start">
        <!-- input check -->
        <div class="h-5 flex items-center">
          <div
            @click="all_checked = !all_checked"
            class="is-basic h-3.5 w-3.5 rounded border flex-shrink-0 hover:!border-success focus:!border-success dark:border-navy-400"
            :class="{
              'border-slate-400/70': !all_checked,
              'bg-black': all_checked,
              'form-checkbox': all_checked,
            }"
            :style="{
              'background-image': all_checked ? 'var(--tw-thumb)' : '',
            }"
          ></div>
        </div>
        <!-- nội dung -->
         <div class="flex flex-col items-start gap-1.5 ">
          <p class="h-5 text-sm font-medium text-customDark"> Gửi thông báo </p>
          <p class="h-5 text-sm text-muted hidden sm:flex"> Hệ thống tự động gửi thông báo chấm công qua Telegram.</p>

         </div>
      </div>
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
