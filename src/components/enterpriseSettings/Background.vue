<template>
  <div class="py-3 px-4 bg-white rounded-lg flex items-start gap-3">
    <!-- icon -->
    <IconBackground class="w-5 h-5"></IconBackground>
    <!--content  -->
    <div class="flex-col flex-1">
      <div class="flex h-9 items-start justify-between">
        <h4 class="flex justify-start text-sm font-medium">Hình nền</h4>
        <div class="flex items-center gap-2.5">
          <p class="text-sm font-medium text-slate-500 h-9 px-6 py-2">
            Khôi phục mặc định
          </p>
          <button
            class="h-9 w-18 text-sm font-medium text-white rounded-md bg-black"
          >
            Thêm
          </button>
        </div>
      </div>
      <!-- phần các ô input  -->
      <div class="flex gap-3">
        <div class="flex flex-1 gap-1 flex-col">
          <p class="text-left text-xs font-medium">Web PC</p>

          <table class="min-w-full bg-white flex-1 z-10">
            <thead
              class="bg-slate-200 h-7 text-semibold rounded-2xl text-xs "
            >
              <tr class=" rounded-lg">
                <th class="px-2 w-8 text-left font-semibold">STT</th>
                <th class="text-center w-25 font-semibold">Ảnh</th>
                <th class="text-left w-34 font-semibold">Người tạo</th>
                <th class="text-center w-15 font-semibold hidden md:table-cell">
                  Hiển thị
                </th>
                <th class="text-center w-15 font-semibold">Xóa</th>
                <th class="text-center w-15 font-semibold"></th>
              </tr>
            </thead>
            <!--  -->
            <tbody>
              <tr
                v-for="(holiday, index) in list_background"
                :key="index"
                class="text-black h-15 cursor-pointer text-sm border-b border-gray-200 overflow-y-auto"
              >
                <!-- stt-->
                <td class="">
                  <p class="flex w-8 px-4 text-blue-500 font-semibold">
                    {{ index + 1 }}
                  </p>
                </td>
                <!-- ảnh -->
                <td class="">
                  <div
                    class="h-16 text-center flex justify-center items-center"
                  >
                    <img
                      :src="holiday.avatar_employee"
                      class="w-31 h-12.5 flex justify-center rounded"
                      alt=""
                    />
                  </div>
                </td>

                <!--tên -->
                <td class="">
                  <p class="text-sm text-left">
                    {{ holiday.name_create_holiday }}
                  </p>
                </td>

                <!--  -->
                <td class="">
                  <!-- select -->
                  <label
                    class="inline-flex h-16 items-center justify-center cursor-pointer"
                  >
                    <input type="checkbox" value="" class="sr-only peer" v-model="holiday.hidden_image" />
                    <div
                      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"
                    ></div>
                  </label>
                </td>

                <!-- xóa -->
                <td class="">
                  <div
                    class="h-6 inline-flex text-red-500 bg-red-50 font-medium text-xs rounded-md px-2 py-0.5 items-center justify-center"
                  >
                    {{ holiday.delete_holiday }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--  -->
        <div class="flex flex-1 gap-1 flex-col">
          <p class="text-left text-xs font-medium">Mobie App</p>

          <table class="min-w-full border-none bg-white flex-1 rounded-lg z-10">
            <thead
              class="bg-slate-200 h-7 text-xs font-semibold sticky top-0 text-customDarkBlue flex-shrink-0 z-10"
            >
              <tr class="h-7">
                <th class="px-2 w-8 text-left font-semibold">STT</th>
                <th class="text-center w-25 font-semibold">Ảnh</th>
                <th class="text-left w-34 font-semibold">Người tạo</th>
                <th class="text-center w-15 font-semibold hidden md:table-cell">
                  Hiển thị
                </th>
                <th class="text-center w-15 font-semibold">Xóa</th>
                <th class="text-center w-15 font-semibold"></th>
              </tr>
            </thead>
            <!--  -->
            <tbody>
              <tr
                v-for="(holiday, index) in list_background"
                :key="index"
                class="text-black h-15 cursor-pointer text-sm border-b border-gray-200 overflow-y-auto"
              >
                <!-- stt-->
                <td class="">
                  <p class="flex w-8 px-4 text-blue-500 font-semibold">
                    {{ index + 1 }}
                  </p>
                </td>
                <!-- ảnh -->
                <td class="">
                  <div
                    class="h-16 text-center flex justify-center items-center"
                  >
                    <img
                      :src="holiday.avatar_employee"
                      class="w-7.5 h-11.5 flex overflow-hidden object-cover justify-center rounded"
                      alt=""
                    />
                  </div>
                </td>

                <!--tên -->
                <td class="">
                  <p class="text-sm text-left">
                    {{ holiday.name_create_holiday }}
                  </p>
                </td>

                <!--  -->
                <td class="">
                  <!-- select -->
                  <label
                    class="inline-flex h-16 items-center justify-center cursor-pointer"
                  >
                    <input type="checkbox" value="" class="sr-only peer" v-model="holiday.hidden_image" />
                    <div
                      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"
                    ></div>
                  </label>
                </td>

                <!-- xóa -->
                <td class="">
                  <div
                    class="h-6 inline-flex text-red-500 bg-red-50 font-medium text-xs rounded-md px-2 py-0.5 items-center justify-center"
                  >
                    {{ holiday.delete_holiday }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--  -->
      <div class="flex flex-col py-2 ">
        <div class="flex h-9 gap-4 ">
          <div class="flex items-center gap-4 ">
            <p class="text-sm font-medium">Link</p>
            <input type="text" class="w-67 h-9 border rounded-md px-2 border-slate-300 " placeholder="https://">
          </div>
          <div class="flex items-center gap-4 ">
            <p class="text-sm font-medium">Loại hình nền</p>
            <select
              id="from-time"
              class="mr-0 flex items-center h-9 w-30 rounded-md border px-3 py-2"
            >
              <option value="22">Web PC</option>
              <option value="21">Mobie App</option>
             
              <!-- Add more options as needed -->
            </select>
          </div>
          <button class="px-4 py-2 flex justify-center items-center rounded-lg bg-green-500 text-white ">
            Lưu
          </button>
        </div>
        <p class=" h-4 text-xs text-left text-slate-700">Lưu ý: Kích thước ảnh Web PC (2560 x  1440), Mobile App (440 x 956), loại File (.png , .jpg). Sử dụng https://imgbb.com để upload ảnh.</p>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

/**ICon*/
import IconBackground from "@/components/icons/IconBackground.vue";
import avarta from "@/assets/imgs/ImageWeb.png";
import avartaAPP from "@/assets/imgs/ImageApp.png";
/**Danh sách */
const list_background = ref([
  {
    name_create_holiday: "Nguyễn Đình Tùng",
    avatar_employee: avarta,
    delete_holiday: "Xóa",
    hidden_image: true,
  },
  {
    day_holiday: "28/4",
    title_holiday: "Quốc khánh Việt Nam",
    day_create_holiday: "2/9",
    name_create_holiday: "Nguyễn Đình Tùng",
    avatar_employee: avarta,
    time_create_holiday: "10:00 - 12/4/2024",
    delete_holiday: "Xóa",
  },
]);
</script>

<style lang="scss" scoped></style>
