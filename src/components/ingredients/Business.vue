<template>
  <!-- các phần con -->
  <div class="flex-1 flex flex-col gap-2 overflow-y-auto ">
    <div
      v-for="app in list_app"
      class="py-3 px-4 bg-white rounded-lg flex items-start gap-3 "
    >
      <!-- icon -->
      <IconBag class="w-5 h-5"></IconBag>
      <!--content  -->
      <div class="flex flex-1 justify-start flex-col gap-3">
        <div class="flex h-5 items-center justify-between">
          <h4 class="flex justify-start text-sm font-medium">
            {{ app.name_key ? $t(app.name_key) : app.name_app }}
          </h4>
          <div
            v-if="app.setting_app"
            class="flex gap-1 items-center"
            :class="{ 'text-blue-700': app.setting_app === 'installed' }"
          >
            <p class="text-sm font-medium">{{ $t('v1.common.setting') }}</p>
            <IconSetting
              class="h-5 w-5"
              :class="{ 'text-blue-700': app.setting_app === 'installed' }"
            ></IconSetting>
          </div>
        </div>
        <!-- danh sách -->
        <ul class="grid grid-cols-1 gap-1 gap-y-3 lg:gap-6 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
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
                {{ getControlInitial(control) }}
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
              {{ getControlInitial(control) }}
            </div>
            <!--  -->
            <div class="flex-1 flex flex-col justify-start h-9">
              <div class="flex items-center h-5 justify-between">
                <h3 class="text-sm font-medium">
                  {{ getControlName(control) }}
                </h3>
                <IconStar v-if="control.star_control" class="h-5 w-5"></IconStar>
              </div>
              <!--  -->
              <p class="text-slate-500 text-xs h-4 flex justify-start truncate" >
                {{ control.address_key ? $t(control.address_key) : control.address_control }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from 'vue-i18n'
/**Icon*/
import IconBag from "@/components/icons/IconBag.vue";
import IconStar from "@/components/icons/IconStar.vue";
import IconSetting from "@/components/icons/IconSetting.vue";

/**ảnh */
import Avatar from "@/assets/imgs/Avatar.png";

const { t } = useI18n()

/**Biến*/
/**Danh sách */
const list_app = ref([
  {
    name_key: "v1.app.bot_sales",
    setting_app: "",
    list_control: [
      {
        name_key: "v1.common.headquarter",
        address_key: "v1.common.headquarter",
        image_control: Avatar,
        star_control: true,
        type_control: "main",
      },
      {
        name_key: "v1.app.branch_hanoi",
        address_key: "v1.app.branch_address_sample",
        image_control: Avatar,
        star_control: false,
        type_control: "main",
      },
      {
        name_key: "v1.app.branch_hcm",
        address_key: "v1.app.branch_address_sample",
        image_control: Avatar,
        star_control: false,
        type_control: "main",
      },
      {
        name_key: "v1.app.branch_danang",
        address_key: "v1.app.branch_address_sample",
        image_control: Avatar,
        star_control: true,
        type_control: "main",
      },
      {
        name_key: "v1.common.headquarter",
        address_key: "v1.common.headquarter",
        image_control: Avatar,
        star_control: true,
        type_control: "main",
      },
      {
        name_key: "v1.app.online_channel",
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
        name_key: "v1.common.headquarter",
        address_key: "v1.common.headquarter",
        image_control: "",
        star_control: true,
        type_control: "main",
      },
      {
        name_key: "v1.app.branch_hanoi",
        address_key: "v1.app.branch_address_sample",
        image_control: Avatar,
        star_control: false,
        type_control: "main",
      },
      {
        name_key: "v1.app.branch_hcm",
        address_key: "v1.app.branch_address_sample",
        image_control: "",
        star_control: false,
        type_control: "main",
      },
      {
        name_key: "v1.app.branch_danang",
        address_key: "v1.app.branch_address_sample",
        image_control: Avatar,
        star_control: true,
        type_control: "main",
      },
      {
        name_key: "v1.common.headquarter",
        address_key: "v1.common.headquarter",
        image_control: "",
        star_control: true,
        type_control: "HCM",
      },
      {
        name_key: "v1.app.online_channel",
        address_control: "17909870000000000",
        image_control: "",
        star_control: true,
        type_control: "HN",
      },
      {
        name_key: "v1.common.headquarter",
        address_key: "v1.common.headquarter",
        image_control: "",
        star_control: true,
        type_control: "HCM",
      },
      {
        name_key: "v1.app.online_channel",
        address_control: "17909870000000000",
        image_control: "",
        star_control: true,
        type_control: "HN",
      },
    ],
  },
]);

function getControlName(control: any) {
  return control.name_key ? t(control.name_key) : control.name_control
}

function getControlInitial(control: any) {
  return getControlName(control)?.charAt(0)?.toUpperCase() || ''
}
</script>

<style lang="scss" scoped></style>
