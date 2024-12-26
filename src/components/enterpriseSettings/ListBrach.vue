<template>
  <div class="py-3 px-4 bg-white rounded-lg flex items-start gap-3">
    <!-- icon -->
    <IconHome class="w-5 h-5"></IconHome>
    <!--content  -->
    <div class="flex flex-col gap-2 w-full">
      <div class="flex h-5 items-center justify-between mb-3">
        <h4 class="flex justify-start text-sm font-medium">
          Danh sách chi nhánh
        </h4>
        <div
          class="flex items-center gap-2 bg-slate-100 py-1 px-2 h-5 cursor-pointer rounded-md"
        >
          <!-- icon -->
          <IconAdd class="w-3 h-3"></IconAdd>
          <p class="text-xs">Thêm chi nhánh</p>
        </div>
      </div>
      <table class="min-w-full border-none bg-white rounded-lg z-10">
        <thead
          class="bg-slate-200 h-7 text-sm font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
        >
          <tr class="h-7">
            <th class="w-6 text-left font-semibold text-slate-800">#</th>
            <th class=" text-left font-semibold text-slate-800">
              Tên viết tắt
            </th>
            <th class=" text-left font-semibold text-slate-800">Địa chỉ</th>
            <th
              class=" text-left font-semibold text-slate-800 hidden md:table-cell"
            >
              Ngày thành lập
            </th>
            <th
              class=" text-left font-semibold text-slate-800 hidden md:table-cell"
            >
              Số nhân sự
            </th>
            <th
              class=" text-left font-semibold text-slate-800 hidden md:table-cell"
            >
              Trạng thái
            </th>
            <th
              class=" text-left font-semibold text-slate-800 hidden md:table-cell"
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(business, index) in list_business"
            :key="index"
            class="hover:bg-slate-100 text-black  cursor-pointer text-sm overflow-y-auto h-full"
          >
            <!-- stt-->
            <td class="py-2 text-left  items-center space-x-4">
              <p>{{ index + 1 }}</p>
            </td>
            <!-- tên viết tắt -->
            <td class="text-left  py-2 items-center space-x-4">
              <p>{{ business.name_business }}</p>
            </td>

            <!-- địa chỉ -->
            <td class="text-left  py-2">
              <p>{{ business.address_business }}</p>
            </td>

            <!-- ngày thành lập -->
            <td
              class="text-left  py-2 text-customGray hidden md:table-cell text-15px"
            >
              <p>{{ business.day_business }}</p>
            </td>

            <!-- số nhân sự -->
            <td class="text-left  py-2 hidden md:table-cell">
              <p class="text-sm">
                {{ business.number_business }}
              </p>
            </td>

            <!-- trạng thái -->
            <td class="text-left  py-2 hidden md:table-cell">
              <p
                class="text-sm"
                :class="
                  business.status_business ? 'text-green-500' : 'text-red-500'
                "
              >
                {{
                  business.status_business
                    ? "Đang hoạt động"
                    : "Không hoạt động"
                }}
              </p>
            </td>
            <!-- thao tác -->
            <td class="text-left  py-2 hidden md:table-cell">
              <div
                class="h-5 w-15 flex justify-center px-2 bg-slate-100 rounded-md py-0.5"
              >
                <p class="text-xs font-medium">
                  {{ business.operation_business }}
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
import IconHome from "@/components/icons/IconHome.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
/**Danh sách */
const list_business = ref([
  {
    name_business: "Viettel",
    address_business: "19 Tố Hữu, Hà Đông,Hà Nội,Việt Nam ",
    day_business: "01/01/2023",
    number_business: "100",
    status_business: true,
    operation_business: "Cài đặt",
  },
  {
    name_business: "Viettel",
    address_business: "Trụ sở chính",
    day_business: "01/01/2023",
    number_business: "100",
    status_business: true,
    operation_business: "Cài đặt",
  },
  {
    name_business: "Viettel",
    address_business: "Trụ sở chính",
    day_business: "01/01/2023",
    number_business: "100",
    status_business: true,
    operation_business: "Cài đặt",
  },
]);
</script>

<style lang="scss" scoped></style>
