<template>
   <div class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3">
      <!-- icon -->
      <IconSyn class="w-5 h-5 flex-shrink-0"></IconSyn>
      <!--content  -->
      <div class="flex flex-col items-start flex-1 gap-2 lg:gap-3">
         <!-- <button @click="save()">Lưu</button> -->
         <div class="flex flex-col">
            <h4 class="flex justify-start text-sm font-medium">
               Đồng bộ Trang - {{ business_data?.short_name || business_data?.name }}
            </h4>
            <p class="text-sm text-muted">
               Kết nối Tổ chức, Chi nhánh với các Kênh bán hàng (Facebook, Zalo, Web ...) của
               {{ business_data?.short_name || business_data?.name }}.
            </p>
         </div>
         <!--  -->
         <div class="grid grid-cols-16 w-full items-end">
            <div class="flex col-span-4 flex-col gap-1">
               <label
                  class="text-center py-1 rounded bg-slate-200 text-sm font-medium"
               >
                  Tổ chức - Chatbox
               </label>
               <DropBox
                  place="bottom"
                  class="w-full"
               >
                  <template #trigger>
                     <button
                        class="flex justify-between border-border border px-3 py-2 w-full truncate rounded-md"
                        @click="is_open_dropbox = true"
                        :class="{
                           'text-red-500': message_error
                        }"
                     >
                        <p>
                           {{ 
                              businesses?.[business_id || '']?.short_name ||
                              businesses?.[business_id || '']?.name || 
                              'Không chọn' 
                           }}
                        </p>
                        <IconDown class="w-5 h-5" />
                     </button>
                  </template>
                  <template #box>
                     <ul
                        v-if="is_open_dropbox"
                        class="bg-white p-2 border rounded w-full my-1 max-h-80 overflow-auto"
                     >
                        <li v-for="item in Object.values(businesses)">
                           <button
                              class="text-start p-2 w-full truncate rounded-md hover:bg-slate-100"
                              :class="{
                                 '!bg-blue-700 text-white': business_id === item._id,
                              }"
                              @click="changeBusinessId(item._id, business_data?._id)"
                           >
                              {{ item?.short_name || item?.name }}
                           </button>
                        </li>
                     </ul>
                  </template>
               </DropBox>
            </div>

            <div class="py-2 flex justify-center">
               <IconNexts class="w-5 h-5 shrink-0"></IconNexts>
            </div>

            <div class="flex col-span-4 flex-col gap-1">
               <label
                  class="text-center py-1 rounded bg-slate-200 text-sm font-medium"
                  for=""
               >
                  Tổ chức - Merchant
               </label>
               <p class="text-start py-2 px-3 border border-border bg-slate-50 shadow-sm rounded-md">
                  {{ business_data?.short_name || business_data?.name }}
               </p>
            </div>

            <div v-if="message_error" class="flex gap-2 text-red-500 col-span-7 pl-4 items-center h-full">
               <ExclamationTriangleIcon class="w-5 h-5 flex-shrink-0" />
               <p class="text-xs text-wrap">{{ message_error }}</p>
            </div>
         </div>

         <!-- Danh sách nhân sự -->
         <div v-if="!isEmpty(selected_bm_employees) && !message_error" class="flex flex-col gap-1 w-full overflow-auto max-h-[50dvh]">
            <!-- Tiêu đề -->
            <div class="grid grid-cols-16 w-full items-end sticky top-0">
               <div class="flex col-span-4 flex-col gap-1">
                  <label
                     class="text-center py-1 rounded bg-slate-200 text-sm font-medium"
                     for=""
                  >
                     Nhân viên
                  </label>
               </div>
               <div class="py-2 flex justify-center"></div>
               <div class="flex col-span-4 flex-col gap-1">
                  <label
                     class="text-center py-1 rounded bg-slate-200 text-sm font-medium"
                     for=""
                  >
                     Nhân viên
                  </label>
               </div>
            </div>
            <!-- Danh sách nhân sự -->
            <div
               class="flex flex-col gap-2 mt-2"
            >
            <div
               v-for="e, key in selected_bm_employees"
               class="border-slate-100 w-full border-b pb-3"
            >
               <div
                  
                  class="grid grid-cols-16 w-full items-end"
               >
               
                  <!-- Thông tin nhân sự -->
                  <div class="col-span-4 flex items-center gap-3 px-3 py-1 rounded-md border bg-slate-100">
                     <object 
                        v-if="e?.avatar && convertAvatarUrl(e?.avatar)" 
                        :data="convertAvatarUrl(e?.avatar)" 
                        type="image/png"
                        class="w-9 h-9 rounded-full"
                     >
                        <div
                           class="w-9 h-9 border border-slate-200 rounded-full flex items-center justify-center text-black"
                        >
                           {{
                              createShortName(e)
                           }}
                        </div>
                     </object>
                     <div
                        v-else
                        class="w-9 h-9 border border-slate-200 rounded-full flex items-center justify-center text-black"
                     >
                        {{ createShortName(e) }}
                     </div>
                     <p>{{ e.first_name }} {{ e.last_name }}</p>
                  </div>
                  <!-- Icon Redirect -->
                  <div class="pb-3 flex justify-center">
                     <IconNexts class="w-5 h-5 shrink-0"></IconNexts>
                  </div>
                  <!-- Thông tin nhân sự điều hướng tới -->
                  <div class="col-span-4 flex flex-col gap-2">
                     <DropBox
                        place="bottom"
                        class="w-full"
                     >
                        <template #trigger>
                           <button
                              class="flex justify-between border-border border px-3 py-1 w-full truncate rounded-md disabled:bg-slate-100"
                              :class="{
                                 'py-3': !e.linked_user || !users?.[e.linked_user],
                                 'py-1': e.linked_user && users?.[e.linked_user],
                              }"
                              @click="openDropbox()"
                           >
                              <p v-if="!e.linked_user || !users?.[e.linked_user]">
                                 {{ 'Không chọn' }}
                              </p>
                              <div
                                 v-if="e.linked_user && users?.[e.linked_user]"
                                 class="flex items-center gap-3"
                              >
                                 <object
                                    v-if="users?.[e.linked_user]?.avatar"
                                    :data="users?.[e.linked_user]?.avatar" 
                                    type="image/png"
                                    class="w-9 h-9 rounded-full"
                                 >
                                    <div
                                       class="w-9 h-9 border border-slate-200 rounded-full flex items-center justify-center text-black"
                                    >
                                       {{ createShortName(users?.[e.linked_user]) }}
                                    </div>
                                 </object>
                                 <div
                                    v-else
                                    :class="{ '!border-black': e?.linked_user === e._id }"
                                    class="w-9 h-9 border border-slate-200 rounded-full flex items-center justify-center text-black"
                                 >
                                       {{ createShortName(users?.[e.linked_user]) }}
                                 </div>
                                 <p>
                                    {{ users?.[e.linked_user]?.first_name }}
                                    {{ users?.[e.linked_user]?.last_name }}
                                 </p>
                              </div>
                              <IconDown
                                 class="w-5 h-5 flex-shrink-0"
                                 :class="{
                                    'mt-2': e.linked_user && users?.[e.linked_user],
                                 }"
                              />
                           </button>
                        </template>
                        <template #box>
                           <ul
                              v-if="is_open_dropbox"
                              class="bg-white p-2 border rounded w-full my-1 max-h-80 overflow-auto"
                           >
                              <li class="w-full sticky top-0 bg-white">
                                 <input
                                    id="input_search"
                                    v-model="keyword"
                                    type="text"
                                    class="outline-none border w-full py-2 px-3 rounded-md"
                                 />
                              </li>
                              <li>
                                 <button
                                    class="text-start p-2 w-full truncate rounded-md hover:bg-slate-100"
                                    @click="() => {
                                       e.linked_user = ''
                                       changeEmployeeId(`${key}`, '')
                                    }"
                                 >
                                    Không chọn
                                 </button>
                              </li>
                              <li v-for="re, user_id in users">
                                 <button
                                    v-show="checkName(`${re.first_name} ${re.last_name}`) && !re.archive"
                                    class="text-start p-2 w-full truncate rounded-md hover:bg-slate-200 flex items-center gap-3"
                                    :class="{
                                       '!bg-gray-300 text-black': e?.linked_user === `${user_id}`,
                                    }"
                                    @click="() => {
                                       e.linked_user = `${user_id}`
                                       changeEmployeeId(`${key}`, `${user_id}`)
                                    }"
                                 >
                                    <object
                                       v-if="re?.avatar && convertAvatarUrl(re?.avatar)"
                                       :data="convertAvatarUrl(re?.avatar)"
                                       type="image/png"
                                       class="w-9 h-9 rounded-full"
                                    >
                                       <div
                                          class="w-9 h-9 border border-slate-200 rounded-full flex items-center justify-center text-black"
                                       >
                                          {{
                                             createShortName(e)
                                          }}
                                       </div>
                                    </object>
                                    <div
                                       v-else
                                       :class="{ '!border-black': e?.linked_employee_id === `${user_id}` }"
                                       class="w-9 h-9 border border-slate-200 rounded-full flex items-center justify-center text-black"
                                    >
                                       {{ createShortName(re) }}
                                    </div>
                                    {{ re?.first_name }} {{ re?.last_name }}
                                    
                                 </button>
                              </li>
                           </ul>
                        </template>
                     </DropBox>
                  </div>
               </div>
            </div>
            </div>
         </div>

         <!-- Danh sách các chi nhánh -->
         <div v-if="!isEmpty(branches_sync) && !message_error" class="flex flex-col gap-1 w-full overflow-auto max-h-[50dvh]">
            <!-- Tiêu đề -->
            <div class="grid grid-cols-16 w-full items-end sticky top-0">
               <div class="flex col-span-4 flex-col gap-1">
                  <label
                     class="text-center py-1 rounded bg-slate-200 text-sm font-medium"
                     for=""
                  >
                     Trang
                  </label>
               </div>
               <div class="py-2 flex justify-center"></div>
               <div class="flex col-span-4 flex-col gap-1">
                  <label
                     class="text-center py-1 rounded bg-slate-200 text-sm font-medium"
                     for=""
                  >
                     Chi nhánh
                  </label>
               </div>
            </div>

            <!-- Danh sách các chi nhánh  -->
            <div
               v-for="(item, index) in branches_sync"
               :key="index"
               class="border-slate-100 w-full"
               :class="{
                  'border-b , pb-3': index !== branches.length - 1,
                  'pt-3': index !== 0,
               }"
               v-show="!item.archive"
            >
               <div class="grid grid-cols-16 w-full items-end">
                  <div class="flex col-span-4 flex-col">
                     <p class="text-start py-3 px-3 border border-border bg-slate-50 shadow-sm rounded-md">
                        {{ item?.branch_name }}
                     </p>
                  </div>
                  <div class="py-2 flex justify-center">
                     <IconNexts class="w-5 h-5 shrink-0"></IconNexts>
                  </div>
                  <div class="flex col-span-4 flex-col gap-1">
                     <DropBox
                        place="bottom"
                        class="w-full"
                     >
                        <template #trigger>
                           <button
                              class="flex justify-between border-border border px-3 py-3 w-full truncate rounded-md disabled:bg-slate-100"
                              @click="is_open_dropbox = true"
                           >
                              <p class="truncate">
                                 {{ branches_ids?.[item?.redirect_to || '']?.name || 'Không chọn' }}
                              </p>
                              <IconDown class="w-5 h-5 flex-shrink-0" />
                           </button>
                        </template>
                        <template #box>
                           <ul
                              v-if="is_open_dropbox"
                              class="bg-white p-2 border rounded w-full my-1 max-h-80 overflow-auto"
                           >
                              <li>
                                 <button
                                    class="text-start p-2 w-full truncate rounded-md hover:bg-slate-100"
                                    :class="{
                                       '!bg-blue-700 text-white': !item.redirect_to,
                                    }"
                                    @click="changeBranchId(item?.branch_id, '')"
                                 >
                                    Không chọn
                                 </button>
                              </li>
                              <li v-for="branch in branches" v-show="!branch.archive">
                                 <button
                                    class="text-start p-2 w-full truncate rounded-md hover:bg-slate-100"
                                    :class="{
                                       '!bg-blue-700 text-white': item?.redirect_to === branch._id,
                                    }"
                                    @click="changeBranchId(item?.branch_id, branch._id)"
                                 >
                                    {{ branch?.name }}
                                 </button>
                              </li>
                           </ul>
                        </template>
                     </DropBox>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!--  -->
   </div>
