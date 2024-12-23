<template>
  <div class="text-center overflow-y-auto h-screen">
    <main class="w-full flex flex-col gap-2 bg-gray-100 p-2 h-full text-black">
      <!-- phần trên -->
      <header
        class="rounded-xl h-14 bg-white py-2 px-5 flex justify-between items-center"
      >
        <!-- logo and name -->
        <div class="flex gap-2 items-center justify-start">
          <img src="@/assets/imgs/Image113.png" h-9 w-9 alt="logoMerchant" />
          <h2 class="text-2xl font-semibold">Merchant</h2>
        </div>
        <!-- avatar -->
        <img src="@/assets/imgs/Image114.png" h-9 w-9 alt="avartaUser" />

      </header>
      <!-- Phần thân -->
      <div class="flex-1 flex flex-row gap-2">
        <!-- Phần trái -->
        <nav
          class="relative h-full flex-shrink-0 rounded-xl bg-white overflow-hidden w-82 flex flex-col mb-2 sm:mb-0"
        >
          <!--  -->
          <ul class="pt-3 px-2 flex flex-col gap-1">
            <li
              class="bg-slate-100 flex items-center gap-2 h-13 rounded-lg p-2"
            >
              <div
                class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <IconHome class="w-5 h-5"></IconHome>
              </div>
              <h3 class="text-sm font-semibold">Doanh nghiệp</h3>
            </li>
            <li class="flex items-center gap-2 h-13 rounded-lg p-2">
              <div
                class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <IconApplication class="w-5 h-5"></IconApplication>
              </div>
              <h3 class="text-sm font-semibold">Ứng dụng</h3>
            </li>
          </ul>
          <!--  -->
          <p
            class="h-5 text-slate-500 bg-icon-info text-sm px-2 flex items-center justify-start absolute bottom-3"
          >
            Doanh nghiệp đã xóa
          </p>
        </nav>
        <!-- phần phải -->
        <div class="flex-1 flex flex-col gap-2 h-full">
          <!-- các phần con -->
          <div
            v-for="app in list_app"
            class="py-3 px-4 bg-white rounded-lg h-43 flex items-start gap-3"
          >
            <!-- icon -->
            <IconBag class="w-5 h-5"></IconBag>
            <!--content  -->
            <div class="flex flex-1 justify-start flex-col gap-3">
              <div class="flex h-5 items-center justify-between">
                <h4 class="flex justify-start text-sm font-medium">
                  {{ app.name_app }}
                </h4>
                <div v-if="app.setting_app" class="flex gap-1 items-center" :class="{'text-blue-700':app.setting_app==='installed'}" >
                  <p class="text-sm font-medium">Cài đặt</p>
                  <IconSetting class="h-5 w-5" :class="{'text-blue-700':app.setting_app==='installed'}"></IconSetting>
                </div>
              </div>
              <!-- danh sách -->
              <ul class="grid grid-cols-4 gap-6 gap-y-3">
                <li
                  v-for="control in app.list_control"
                  class="flex items-center gap-2 h-13 rounded-md border border-slate-200 p-2"
                >
                
                <object
                  v-if="control && control.image_control"
                  :data="control.image_control"
                  type="image/png"
                  class="custom-rounded w-9 h-9"
                >
                  <div
                  
                  class="custom-rounded text-sm flex w-9 h-9 items-center justify-center  font-semibold text-white"
                >
                  {{
                    (control.name_control?.charAt(0) || '').toUpperCase() 
                   
                  }}
                </div>
                </object>
                <!-- không có avatar -->
                <div
                  v-else
                  :class="{'bg-sky-600': control.type_control==='main',
                    'bg-purple-600':control.type_control==='HN',
                    'bg-green-600':control.type_control==='HCM',

                  }"
                  class="custom-rounded text-sm flex w-9 h-9 items-center justify-center font-semibold text-white"
                >
                  {{
                    (control.name_control?.charAt(0) || '').toUpperCase() 
                  }}
                </div>
                  <!--  -->
                  <div class="flex-1 flex flex-col justify-start h-9">
                    <div class="flex items-center h-5 justify-between">
                      <h3 class="text-sm font-medium">
                        {{ control.name_control }}
                      </h3>
                      <IconStar
                        v-if="control.star_control"
                        class="h-5 w-5"
                      ></IconStar>
                    </div>
                    <!--  -->
                    <p class="text-slate-500 text-xs h-4 flex justify-start">
                      {{ control.address_control }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
/**Icon*/ 
import IconHome from "@/components/icons/IconHome.vue";
import IconApplication from "@/components/icons/IconApplication.vue";
import IconBag from "@/components/icons/IconBag.vue";
import IconStar from "@/components/icons/IconStar.vue";
import IconSetting from "@/components/icons/IconSetting.vue";

/**ảnh */
import Avatar from "@/assets/imgs/Avatar.png";

/**Biến*/
/**Danh sách */
const list_app = ref([
  {
    name_app: "Bot Bán Hàng",
    setting_app: "",
    list_control: [
      {
        name_control: "Trụ sở chính",
        address_control: "Trụ sở chính",
        image_control: Avatar,
        star_control: true,
        type_control: "main",

      },
      {
        name_control: "BU Hà Nội",
        address_control: "Chi nhánh 19 Tố Hữu",
        image_control: Avatar,
        star_control: false,
        type_control: "main",

      },
      {
        name_control: "BU Hồ Chí Minh",
        address_control: "Chi nhánh 19 Tố Hữu",
        image_control: Avatar,
        star_control: false,
        type_control: "main",

      },
      {
        name_control: "BU Đà Nẵng",
        address_control: "Chi nhánh 19 Tố Hữu",
        image_control: Avatar,
        star_control: true,
        type_control: "main",

      },
      {
        name_control: "Trụ sở chính",
        address_control: "Trụ sở chính",
        image_control: Avatar,
        star_control: true,
        type_control: "main",

      },
      {
        name_control: "Kênh Online",
        address_control: "17909870000000000",
        image_control: Avatar,
        star_control: true,
        type_control: "main",

      },
    ],
  },
  {
    name_app: "Retion",
    setting_app: "installed",
    list_control: [
      {
        name_control: "Trụ sở chính",
        address_control: "Trụ sở chính",
        image_control: '',
        star_control: true,
        type_control: "main",
      },
      {
        name_control: "BU Hà Nội",
        address_control: "Chi nhánh 19 Tố Hữu",
        image_control: Avatar,
        star_control: false,
        type_control: "main",
      },
      {
        name_control: "BU Hồ Chí Minh",
        address_control: "Chi nhánh 19 Tố Hữu",
        image_control: '',
        star_control: false,
        type_control: "main",
      },
      {
        name_control: "BU Đà Nẵng",
        address_control: "Chi nhánh 19 Tố Hữu",
        image_control: Avatar,
        star_control: true,
        type_control: "main",
      },
      {
        name_control: "Trụ sở chính",
        address_control: "Trụ sở chính",
        image_control: '',
        star_control: true,
        type_control: "HCM",
      },
      {
        name_control: "Kênh Online",
        address_control: "17909870000000000",
        image_control: '',
        star_control: true,
        type_control: "HN",
      },
    ],
  },
]);
</script>
<style scoped lang="scss"></style>
