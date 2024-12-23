<template>
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
        <div
          v-if="app.setting_app"
          class="flex gap-1 items-center"
          :class="{ 'text-blue-700': app.setting_app === 'installed' }"
        >
          <p class="text-sm font-medium">Cài đặt</p>
          <IconSetting
            class="h-5 w-5"
            :class="{ 'text-blue-700': app.setting_app === 'installed' }"
          ></IconSetting>
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
              class="custom-rounded text-sm flex w-9 h-9 items-center justify-center font-semibold text-white"
            >
              {{ (control.name_control?.charAt(0) || "").toUpperCase() }}
            </div>
          </object>
          <!-- không có avatar -->
          <div
            v-else
            :class="{
              'bg-sky-600': control.type_control === 'main',
              'bg-purple-600': control.type_control === 'HN',
              'bg-green-600': control.type_control === 'HCM',
            }"
            class="custom-rounded text-sm flex w-9 h-9 items-center justify-center font-semibold text-white"
          >
            {{ (control.name_control?.charAt(0) || "").toUpperCase() }}
          </div>
          <!--  -->
          <div class="flex-1 flex flex-col justify-start h-9">
            <div class="flex items-center h-5 justify-between">
              <h3 class="text-sm font-medium">
                {{ control.name_control }}
              </h3>
              <IconStar v-if="control.star_control" class="h-5 w-5"></IconStar>
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
</template>

<script setup lang="ts">
import { ref } from "vue";
/**Icon*/
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
        image_control: "",
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
        image_control: "",
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
        image_control: "",
        star_control: true,
        type_control: "HCM",
      },
      {
        name_control: "Kênh Online",
        address_control: "17909870000000000",
        image_control: "",
        star_control: true,
        type_control: "HN",
      },
    ],
  },
]);
</script>

<style lang="scss" scoped></style>