</template>

<script setup lang="ts">
/** Libraries, Services */
import { get, isEmpty, set } from 'lodash'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores'
import { computed, ref } from 'vue'
import { nonAccentVn } from '@/service/helper/format'
import { updateBusiness, getLinkedUser, linkUser } from '@/service/api/api'

/** Icon */
import IconSyn from '@/components/icons/IconSyn.vue'
import IconDown from '@/components/icons/IconDown.vue'
import IconNexts from '@/components/icons/IconNexts.vue'
import { ArrowsRightLeftIcon } from '@heroicons/vue/24/outline'

/** Components */
import DropBox from '@/components/DropBox.vue'

/** Interfaces */
import { BusinessBranchData, EmployeeData } from '@/service/interface'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid'

/** store */
const commonStore = useCommonStore()
const { businesses, branches, business_data, branches_ids, users } = storeToRefs(commonStore)

/** ẩn hiện dropbox */
const is_open_dropbox = ref(false)

/** id của tổ chức đang được chọn */
const business_id = ref('')

/** từ khóa tìm kiếm */
const keyword = ref('')

/** thông báo lỗi */
const message_error = ref('')

/** danh sách các chi nhánh cần được chỉnh sửa */
const branhes_to_update = ref<{
   [key: string]: {
      id?: string
      redirect_to?: string
   }
}>({})

