<template>
  <div class="text-center overflow-y-auto sm:h-screen sm:overflow-hidden">
    <main
      v-if="is_authenticated"
      class="w-full flex flex-col bg-gray-100 lg:px-3 pb-3 h-screen overflow-hidden text-black"
    >
      <!-- phần trên -->
      <header
        class="static top-0 py-2 px-2 lg:px-0 flex justify-end items-center flex-shrink-0"
      >
        <!-- back và cài đặt chấm công -->
        <!-- <div class="flex gap-2.5 items-center h-7.5 justify-start">
          <IconBack class="h-5 w-5 flex-shrink-0"></IconBack>
          <h2 class="text-lg font-medium hidden sm:flex">Cài đặt chấm công</h2>
        </div> -->
        <!-- copy nút lưu  -->
        <div class="flex gap-7 items-center justify-start h-10">
          <!-- <div class="flex items-center gap-2.5 h-7.5">
            <IconCopy class="h-5 w-5 flex-shrink-0"></IconCopy>
            <p class="text-lg text-slate-500 font-medium">Sao chép</p>
          </div> -->
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium"
            @click="handleSave()"
          >
            Lưu lại
          </button>
        </div>
      </header>
      <!-- Phần thân -->
      <div
        class="flex-1 bg-white flex p-3 flex-col gap-2 overflow-y-auto sm:overflow-hidden sm:flex-row"
      >
        <!-- Phần trái -->
        <nav
          class="relative h-full flex-shrink-0 rounded-md bg-gray-100 overflow-hidden hidden lg:flex flex-col mb-2 md:w-56"
        >
          <!--  -->
          <ul class="p-2 flex flex-col gap-3">
            <a
              v-for="(menu, index) in LIST_MENU"
              :key="index"
              @click="redirect(menu)"
              :class="{ 'bg-white': menu.id_menu === is_component }"
              class="flex items-center gap-2.5 h-9 rounded py-2 px-3 cursor-pointer"
              :href="menu.id_menu"
            >
              <!-- Render icon động -->
              <component
                :is="menu.icon"
                class="w-5 h-5"
                :class="{
                  'text-black': menu.id_menu === is_component,
                  'text-muted': menu.id_menu !== is_component,
                }"
              ></component>

              <h3
                :class="{
                  'text-black': menu.id_menu === is_component,
                  'text-muted': menu.id_menu !== is_component,
                }"
                class="text-sm font-semibold"
              >
                {{ menu.name_item }}
              </h3>
            </a>
          </ul>
          <!--  -->
        </nav>
        <!-- phần phải -->
        <div
          class="flex-1 flex flex-col gap-2 md:overflow-y-auto sm:overflow-hidden"
        >
          <!--  -->
          <DetailTimeSeup></DetailTimeSeup>
        </div>
      </div>
    </main>
    <Template401 v-else />
  </div>
</template>
<script setup lang="ts">
// * library
import { onMounted, ref } from 'vue'

/** compomnet con */
import DetailTimeSeup from '@/components/timeboxing/DetailTimeSeup.vue'

/**Icon*/
import IconBack from '@/components/icons/IconBack.vue'
import IconCopy from '@/components/icons/IconCopy.vue'

/** Icon ở menu */
import IconEmployee from '@/components/icons/iconMenu/IconEmployee.vue'
import IconSettings from '@/components/icons/iconMenu/IconSettings.vue'
import IconHistory from '@/components/icons/iconMenu/IconHistory.vue'
import { queryString } from '@/service/helper/queryString'
import { useCommonStore } from '@/stores'
import { Toast } from '@/service/helper/toast'
import { useRouter } from 'vue-router'
import Template401 from '@/components/Template401.vue'
import {
  getHistorySettingTimeboxing,
  getSettingTimeboxing,
  saveSettingTimeboxing,
} from '@/service/api/api_timeboxing'
import {
  getBusinessEmployee,
  getEmployee,
  getSettingBranch,
  getUserInfo,
} from '@/service/api/api'
import { useTimeboxingStore } from '@/stores/timeboxing'
import { storeToRefs } from 'pinia'

// * interface
interface Menu {
  id_menu: string
  name_item: string
  icon: any
}

/** Biến danh sách menu */
const LIST_MENU: Menu[] = [
  {
    id_menu: '#general',
    name_item: 'Thiết lập chung',
    icon: IconSettings,
  },
  {
    id_menu: '#employee',
    name_item: 'Nhân sự',
    icon: IconEmployee,
  },
  {
    id_menu: '#history',
    name_item: 'Lịch sử thiết lập',
    icon: IconHistory,
  },
]

