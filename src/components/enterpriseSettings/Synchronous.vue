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
                  for=""
               >
                  Tổ chức
               </label>
               <!-- :close="() => (is_open_dropbox = false)" -->
               <DropBox
                  place="bottom"
                  class="w-full"
               >
                  <template #trigger>
                     <button
                        class="flex justify-between border-border border px-3 py-2 w-full truncate rounded-md"
                        @click="is_open_dropbox = true"
                     >
                        <p>
                           {{ businesses?.[business_id || '']?.name || 'Không chọn' }}
                        </p>
                        <IconDown class="w-5 h-5" />
                     </button>
                  </template>
                  <template #box>
                     <ul
                        v-if="is_open_dropbox"
                        class="bg-white p-2 border rounded w-full my-1 max-h-80 overflow-auto"
                     >
                        <!-- <li>
                           <button
                              class="text-start p-2 w-full truncate rounded-md hover:bg-slate-100"
                              :class="{
                                 '!bg-blue-700 text-white': !business_data.redirect_to,
                              }"
                              @click="changeId(business_data?._id, '')"
                           >
                              Không chọn
                           </button>
                        </li> -->
                        <li v-for="item in Object.values(businesses)">
                           <button
                              class="text-start p-2 w-full truncate rounded-md hover:bg-slate-100"
                              :class="{
                                 '!bg-blue-700 text-white': business_id === item._id,
                              }"
                              @click="changeBusinessId(item._id, business_data?._id)"
                           >
                              {{ item?.name }}
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
                  Tổ chức
               </label>
               <p class="text-start py-2 px-3 border border-border bg-slate-50 shadow-sm rounded-md">
                  {{ business_data?.short_name || business_data?.name }}
               </p>
            </div>
            <!--  -->
            <!-- <div class="flex col-span-7 pl-3 items-center gap-1">
            <div class="py-1.5">
            <IconWarning class="w-5 h-5 shrink-0"></IconWarning>
            </div>
            <p class="text-xs text-left truncate text-red-500">
            Bạn không còn là Quản trị viên của Tổ chức Bot Bán Hàng, vui lòng
            kiểm tra lại
            </p>
         </div> -->
         </div>
         <!--  -->
         <div class="flex flex-col gap-1 w-full">
            <!-- Tiêu đề -->
            <div class="grid grid-cols-16 w-full items-end">
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
            <!--Nội dung các input  -->
            <div
               v-for="(item, index) in branches_sync"
               :key="index"
               class="border-slate-100 w-full"
               :class="{
                  'border-b , pb-3': index !== branches.length - 1,
                  'pt-3': index !== 0,
               }"
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
                     <!-- :close="() => (is_open_dropbox = false)" -->
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
                              <li v-for="branch in branches">
                                 <button
                                    class="text-start p-2 w-full truncate rounded-md hover:bg-slate-100"
                                    :class="{
                                       '!bg-blue-700 text-white': item?.redirect_to === branch._id,
                                    }"
                                    @click="
                                       changeBranchId(item?.branch_id, branch._id),
                                          getEmployeeData(item, item.token_business, branch.access_token)
                                    "
                                 >
                                    {{ branch?.name }}
                                 </button>
                              </li>
                           </ul>
                        </template>
                     </DropBox>
                  </div>
               </div>

               <!-- Danh sách nhân sự -->
               <div
                  v-if="item.redirect_to"
                  class="flex flex-col gap-2 mt-2"
               >
                  <p
                     v-if="item.redirect_to && !Object.keys(item.current_employees || {})?.length"
                     v-tooltip="'Nhấn để xem danh sách nhân sự'"
                     @click="getEmployeeData(item, item.token_business, getRedirectTokenBusiness(item.redirect_to))"
                     class="text-left flex items-center gap-2 cursor-pointer w-fit"
                  >
                     Hiển thị danh sách nhân sự
                     <ArrowsRightLeftIcon class="h-5 w-5" />
                  </p>
                  <p
                     v-if="item.redirect_to && Object.keys(item.current_employees || {})?.length"
                     class="text-left flex items-center gap-2 w-fit"
                  >
                     Liên kết nhân sự
                     <ArrowsRightLeftIcon class="h-5 w-5" />
                  </p>
                  <div
                     v-for="e in item.current_employees"
                     class="grid grid-cols-16 w-full items-end"
                  >
                     <!-- Thông tin nhân sự -->
                     <div class="col-span-4 flex items-center gap-3 px-3 py-1 rounded-md border">
                        <img
                           v-if="e?.avatar"
                           :src="e?.avatar"
                           class="w-9 h-9 rounded-full"
                        />
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
                                    'px-3 py-3':
                                       !e.linked_employee_id || !item.redirect_employees?.[e.linked_employee_id],
                                    'px-3 py-1':
                                       e.linked_employee_id && item.redirect_employees?.[e.linked_employee_id],
                                 }"
                                 @click="openDropbox()"
                              >
                                 <p v-if="!e.linked_employee_id || !item.redirect_employees?.[e.linked_employee_id]">
                                    {{ 'Không chọn' }}
                                 </p>
                                 <div
                                    v-if="e.linked_employee_id && item.redirect_employees?.[e.linked_employee_id]"
                                    class="flex items-center gap-3"
                                 >
                                    <img
                                       v-if="item.redirect_employees?.[e.linked_employee_id]?.avatar"
                                       :src="item.redirect_employees?.[e.linked_employee_id]?.avatar"
                                       class="w-9 h-9 rounded-full"
                                    />
                                    <div
                                       v-else
                                       class="w-9 h-9 border border-slate-200 rounded-full flex items-center justify-center text-black"
                                    >
                                       {{
                                          createShortName(
                                             item.redirect_employees?.[e.linked_employee_id] as EmployeeData
                                          )
                                       }}
                                    </div>
                                    {{ item.redirect_employees?.[e.linked_employee_id]?.first_name }}
                                    {{ item.redirect_employees?.[e.linked_employee_id]?.last_name }}
                                 </div>
                                 <IconDown
                                    class="w-5 h-5 flex-shrink-0"
                                    :class="{
                                       'mt-2': e.linked_employee_id && item.redirect_employees?.[e.linked_employee_id],
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
                                       :class="{
                                          '!bg-slate-100 text-white': !item.redirect_to,
                                       }"
                                       @click="
                                          ;(e.linked_employee_id = ''),
                                             (is_open_dropbox = false),
                                             updateEmployeeData(item, e)
                                       "
                                    >
                                       Không chọn
                                    </button>
                                 </li>
                                 <li v-for="re in item.redirect_employees">
                                    <button
                                       v-show="checkName(`${re.first_name} ${re.last_name}`)"
                                       class="text-start p-2 w-full truncate rounded-md hover:bg-slate-200 flex items-center gap-3"
                                       :class="{
                                          '!bg-gray-300 text-black': e?.linked_employee_id === re._id,
                                       }"
                                       @click=";(e.linked_employee_id = re._id), updateEmployeeData(item, e)"
                                    >
                                       <img
                                          v-if="re?.avatar"
                                          :src="re?.avatar"
                                          class="w-9 h-9 rounded-full"
                                       />
                                       <div
                                          v-else
                                          :class="{ '!border-black': e?.linked_employee_id === re._id }"
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

               <!--  -->
               <!-- <div
            v-if="!item.active"
            class="flex col-span-7 pl-3 items-center gap-1"
          >
            <div class="py-1.5">
              <IconWarning class="w-5 h-5 shrink-0"></IconWarning>
            </div>
            <p class="text-xs text-left truncate text-red-500">
              Bạn không còn quản lý Trang này, vui lòng kết nối lại Trang bên
              Bot Bán Hàng.
            </p>
            <div class="py-1.5">
              <IconNexts class="w-5 h-5 shrink-0"></IconNexts>
            </div>
          </div> -->
            </div>
         </div>
      </div>
      <!--  -->
   </div>