/** danh sách các nhân sự cần được chỉnh sửa */
const employees_to_update = ref<{
   [key: string]: {
      from_user_id?: string
      to_user_id?: string
   }
}>({})

/** danh sách nhân sự của tổ chức đang được chọn */
const selected_bm_employees = ref<{ [key: string]: EmployeeData }>({})

/** doanh nghiệp đang được đồng bộ tới */
const branches_sync = computed<{ [key: string]: BusinessBranchData }>(() => {
   /** id của danh nghiệp đang được chọn */
   const ID = business_id.value

   // trả về các chi nhánh của doanh nghiệp đang được chọn
   return businesses.value[ID]?.branchs || {}
})

/** hàm mở dropbox nhân sự */
function openDropbox() {
   // bật cờ mở dropbox
   is_open_dropbox.value = true

   // reset dữ liệu tìm kiếm
   keyword.value = ''

   // sau 100ms focus vào input tìm kiếm để đảm bảo input được render ra rồi
   setTimeout(() => {
      /** input tìm kiếm */
      const INPUT = document.getElementById('input_search')

      // focus vào input tìm kiếm
      INPUT?.focus()
   }, 100)
}

/** hàm kiểm tra xem tên có trùng với từ khóa tìm kiếm không */
function checkName(name: string = ''): boolean {
   /** tên sau khi được loại bỏ hết dấu khoảng cách và in hoa */
   const FORMATTED_NAME = nonAccentVn(name?.trim()).replace(/\s/g, '')

   /** từ khóa tìm kiếm sau khi được loại bỏ hết dấu khoảng cách và in hoa */
   const KEYWORD = nonAccentVn(keyword.value?.trim()).replace(/\s/g, '')

   // kiểm tra xem tên có chứa từ khóa tìm kiếm không
   return FORMATTED_NAME.includes(KEYWORD)
}

