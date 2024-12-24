<template>
  <div class="text-center overflow-y-auto sm:h-screen sm:overflow-hidden">
    <main class="w-full flex flex-col gap-2 bg-gray-100 p-2 h-screen overflow-hidden text-black">
      <!-- phần trên -->
      <header
        class="rounded-xl  static top-0 sm:h-14 bg-white py-2 px-5 flex justify-between items-center flex-shrink-0"
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
      <div class="flex-1 flex  flex-col gap-2 overflow-y-auto sm:overflow-hidden sm:flex-row">
        <!-- Phần trái -->
        <nav
          class="relative h-100 sm:h-full flex-shrink-0  rounded-xl bg-white overflow-hidden  flex flex-col mb-2 md:w-82 sm:mb-0 sm:w-1/2 "
        >
          <!--  -->
          <ul class="pt-3 px-2 flex flex-col gap-1">
            <li
            @click="is_business = true"
            :class="{'bg-slate-100':is_business}"
              class=" flex items-center gap-2 h-13 rounded-lg p-2"
            >
              <div
                class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <IconHome class="w-5 h-5"></IconHome>
              </div>
              <h3 class="text-sm font-semibold">Doanh nghiệp</h3>
            </li>
            <li
            @click="is_business = false"
            :class="{'bg-slate-100':!is_business}"
             class="flex items-center gap-2 h-13 rounded-lg p-2">
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
        <div class="flex-1 flex flex-col gap-2 md:overflow-y-auto sm:overflow-hidden ">         
          <Business v-if="is_business"></Business>
          <!--  -->
          <Application v-else></Application>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
/**compomnet con*/
import Business from "@/components/ingredients/Business.vue"; 
import Application from "@/components/ingredients/Application.vue";
/**Icon*/ 
import IconHome from "@/components/icons/IconHome.vue";
import IconApplication from "@/components/icons/IconApplication.vue";

/**Biến*/
/**Biến kiểm tra hiện doanh nghiệp hay ứng dụng */ 
const is_business = ref(true)
</script>
<style scoped lang="scss"></style>