</template>

<script setup lang="ts">
/** Libraries, Services */
import { get, set } from 'lodash'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores'
import { computed, nextTick, ref } from 'vue'
import { updateBusiness, getEmployee, updateEmployee } from '@/service/api/api'

/** Icon */
import IconSyn from '@/components/icons/IconSyn.vue'
import IconDown from '@/components/icons/IconDown.vue'
import IconNexts from '@/components/icons/IconNexts.vue'
import { ArrowsRightLeftIcon } from '@heroicons/vue/24/outline'

/** Components */
import DropBox from '@/components/DropBox.vue'

/** Interfaces */
import { BranchData, BusinessBranchData, EmployeeData } from '@/service/interface'
import { nonAccentVn } from '@/service/helper/format'

/** store */
const commonStore = useCommonStore()
const { businesses, branches, business_data, branches_ids } = storeToRefs(commonStore)

/** ẩn hiện dropbox */
const is_open_dropbox = ref(false)

/** id của tổ chức đang được chọn */
const business_id = ref('')

/** từ khóa tìm kiếm */
const keyword = ref('')

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
      _id?: string
      linked_employee_id?: string
      access_token?: string
   }
}>({})

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

/** thay đổi id doanh nghiệp, chi nhánh */
async function changeIdv1(id?: string, redirect_to?: string) {
   try {
      // đóng select
      is_open_dropbox.value = false

      // nếu vẫn là giá trị cũ thì thôi
      if (id === business_data.value._id) {
         business_data.value.redirect_to = redirect_to

         branches.value.forEach(async (item, index) => {
            if (item.redirect_to) {
               await updateBusiness({ body: { id: item._id, redirect_to: '' } })
               branches.value[index].redirect_to = ''
            }
         })
      }

      // cập nhật id redirect_to của doanh nghiệp
      await updateBusiness({ body: { id, redirect_to } })

      if (id !== business_data.value._id) {
         branches.value = branches.value.map(item => {
            if (item._id === id) item.redirect_to = redirect_to
            return item
         })
      }
   } catch (error) {
      console.log(error)
   }
}

/** hàm đổi id doanh nghiệp */
function changeBusinessId(id?: string, redirect_to?: string) {
   // đóng select
   is_open_dropbox.value = false

   // nếu không có id của doanh nghiệp đang chọn thì thôi
   if (!id) return

   // lấy danh sách các chi nhánh của doanh nghiệp đã chọn
   business_id.value = id
}