/** hàm đổi id doanh nghiệp */
function changeBusinessId(id?: string, redirect_to?: string) {
   // reset dữ liệu chi nhánh
   branhes_to_update.value = {}

   // reset dữ liệu nhân sự
   employees_to_update.value = {}

   // đóng select
   is_open_dropbox.value = false

   // nếu không có id của doanh nghiệp đang chọn thì thôi
   if (!id) return

   // lưu lại id doanh nghiệp đang chọn
   business_id.value = id

   /** call api lấy danh sách nhân sự */
   getCurrentEmployees()
}

/** hàm xử lý đổi id chi nhánh */
async function changeBranchId(id?: string, redirect_to?: string) {
   try {
      // nếu không có id của chi nhán đang cần được điều hướng thì thôi
      if (!id) return

      // đóng select
      is_open_dropbox.value = false

      // cập nhật id redirect_to của chi nhánh
      set(branhes_to_update.value, `[${id}]`, { id, redirect_to })

      /** id của danh nghiệp đang được chọn */
      const ID = business_id.value

      // cập nhật field redirect_to của chi nhánh đang cần điều hướng
      set(businesses.value, `[${ID}].branchs[${id}].redirect_to`, redirect_to)
   } catch (e) {
      console.log(e)
   }
}

/** hàm xử lý đổi id nhân sự */
function changeEmployeeId(from_user_id?: string, to_user_id?: string) {
   // đóng select
   is_open_dropbox.value = false

   // lưu lại id nhân sự đang cần được điều hướng
   set(employees_to_update.value, `[${from_user_id}]`, { from_user_id, to_user_id })
}

