<template>
  <div class="text-center overflow-y-auto sm:h-screen sm:overflow-hidden">
    <main
      class="w-full flex flex-col gap-2 bg-gray-100 p-2 h-screen overflow-hidden text-black"
    >
      <!-- phần trên -->
      <header
        class="rounded-xl static top-0 sm:h-14 bg-white py-2 px-5 flex justify-between items-center flex-shrink-0"
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
      <div
        class="flex-1 flex flex-col gap-2 overflow-y-auto sm:overflow-hidden sm:flex-row"
      >
        <!-- Phần trái -->
        <nav
          class="relative px-2 gap-1  sm:h-full flex-shrink-0 rounded-xl bg-white overflow-hidden flex flex-col mb-2 md:w-82 sm:mb-0 sm:w-1/2"
        >
          <!--  -->
          <ul class="pt-3 flex flex-col gap-1">
            <li
              @click="selectedBusiness"
              :class="{ 'bg-slate-100': is_business }"
              class="flex items-center gap-2 h-13 rounded-lg p-2"
            >
              <div
                class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <IconBusiness class="w-5 h-5"></IconBusiness>
              </div>
              <h3 class="text-sm font-semibold">Cài đặt Doanh nghiệp</h3>
            </li>
            <li
              @click="selectedBrach"
              :class="{ 'bg-slate-100': !is_business }"
              class="flex items-center gap-2 h-13 rounded-lg p-2"
            >
              <div
                class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <IconHome class="w-5 h-5"></IconHome>
              </div>
              <h3 class="text-sm font-semibold">Cài đặt Chi nhánh</h3>
            </li>
          </ul>
          <!-- danh sách chi nhánh  -->
          <ul v-if="hidden_business" class="flex flex-col gap-3 ml-8 pb-2">
            <li
            @click="detaiBranch(control.name_control)"
              :class="{ 'bg-slate-100': name_baranch === control.name_control }"
              v-for="control in list_branch"
              class="flex items-center cursor-pointer gap-2 h-13 rounded-lg border border-slate-200 p-2"
            >
              <FormatAvartar :employee="control" :size="5"></FormatAvartar>
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
                <p
                  class="text-slate-500 text-xs h-4 flex justify-start truncate"
                >
                  {{ control.address_control }}
                </p>
              </div>
            </li>
          </ul>       
        </nav>
        <!-- phần phải -->
        <div
          class="flex-1 flex flex-col gap-2 md:overflow-y-auto sm:overflow-hidden"
        >
          <BusinessSetting v-if="is_business"></BusinessSetting>
          <!--  -->
          <BranchSetting v-else :detaiBranch="is_branch"> </BranchSetting>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
/**compomnet con*/
import BusinessSetting from "@/components/business/BusinessSetting.vue";
import BranchSetting from "@/components/business/BranchSetting.vue";
import FormatAvartar from "@/components/avartar/FormatAvartar.vue";
/**Icon*/
import IconHome from "@/components/icons/IconHome.vue";
import IconBusiness from "@/components/icons/IconBusiness.vue";
import IconStar from "@/components/icons/IconStar.vue";
/**ảnh */
import Avatar from "@/assets/imgs/Avatar.png";

/**Biến*/
/**Biến kiểm tra hiện doanh nghiệp hay ứng dụng */
const is_business = ref(true);
/** Biến hiển thị danh sách chi nhánh*/
const hidden_business = ref(false);
/**danh sách chi nhánh*/ 
const list_branch = ref([
  {
    name_control: "Trụ sở chính 1",
    address_control: "Trụ sở chính",
    image_control: "",
    star_control: true,
    type_control: "main",
  },
  {
    name_control: "BU Hà Nội",
    address_control: "Chi nhánh 19 Tố Hữu",
    image_control: "",
    star_control: false,
    type_control: "HN",
  },
  {
    name_control: "BU Hồ Chí Minh",
    address_control: "Chi nhánh 19 Tố Hữu",
    image_control: Avatar,
    star_control: false,
    type_control: "HN",
  },
  {
    name_control: "BU Đà Nẵng",
    address_control: "Chi nhánh 19 Tố Hữu",
    image_control: "",
    star_control: true,
    type_control: "HCM",
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
]);
/**Biến chuyền prod sang cho component con*/ 
const is_branch = ref(true);
/**Biến xem bấm vào chi nhánh nào */
const name_baranch = ref("");

/**hàm bấm chọn cài đặt Chi nhánh*/ 
function selectedBrach() {
  is_business.value = false;
  hidden_business.value = true;
  name_baranch.value = ""
  console.log("selectedBusiness",is_branch);
  is_branch.value = true
}
/** hàm bấm chọn cài đặt Doanh nghiệp*/
function selectedBusiness() {
  is_business.value = true;
  hidden_business.value = false;
  name_baranch.value = ""
}
/**Hàm khi bấm vào một chi nhánh nào đó*/
function detaiBranch(name: string) {
  is_branch.value = false
  name_baranch.value = name
} 

</script>
<style scoped lang="scss"></style>
