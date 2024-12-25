<template>
  <div class="py-3 px-4 bg-white rounded-lg flex text-black items-start gap-3">
    <!-- icon -->
    <IconEmploye class="w-5 h-5"></IconEmploye>
    <!--content  -->
    <div class="flex flex-col gap-2 w-full">
      <div class="flex h-5 items-center justify-between mb-3">
        <h4 class="flex justify-start text-sm font-medium">Nhân sự công ty</h4>
        <div
          class="flex items-center gap-2 bg-slate-100 py-1 px-2 h-5 cursor-pointer rounded-md"
        >
          <!-- icon -->
          <IconAdd class="w-3 h-3"></IconAdd>
          <p class="text-xs">Thêm nhân viên</p>
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
            v-for="(employee, index) in employee_business"
            :key="index"
            class="hover:bg-slate-100 text-black h-9 cursor-pointer text-sm overflow-y-auto"
          >
            <!-- stt-->
            <td class="py-2 text-left px-3 items-center space-x-4">
              <p>{{ index + 1 }}</p>
            </td>
            <!-- tên viết tắt -->
            <td class="text-left px-3 py-2 items-center space-x-4">
              <p>{{ employee.name_employee }}</p>
            </td>

            <!-- địa chỉ -->
            <td class="text-left px-3 py-2">
              <p>{{ employee.email_employee }}</p>
            </td>

            <!-- chi nhánh đang hoạt đông -->
            <td
              class="text-left px-3 gap-2 py-2 text-customGray hidden md:flex text-15px"
            >
              <div
                class="h-5 py-0.5 rounded bg-zinc-100 px-2 text-customDark text-xs font-medium"
                v-for="branch in employee.branch_employee"
              >
                {{ branch }}
              </div>
            </td>

            <!-- ngày tạo -->
            <td class="text-left px-3 py-2 hidden md:table-cell">
              <p class="text-sm">
                {{ employee.day_employee }}
              </p>
            </td>

            <!-- trạng thái -->
            <td class="text-left px-3 py-2 hidden md:table-cell">
              <p
                class="text-sm"
                :class="
                  employee.status_business ? 'text-green-500' : 'text-red-500'
                "
              >
                {{
                  employee.status_business
                    ? "Đang hoạt động"
                    : "Không hoạt động"
                }}
              </p>
            </td>
            <!-- thao tác -->
            <td class="text-left px-2 py-0.5 hidden md:table-cell">
              <div
                :class="{
                  'bg-green-500': employee.operation_business === 'Kích hoạt',
                  'bg-red-500': employee.operation_business === 'Tạm ngừng',
                }"
                class="h-5 inline-flex items-center px-2 text-white rounded-md py-0.5"
              >
                <p class="text-xs flex items-center font-medium">
                  {{ employee.operation_business }}
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
import { ref } from "vue";
/**Icon*/
import IconEmploye from "@/components/icons/IconEmploye.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
/**Biến*/
/**Danh sách */
const employee_business = ref([
  {
    name_employee: "Nguyễn Văn A",
    email_employee: "a@bbh.com",
    branch_employee: ["BU Hà Nội", "BU Hà Đông", "BU Hồ Chí Minh"],
    day_employee: "10/10/2024",
    status_business: true,
    operation_business: "Tạm ngừng",
  },
  {
    name_employee: "Nguyễn Văn B",
    email_employee: "a@bbh.com",
    branch_employee: ["BU Hà Nội", "BU Hà Đông", "BU Hồ Chí Minh"],
    day_employee: "10/10/2024",
    status_business: false,
    operation_business: "Kích hoạt",
  },
  {
    name_employee: "Nguyễn Văn A",
    email_employee: "a@bbh.com",
    branch_employee: ["BU Hà Nội", "BU Hà Đông", "BU Hồ Chí Minh"],
    day_employee: "10/10/2024",
    status_business: true,
    operation_business: "Tạm ngừng",
  },
  {
    name_employee: "Nguyễn Văn B",
    email_employee: "a@bbh.com",
    branch_employee: ["BU Hà Nội", "BU Hà Đông", "BU Hồ Chí Minh"],
    day_employee: "10/10/2024",
    status_business: false,
    operation_business: "Kích hoạt",
  },
  {
    name_employee: "Nguyễn Văn A",
    email_employee: "a@bbh.com",
    branch_employee: ["BU Hà Nội", "BU Hà Đông", "BU Hồ Chí Minh"],
    day_employee: "10/10/2024",
    status_business: true,
    operation_business: "Tạm ngừng",
  },
]);
</script>

<style lang="scss" scoped></style>