/** Lấy danh sách nhân sự của tổ chức chatbox đã chọn */
async function getCurrentEmployees() {
   try {
      // tắt cờ thông báo lỗi
      message_error.value = ''

      // bật cờ loading
      commonStore.is_loading_full_screen = true

      /** Danh sashc nhân sự của tổ chức chatbox đã chọn */
      const RES = await getLinkedUser({
         body:{
            from_business_id: business_id.value,
            to_business_id: business_data.value._id
         }
      })

      // lưu lại danh sách nhân sự của tổ chức chatbox đã chọn
      selected_bm_employees.value = RES.data
   } catch (e) {
      console.log(e)
      // lưu lại thông báo lỗi
      message_error.value = e as string
   } finally {
      // tắt cờ loading
      commonStore.is_loading_full_screen = false
   }
}

/** Tạo tên rút gọn */
function createShortName(e: EmployeeData) {
   if (!e) return ''
   const first = e.first_name?.charAt(0).toUpperCase()
   const last = e.last_name?.charAt(0).toUpperCase()
   return `${first}${last}`
}

/** đổi lại link avatar nhân sự */
function convertAvatarUrl(old_url: string): string {
   if(old_url.includes('merchant')) return old_url
   /** regex tìm kiếm id avatar */
   const REGEX = /\/avatar\/([a-f0-9]{32})/;
   /** danh sách các ID được lấy ra */
   const MATCH = old_url.match(REGEX);

   /** nếu có thì lưu lại ID */
   if (MATCH && MATCH[1]) {
      /** ID của nhân sự */
      const ID = MATCH[1];
      return `https://cdn.botbanhang.vn/media/s/${ID}/user`;
   }

   // nếu không có thì trả về rỗng
  return ''; // hoặc throw error nếu bạn muốn xử lý lỗi rõ ràng hơn
}

/** hàm lưu các thay đổi */
async function save() {
   try {
      // đổi object mảng chi nhánh cần cập nhật sang array
      const BRANCHES_TO_UPDATE = Object.values(branhes_to_update.value || {})

      // đổi object mảng nhân sự cần cập nhật sang array
      const EMPLOYEES_TO_UPDATE = Object.values(employees_to_update.value || {})

      // lặp qua từng chi nhánh cần cập nhật để cập nhật
      for (let i = 0; i < BRANCHES_TO_UPDATE.length; i++) {
         // call api cập nhật chi nhánh
         await updateBusiness({
            body: BRANCHES_TO_UPDATE[i],
         })
      }

      // lặp qua từng nhân sự cần cập nhật để cập nhật
      for (let i = 0; i < EMPLOYEES_TO_UPDATE.length; i++) {
         // call api cập nhật nhân sự
         await linkUser({
            body: {
               from_business_id: business_id.value,
               to_business_id: business_data.value._id,
               from_user_id: EMPLOYEES_TO_UPDATE[i].from_user_id,
               to_user_id: EMPLOYEES_TO_UPDATE[i].to_user_id,
            }
         })
      }

      // reset dữ liệu chi nhánh
      branhes_to_update.value = {}

      // reset dữ liệu nhân sự
      employees_to_update.value = {}
   } catch (e) {
      console.log(e)
   }
}

defineExpose({ save })
</script>
