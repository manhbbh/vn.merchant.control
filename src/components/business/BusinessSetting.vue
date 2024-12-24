<template>
  <!-- các phần con -->
  <div class="flex-1 flex flex-col gap-2 overflow-y-auto">
    <div class="py-3 px-4 bg-white rounded-lg flex items-start gap-3">
      <!-- icon -->
      <IconInformation class="w-5 h-5"></IconInformation>
      <!--content  -->
      <div class="flex-col flex-1 gap-3">
        <div class="flex h-5 items-center mb-3">
          <h4 class="flex justify-start text-sm font-medium">
            Thông tin chung
          </h4>
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
          <!-- Địa chỉ -->
          <div class="md:col-span-3 text-left h-16">
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
    <!-- 2 -->
    <div class="py-3 px-4 bg-white rounded-lg flex items-start gap-3">
      <!-- icon -->
      <IconHome class="w-5 h-5"></IconHome>
      <!--content  -->
      <div class="flex flex-col gap-2 w-full">
        <div class="flex h-5 items-center justify-between mb-3">
          <h4 class="flex justify-start text-sm font-medium">
            Thông tin chung
          </h4>
          <div
            class="flex items-center gap-2 bg-slate-100 py-1 px-2 h-5 cursor-pointer rounded-md"
          >
            <!-- icon -->
            <IconAdd class="w-3 h-3"></IconAdd>
            <p class="text-xs">Thêm chi nhanh</p>
          </div>
        </div>
        <table class="min-w-full border-none bg-white rounded-lg z-10">
          <thead
            class="bg-slate-200 h-7 text-sm font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
          >
            <tr class="h-7">
              <th class="px-5 text-left font-semibold text-slate-800">#</th>
              <th class="px-5 text-left font-semibold text-slate-800">
                Tên viết tắt
              </th>
              <th class="px-5 text-left font-semibold text-slate-800">
                Địa chỉ
              </th>
              <th
                class="px-5 text-left font-semibold text-slate-800 hidden md:table-cell"
              >
                Ngày thành lập
              </th>
              <th
                class="px-5 text-left font-semibold text-slate-800 hidden md:table-cell"
              >
                Số nhân sự
              </th>
              <th
                class="px-5 text-left font-semibold text-slate-800 hidden md:table-cell"
              >
                Trạng thái
              </th>
              <th
                class="px-5 text-left font-semibold text-slate-800 hidden md:table-cell"
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(business, index) in list_business"
              :key="index"
              class="hover:bg-slate-100 text-black h-9 cursor-pointer text-sm overflow-y-auto h-full"
            >
              <!-- stt-->
              <td class="py-2 text-left px-5 items-center space-x-4">
                <p>{{ index + 1 }}</p>
              </td>
              <!-- tên viết tắt -->
              <td class="text-left px-5 py-2 items-center space-x-4">
                <p>{{ business.name_business }}</p>
              </td>

              <!-- địa chỉ -->
              <td class="text-left px-5 py-2">
                <p>{{ business.address_business }}</p>
              </td>

              <!-- ngày thành lập -->
              <td
                class="text-left px-5 py-2 text-customGray hidden md:table-cell text-15px"
              >
                <p>{{ business.day_business }}</p>
              </td>

              <!-- số nhân sự -->
              <td class="text-left px-5 py-2 hidden md:table-cell">
                <p class="text-sm">
                  {{ business.number_business }}
                </p>
              </td>

              <!-- trạng thái -->
              <td class="text-left px-5 py-2 hidden md:table-cell">
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
              <td class="text-left px-5 py-2 hidden md:table-cell">
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
    <!-- 3 -->
    <div class="py-3 px-4 bg-white rounded-lg flex items-start gap-3">
      <!-- icon -->
      <IconEmploye class="w-5 h-5"></IconEmploye>
      <!--content  -->
      <div class="flex flex-col gap-2 w-full">
        <div class="flex h-5 items-center justify-between mb-3">
          <h4 class="flex justify-start text-sm font-medium">
            Thông tin chung
          </h4>
          <div
            class="flex items-center gap-2 bg-slate-100 py-1 px-2 h-5 cursor-pointer rounded-md"
          >
            <!-- icon -->
            <IconAdd class="w-3 h-3"></IconAdd>
            <p class="text-xs">Thêm chi nhanh</p>
          </div>
        </div>
        <!--  -->
        <table class="min-w-full border-none bg-white rounded-lg z-10">
          <thead
            class="bg-slate-200 h-7 text-sm font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
          >
            <tr class="h-7">
              <th class="px-5 text-left font-semibold text-slate-800">#</th>
              <th class="px-5 text-left font-semibold text-slate-800">
                Họ và tên
              </th>
              <th class="px-5 text-left font-semibold text-slate-800">Email</th>
              <th
                class="px-5 text-left font-semibold text-slate-800 hidden md:table-cell"
              >
                Chi nhánh đang hoạt động
              </th>
              <th
                class="px-5 text-left font-semibold text-slate-800 hidden md:table-cell"
              >
                Ngày tạo
              </th>
              <th
                class="px-5 text-left font-semibold text-slate-800 hidden md:table-cell"
              >
                Trạng thái
              </th>
              <th
                class="px-5 text-left font-semibold text-slate-800 hidden md:table-cell"
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
                  class="h-5 py-0.5 rounded bg-slate-100 px-2 text-xs font-medium"
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
              <td class="text-left px-3 py-2 hidden md:table-cell">
                <div
                  :class="{
                    'bg-green-500': employee.operation_business === 'Kích hoạt',
                    'bg-red-500': employee.operation_business === 'Tạm ngừng',
                  }"
                  class="h-5 flex justify-center px-2 text-white rounded-md py-0.5"
                >
                  <p class="text-xs font-medium">
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
    <!-- 4 -->
    <div class="py-3 px-4 bg-white rounded-lg flex items-start gap-3">
      <!-- icon -->
      <IconTime class="w-5 h-5"></IconTime>
      <!--content  -->
      <div class="flex flex-col gap-2 w-full">
        <div class="flex-col mb-3">
          <h4 class="flex h-5 mb-2.5 justify-start text-sm font-medium">
            Thời gian làm việc
          </h4>
          <p class="flex h-5 justify-start text-sm text-gray-500">
            Khi tạo thêm Chi nhánh thì mặc định kế thừa cấu hình này. Ngoài ra,
            có thể thiết lập tùy biến theo từng Chi nhánh.
          </p>
        </div>
        <!--  -->
        <div class="h-10 flex items-start gap-2 mb-2">
          <IconWorld class="h-5 w-5"></IconWorld>
          <!--  -->
          <div
            class="flex flex-1 border-b bottom-1 border-slate-200 items-center justify-between"
          >
            <div class="flex-col mb-3">
              <h4 class="flex h-5 justify-start text-sm font-medium">
                Múi giờ
              </h4>
              <p class="flex h-5 justify-start text-sm text-gray-500">
                Thiết lập múi giờ theo khu vực kinh doanh, giúp báo cáo thống kê
                chính xác.
              </p>
            </div>
            <!-- select -->
            <div class="relative">
              <select
                class="appearance-none h-9 text-slate-600 outline-none w-85 text-sm rounded-lg border border-slate-300 px-3 py-1.5"
              >
                <option value="BotBanHang">
                  (GMT +7:00) Hanoi, Bangkok, Jakarta
                </option>
                <option value="Retion">Retion</option>
                <option value="AppOn">AppOn</option>
              </select>
              <IconArrow
                class="w-4 h-4 text-slate-600 absolute right-2 top-2.5"
              ></IconArrow>
            </div>
          </div>
        </div>
        <!-- 3 -->
        <div class="h-10 flex items-start gap-2">
          <IconPapers class="h-5 w-5"></IconPapers>
          <!--  -->
          <div class="flex flex-1 items-center justify-between">
            <div class="flex-col mb-3">
              <h4 class="flex h-5 justify-start text-sm font-medium">
                Thời gian làm việc trong ngày
              </h4>
              <p class="flex h-5 justify-start text-sm text-gray-500">
                Thiết lập thời gian làm việc giúp thống kê, tính tiền lương P1,
                P2 chính xác.
              </p>
            </div>
            <!-- select -->
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" />
              <div
                class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"
              ></div>
            </label>
          </div>
        </div>
        <!--  -->
        <!-- Vòng lặp qua mảng -->
        <div
          v-for="(day, index) in LIST_DAYS"
          :key="index"
          class="flex flex-col text-sm border-b-2 border-slate-50 items-center py-2 text-gray-900 md:flex-row"
        >
          <div class="mb-2 flex w-full items-center justify-between">
            <div class="sm: flex">
              <div class="w-32 flex-none py-2 font-medium">
                {{ day.title }}
              </div>
            </div>
          </div>

          <div class="mb-2 flex w-full items-center justify-between">
            <select
              v-model="day.work_status"
              class="outline-none mr-0 flex-none rounded-md border px-3 py-2.5 md:mr-3"
            >
              <option value="full_time">Cả ngày</option>
              <option value="part_time">Theo ca</option>
              <option value="day_off">Ngày nghỉ</option>
            </select>
            <!--  -->
            <p class="grow text-center md:px-4">từ</p>
            <div class="flex rounded-md border px-3 py-2.5">
              <input
                type="number"
                min="0"
                max="23"
                class="w-10 text-center"
                v-model="day.checkin.hour"
              />
              <p class="mr-1">giờ</p>
              <input
                type="number"
                min="0"
                max="59"
                class="w-10 text-center"
                v-model="day.checkin.minute"
              />
              <p>phút</p>
            </div>
            <p class="grow text-center md:px-4">đến</p>
            <div class="mr-0 flex rounded-md border px-3 py-2.5 md:mr-5">
              <input
                type="number"
                min="0"
                max="23"
                class="w-10 text-center outline-none"
                v-model="day.checkout.hour"
              />
              <p class="mr-1">giờ</p>
              <input
                type="number"
                min="0"
                max="59"
                class="w-10 text-center"
                v-model="day.checkout.minute"
              />
              <p>phút</p>
            </div>
            <div class="flex w-full justify-start">
              <!-- select -->
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" v-model="day.active" />
                <div
                  class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
