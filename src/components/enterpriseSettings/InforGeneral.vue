<template>
  <div class="py-3 px-4 bg-white rounded-lg flex items-start gap-3">
    <!-- icon -->
    <IconInformation class="w-5 h-5"></IconInformation>
    <!--content  -->
    <div class="flex-col flex-1 gap-3">
      <div class="flex h-5 items-center mb-3">
        <h4 class="flex justify-start text-sm font-medium">Thông tin chung</h4>
      </div>
      <!-- phần các ô input  -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
        <!-- Tên viết tắt -->
        <div class="md:col-span-1 text-left h-16">
          <label
            for="shortName"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Tên viết tắt
          </label>
          <input
            type="text"
            id="shortName"
            placeholder="Nhập tên viết tắt"
            class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <!-- Tên đầy đủ Doanh nghiệp -->
        <div class="md:col-span-2 text-left h-16">
          <label
            for="fullName"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Tên đầy đủ Doanh nghiệp
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Nhập tên đầy đủ"
            class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <!-- Mã số thuế -->
        <div class="md:col-span-1 text-left h-16">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Mã số thuế
          </label>
          <input
            type="text"
            id="taxCode"
            placeholder="Nhập mã số thuế"
            class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <!-- Ngày thành lập-->
        <div class="md:col-span-1 text-left h-16">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Ngày thành lập
          </label>
          <VueDatePicker
            auto-apply
            v-model="date"
            placeholder="Chọn ngày thành lập"
            :action-row="{ showNow: true }"
            now-button-label="Current"
          />
        </div>
        <!-- Địa chỉ -->
        <div class="md:col-span-3 text-left h-16">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Địa chỉ
          </label>
          <input
            type="text"
            id="taxCode"
            placeholder="Nhập địa chỉ Doanh nghiệp"
            class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <!-- Trạng thái-->
        <div class="md:col-span-1 text-left h-16">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Trạng thái
          </label>
          <div class="flex items-center h-9 text-green-600 gap-2">
            <IconTick class="h-5 w-5"></IconTick>
            <p class="text-sm">Đang hoạt động</p>
          </div>
        </div>
        <!-- Thao tác-->
        <div class="md:col-span-1 text-left h-16">
          <label
            for="taxCode"
            class="block text-sm font-medium text-gray-700 h-5.5"
          >
            Trạng thái
          </label>
          <div
            class="flex items-center bg-red-100 h-9 px-2.5 py-2 text-red-500 gap-2 border border-red-500 rounded-md"
          >
            <IconPause class="h-5 w-5"></IconPause>
            <p class="text-sm">Tạm dừng hoạt động</p>
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
import IconInformation from "@/components/icons/IconInformation.vue";
import IconTick from "../icons/IconTick.vue";
import IconPause from "@/components/icons/IconPause.vue";
/**Biến*/
const date = ref(new Date());
</script>

<style lang="scss" scoped></style>
