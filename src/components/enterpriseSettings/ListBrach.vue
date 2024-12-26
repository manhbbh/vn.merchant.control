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
          @click="showModal"
          class="flex items-center gap-2 bg-slate-100 py-3 px-3 h-5 cursor-pointer rounded-md"
        >
          <!-- icon -->
          <IconAdd class="w-4 h-4"></IconAdd>
          <p class="text-xs font-medium">Thêm chi nhánh</p>
        </div>
      </div>
      <table class="min-w-full border-none bg-white rounded-lg z-10">
        <thead
          class="bg-slate-200 h-7 text-sm font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
        >
          <tr class="h-7">
            <th class="w-6 text-left font-semibold text-slate-800">#</th>
            <th class="text-left font-semibold text-slate-800">Tên viết tắt</th>
            <th class="text-left font-semibold text-slate-800">Địa chỉ</th>
            <th
              class="text-left font-semibold text-slate-800 hidden md:table-cell"
            >
              Ngày thành lập
            </th>
            <th
              class="text-left font-semibold text-slate-800 hidden md:table-cell"
            >
              Số nhân sự
            </th>
            <th
              class="text-left font-semibold text-slate-800 hidden md:table-cell"
            >
              Trạng thái
            </th>
            <th
              class="text-left font-semibold text-slate-800 hidden md:table-cell"
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(business, index) in list_business"
            :key="index"
            class="hover:bg-slate-100 text-black cursor-pointer text-sm overflow-y-auto h-full"
          >
            <!-- stt-->
            <td class="py-2 text-left items-center space-x-4">
              <p>{{ index + 1 }}</p>
            </td>
            <!-- tên viết tắt -->
            <td class="text-left py-2 items-center space-x-4">
              <p>{{ business.name_business }}</p>
            </td>

            <!-- địa chỉ -->
            <td class="text-left py-2">
              <p>{{ business.address_business }}</p>
            </td>

            <!-- ngày thành lập -->
            <td
              class="text-left py-2 text-customGray hidden md:table-cell text-15px"
            >
              <p>{{ business.day_business }}</p>
            </td>

            <!-- số nhân sự -->
            <td class="text-left py-2 hidden md:table-cell">
              <p class="text-sm">
                {{ business.number_business }}
              </p>
            </td>

            <!-- trạng thái -->
            <td class="text-left py-2 hidden md:table-cell">
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
            <td class="text-left py-2 hidden md:table-cell">
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
  <a-modal
    centered
    :style="{ width: '720px' }"
    v-model:open="open"
    :auto-focus="false"
    @ok="handleOk"
    :footer="null"
  >
    <div class="flex flex-col w-full">
      <header
        class="flex items-center justify-between  h-10 px-6 py-2"
      >
        <h3 class="h-6 text-base font-semibold">Thêm chi nhánh </h3>
        <button @click="open = false" class="p-1 rounded-md  hover:bg-gray-300 hover:text-black">
          <IconClose class="w-5 h-5"></IconClose>
        </button>
      </header>
      <!--  -->
      <main class="flex flex-col p-6 border-b border-t gap-2.5 border-gray-200">
        <div class="flex gap-2.5">
          <!-- Tên viết tắt -->
          <div class="w-115.5 text-left h-16 space-y-1">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5.5"
            >
              Tên chi nhánh <span class="text-error"> *</span>
            </label>
            <input
              type="text"
              id="shortName"
              placeholder="Nhập tên chi nhánh"
              class="h-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <!-- Tên viết tắt -->
          <div class="flex-1 text-left h-16 relative space-y-1">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5.5"
            >
              Ngày thành lập
            </label>
            <VueDatePicker
              class="iconHidden"
              auto-apply
              v-model="date"
              placeholder="Chọn ngày "
              :action-row="{ showNow: true }"
              now-button-label="Current"
            />
            <IconArrow
              class="w-4 h-4 text-slate-600 absolute right-10 sm:right-2 top-1/2"
            ></IconArrow>
          </div>
        </div>
        <!--  -->
        <div class="flex gap-2.5">
          <!-- Tên viết tắt -->
          <div class="w-100.5 text-left h-16 space-y-1">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5.5"
            >
              Địa chỉ
            </label>
            <input
              type="text"
              id="shortName"
              placeholder="Nhập địa chỉ"
              class="h-9 w-full border border-gray-300 rounded-md px-4  py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <!-- Tên viết tắt -->
          <div class="w-42 text-left h-16 relative space-y-1">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5.5"
            >
              Phường/Xã
            </label>
            <select
              class="appearance-none h-9 text-slate-600 outline-none w-42 text-sm rounded-lg border border-slate-300 px-7 sm:px-3 py-1.5"
            >
              <option value="BotBanHang">---Chọn---</option>
              <option value="Retion">Retion</option>
              <option value="AppOn">AppOn</option>
            </select>
            <IconArrow
              class="w-4 h-4 text-slate-600 absolute right-10 sm:right-2 top-1/2"
            ></IconArrow>
          </div>
          <!-- Tên viết tắt -->
          <div class="w-42 text-left h-16 relative space-y-1">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5.5"
            >
              Quận/Huyện
            </label>
            <select
              class="appearance-none h-9 text-slate-600 outline-none w-42 text-sm rounded-lg border border-slate-300 px-7 sm:px-3 py-1.5"
            >
              <option value="BotBanHang">---Chọn---</option>
              <option value="Retion">Retion</option>
              <option value="AppOn">AppOn</option>
            </select>
            <IconArrow
              class="w-4 h-4 text-slate-600 absolute right-10 sm:right-2 top-1/2"
            ></IconArrow>
          </div>
          <!-- Tên viết tắt -->
          <div class="w-42 text-left h-16 relative space-y-1">
            <label
              for="shortName"
              class="block text-sm font-medium text-gray-700 h-5.5"
            >
              Tỉnh/Thành phố
            </label>
            <select
              class="appearance-none h-9 text-slate-600 outline-none w-42 text-sm rounded-lg border border-slate-300 px-7 sm:px-3 py-1.5"
            >
              <option value="BotBanHang">---Chọn---</option>
              <option value="Retion">Retion</option>
              <option value="AppOn">AppOn</option>
            </select>
            <IconArrow
              class="w-4 h-4 text-slate-600 absolute right-10 sm:right-2 top-1/2"
            ></IconArrow>
          </div>
        </div>
      </main>
      <footer class="flex items-center justify-between px-6 py-3">
        <button class="px-4 text-sm font-medium text-customDark py-2 border rounded-md border-slate-300">Hủy</button>
        <button class="px-4 py-2 text-sm text-white font-medium bg-primary rounded-md ">Tạo chi nhánh</button>
      </footer>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
/**Icon*/
import IconHome from "@/components/icons/IconHome.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
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
/**Biến*/
const date = ref(new Date());
/**Biến mở đóng modal*/
const open = ref(false);
/**Hàm mở modal*/ 
function showModal() {
  open.value = true;
}
/**Hàm đóng modal*/ 
function handleOk() {
  open.value = false;
}
</script>

<style lang="scss" scoped></style>