// * store
const commonStore = useCommonStore()
const timeboxingStore = useTimeboxingStore()
const { form_of_work,employee_setting, history_timeboxing_setting } = storeToRefs(timeboxingStore)

// * toast
const $toast = new Toast()

// * router
const router = useRouter()

/** Biến kiểm tra mở component con nào */
const is_component = ref<string>('#general')

// * có token hay không
const is_authenticated = ref(false)

onMounted(() => {
  getDataFromUrl()
  getSettings()
  getSettingBranchs()
  getHistories()
  getDataMerchant()
})

/** lấy các dữ liệu thiết lập */
async function getSettings() {
  try {
    const RES = await getSettingTimeboxing({
      body: {},
    })
    RES?.forEach((item: any) => {
      if(item?.type === 'EMPLOYEE'){
        employee_setting.value = item?.data?.employees
      }
    })
  } catch (e) {
    $toast.error(e)
  }
}

/** lấy dữ liệu cài đặt từ chi nhánh của merchant */
async function getSettingBranchs() {
  try {
    const RES = await getSettingBranch({
      body: {
        setting_type: 'form_of_work',
      },
    })

    if (RES?.data?.setting_data) {
      form_of_work.value = RES?.data?.setting_data
    }
  } catch (e) {
    $toast.error(e)
  }
}

/** lấy dữ liệu lịch sử thiết lập */
async function getHistories() {
  try {
    const RES = await getHistorySettingTimeboxing({
      body: {
        skip: 0,
        limit: 20,
      },
    })

    history_timeboxing_setting.value = RES
  } catch (e) {
    $toast.error(e)
  }
}

/** lấy dữ liệu merchant */
async function getDataMerchant() {
  try {
    getUserInfos()
    getEmployees()
    getBusinessEmployees()
  } catch (e) {
    $toast.error(e)
  }
}

/** lấy thông tin nhân viên hiện tại */
async function getUserInfos() {
  try {
    const RES = await getUserInfo({
      body: {},
    })

    if (RES.data) timeboxingStore.profile = RES.data
  } catch (e) {
    $toast.error(e)
  }
}

/** lấy danh sách nhân viên của chi nhánh */
async function getEmployees() {
  try {
    const RES = await getEmployee({
      body: {},
    })
    
    if(RES?.data){
      timeboxingStore.employees_ids = RES?.data?.reduce(
        (acc: any, curr: any) => {
          acc[curr._id] = curr
          return acc
        },
        {}
      )
    }

  } catch (e) {
    $toast.error(e)
  }
}

/** lấy thông tin của BM */
async function getBusinessEmployees() {
  try {
    const RES = await getBusinessEmployee({
      body: {},
    })

    if(RES.data?.employees){
      timeboxingStore.business_employees_ids = RES.data?.employees?.reduce(
        (acc: any, curr: any) => {
          acc[curr._id] = curr
          return acc
        },
        {}
      )
    }

    if (RES.data?.branches) {
      timeboxingStore.business_branches = RES.data?.branches
    }
  } catch (e) {
    $toast.error(e)
  }
}

/** lấy dữ liệu từ url */
function getDataFromUrl() {
  /** lấy user_token */
  const TOKEN_BUSINESS =
    queryString('token_business') || localStorage.getItem('token_business')

  // nếu thiếu dữ liệu thôi
  if (!TOKEN_BUSINESS) {
    return
  }

  // lưu lại dữ liệu vào store
  commonStore.branch_data.access_token = TOKEN_BUSINESS
  localStorage.setItem('token_business', TOKEN_BUSINESS)

  router.replace({ query: {} })

  is_authenticated.value = true
}

/** hàm lưu thiết lập */
async function handleSave(){
  try {
    await saveSettingTimeboxing({
      body: {
        "type": "EMPLOYEE",
        data: {
          employees: employee_setting.value?.map(item => {
            return {
              ...item,
              salary_p2: Number(item?.salary_p2 || 0)
            }
          })
        }
      },
    })
    $toast.success('Lưu thiết lập thành công')
  } catch (e) {
    $toast.error(e)
  }
}

/**Hàm*/
function redirect(selectedMenu: Menu) {
  is_component.value = selectedMenu.id_menu
}
</script>
