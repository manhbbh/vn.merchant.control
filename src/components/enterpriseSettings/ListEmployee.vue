<template>
  <div class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3">
    <!-- icon -->
    <IconEmploye class="w-5 h-5"></IconEmploye>
    <!--content  -->
    <div class="flex flex-col gap-2 w-full">
      <div class="flex h-5 items-center justify-between mb-3">
        <h4 class="flex justify-start text-sm font-medium">Nhân sự công ty</h4>
        <div
          class="flex items-center gap-2 bg-slate-100 py-3 px-3 h-5 cursor-pointer rounded-md"
        >
          <!-- icon -->
          <IconAdd class="w-4 h-4"></IconAdd>
          <p class="text-xs font-medium">Thêm chi nhánh</p>
        </div>
      </div>
      <!--  -->
      <table class="min-w-full border-none bg-white rounded-lg z-10">
        <thead
          class="bg-slate-200 h-7 text-sm font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
        >
          <tr class="h-7">
            <th class="px-5 text-left font-semibold ">#</th>
            <th class="px-5 text-left font-semibold ">
              Họ và tên
            </th>
            <th class="px-5 text-left font-semibold ">Email</th>
            <th
              class="px-5 text-left font-semibold  hidden md:table-cell"
            >
              Chi nhánh đang hoạt động
            </th>
            <th
              class="px-5 text-left font-semibold  hidden md:table-cell"
            >
              Ngày tạo
            </th>
            <th
              class="px-5 text-left font-semibold  hidden md:table-cell"
            >
              Trạng thái
            </th>
            <th
              class="px-5 text-left font-semibold  hidden md:table-cell"
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <!--  -->
        <tbody>
          <tr
            v-for="(employee, index) in Object.values(employees)"
            :key="index"
            class="hover:bg-slate-100 text-black h-9 cursor-pointer text-sm overflow-y-auto"
          >
            <!-- stt-->
            <td class="py-2 text-left px-3 items-center space-x-4">
              <p>{{ index + 1 }}</p>
            </td>
            <!-- tên viết tắt -->
            <td class="text-left px-3 py-2 items-center space-x-4">
              <p>{{ employee.first_name || "" }} {{ employee.last_name || "" }}</p>
            </td>

            <!-- địa chỉ -->
            <td class="text-left px-3 py-2">
              <p>{{ '' }}</p>
            </td>

            <!-- chi nhánh đang hoạt đông -->
            <td
              class="text-left px-3 gap-2 py-2 text-customGray hidden md:flex text-15px"
            >
              <div
                class="h-5 py-0.5 rounded bg-zinc-100 px-2 text-customDark text-xs font-medium"
                v-for="branch in employee.branches"
              >
                {{ branch?.name }}
              </div>
            </td>

            <!-- ngày tạo -->
            <td class="text-left px-3 py-2 hidden md:table-cell">
              <p class="text-sm" v-if="employee.createdAt">
                {{ format(new Date(employee.createdAt), 'dd/MM/yyyy') }}
              </p>
            </td>

            <!-- trạng thái -->
            <td class="text-left px-3 py-2 hidden md:table-cell">
              <p
                class="text-sm"
                :class="
                  employee?.active ? 'text-green-500' : 'text-red-500'
                "
              >
                {{
                  employee?.active
                    ? "Đang hoạt động"
                    : "Không hoạt động"
                }}
              </p>
            </td>
            <!-- thao tác -->
            <td class="text-left px-2 py-0.5 hidden md:table-cell">
              <div
                :class="{
                  'bg-green-500': employee?.active,
                  'bg-red-500': !employee.active,
                }"
                class="h-5 inline-flex items-center px-2 text-white rounded-md py-0.5"
              >
                <p class="text-xs flex items-center font-medium">
                  {{ employee.active ? "Kích hoạt" : "Tạm dừng" }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/stores";

// * libraries
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { format } from "date-fns";

/**Icon*/
import IconEmploye from "@/components/icons/IconEmploye.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
/**Biến*/

// * store
const commonStore = useCommonStore()
const { employees } = storeToRefs(commonStore)

</script>