/** hàm xử lý đổi id chi nhánh */
async function changeBranchId(id?: string, redirect_to?: string) {
   try {
      // nếu không có id của chi nhán đang cần được điều hướng thì thôi
      if (!id) return

      // đóng select
      is_open_dropbox.value = false

      // cập nhật id redirect_to của chi nhánh
      // await updateBusiness({ body: { id, redirect_to } })
      set(branhes_to_update.value, `[${id}]`, { id, redirect_to })

      /** id của danh nghiệp đang được chọn */
      const ID = business_id.value

      /** dữ liệu của branch đang chọn */
      const BRANCH = businesses.value?.[ID]?.branchs?.[id]

      // xóa các nhân sự trong BU này đã thay đổi
      Object.keys(BRANCH?.current_employees || {}).forEach(key => {
         // xóa trong mảng cập nhật
         delete employees_to_update.value?.[key]

         // nếu nhân sự nào đang có linked_employee_id thêm vào danh sách cập nhật về rỗng
         if (BRANCH?.current_employees?.[key]?.linked_employee_id) {
            employees_to_update.value[key] = {
               _id: key,
               linked_employee_id: '',
               access_token: BRANCH?.token_business,
            }

            /** đường dẫn đến field linked_employee_id của nhân sự hiện tại */
            const PATH = `[${ID}].branchs[${id}].current_employees[${key}].linked_employee_id`

            // cập nhật nó về rỗng
            set(businesses.value, PATH, '')
         }
      })

      // cập nhật field redirect_to của chi nhánh đang cần điều hướng
      set(businesses.value, `[${ID}].branchs[${id}].redirect_to`, redirect_to)

      // đặt danh sách các nhân sự về rỗng
   } catch (e) {
      console.log(e)
   }
}

/** Lấy danh sách nhân sự */
async function getEmployeeData(branch: BranchData, current_token?: string, redirect_token?: string) {
   try {
      /** Lấy danh sách nhân sự hiện tại */
      await getCurrentEmployees(branch, current_token)

      /** Lấy danh sách nhân sự sẽ điều hướng tới */
      await getRedirectEmployees(branch, redirect_token)
   } catch (error) {
      console.log(error)
   }
}

/** Lấy danh sách nhân sự hiện tại */
async function getCurrentEmployees(branch: BranchData, access_token?: string) {
   try {
      /** Lấy danh sách nhân sự */
      const { data } = await getEmployee({ access_token })

      /** Khởi tạo dữ liệu nhân sự */
      branch.current_employees = {}

      /** Dữ liệu nhân sự */
      data.map((item: EmployeeData) => {
         if (item._id && branch.current_employees) {
            branch.current_employees[item._id] = item
         }
      })
   } catch (error) {
      console.log(error)
   }
}

/** Lấy danh sách nhân sự sẽ điều hướng tới */
async function getRedirectEmployees(branch: BranchData, access_token?: string) {
   try {
      /** Lấy danh sách nhân sự */
      const { data } = await getEmployee({ access_token })

      /** Khởi tạo dữ liệu nhân sự */
      branch.redirect_employees = {}

      /** Lưu lại token điều hướng */
      branch.redirect_token = access_token

      data.map((item: EmployeeData) => {
         if (item._id && branch.redirect_employees) {
            branch.redirect_employees[item._id] = item
         }
      })
   } catch (error) {
      console.log(error)
   }
}

/** Tạo tên rút gọn */
function createShortName(e: EmployeeData) {
   if (!e) return ''
   const first = e.first_name?.charAt(0).toUpperCase()
   const last = e.last_name?.charAt(0).toUpperCase()
   return `${first}${last}`
}

/** Cập nhật thông tin nhân sự */
async function updateEmployeeData(branch: BusinessBranchData, employee: EmployeeData) {
   try {
      // const { data } = await updateEmployee({
      //    body: {
      //       _id: employee._id,
      //       linked_employee_id: employee.linked_employee_id,
      //    },
      //    access_token: branch.token_business,
      // })

      // thêm vào mảng nhân sự cần cập nhật
      set(employees_to_update.value, `[${employee._id}]`, {
         _id: employee._id,
         linked_employee_id: employee.linked_employee_id,
         access_token: branch.token_business,
      })

      is_open_dropbox.value = false
   } catch (error) {
      console.log(error)
   }
}

/** Lấy ra token BU đang điều hướng */
function getRedirectTokenBusiness(id: string) {
   /** chi nhánh đang cần chọn đề điều hướng tới */
   const BRANCH = branches_ids.value?.[id]

   /** trả về token chi nhánh đang điều hướng tới */
   if (BRANCH) return BRANCH.access_token

   // nếu không trả về rỗng
   return ''
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
         await updateEmployee({
            body: {
               _id: EMPLOYEES_TO_UPDATE[i]._id,
               linked_employee_id: EMPLOYEES_TO_UPDATE[i].linked_employee_id,
            },
            access_token: EMPLOYEES_TO_UPDATE[i].access_token,
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