/**Icon*/
import IconTick from "../icons/IconTick.vue";
import IconInformation from "@/components/icons/IconInformation.vue";
import IconPause from "@/components/icons/IconPause.vue";
import IconHome from "@/components/icons/IconHome.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconEmploye from "@/components/icons/IconEmploye.vue";
import IconWorld from "@/components/icons/IconWorld.vue";
import IconPapers from "@/components/icons/IconPapers.vue";
import IconArrow from "@/components/icons/IconArrow.vue";

/**ảnh */
import IconAdd from "@/components/icons/IconAdd.vue";

/**Biến*/
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
// danh sách thứ
const LIST_DAYS = [
  {
    active: true,
    checkin: {
      hour: 9,
      minute: 0,
    },
    checkout: {
      hour: 18,
      minute: 0,
    },
    title: "Thứ 2",
    work_status: "full_time",
  },
  {
    active: true,
    checkin: {
      hour: 9,
      minute: 0,
    },
    checkout: {
      hour: 18,
      minute: 0,
    },
    title: "Thứ 3",
    work_status: "full_time",
  },
  {
    active: true,
    checkin: {
      hour: 9,
      minute: 0,
    },
    checkout: {
      hour: 18,
      minute: 0,
    },
    title: "Thứ 4",
    work_status: "full_time",
  },
  {
    active: true,
    checkin: {
      hour: 9,
      minute: 0,
    },
    checkout: {
      hour: 18,
      minute: 0,
    },
    title: "Thứ 5",
    work_status: "full_time",
  },
  {
    active: true,
    checkin: {
      hour: 9,
      minute: 0,
    },
    checkout: {
      hour: 18,
      minute: 0,
    },
    title: "Thứ 6",
    work_status: "full_time",
  },
  {
    active: true,
    checkin: {
      hour: 9,
      minute: 0,
    },
    checkout: {
      hour: 18,
      minute: 0,
    },
    title: "Thứ 7",
    work_status: "full_time",
  },
  {
    active: false,
    checkin: {
      hour: 9,
      minute: 0,
    },
    checkout: {
      hour: 18,
      minute: 0,
    },
    title: "Chủ nhật",
  },
];
</script>

<style lang="scss" scoped></style>
