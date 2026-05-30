<template>
   <div class="min-h-screen bg-gray-100 p-2 text-black">
      <main
         v-if="is_authenticated"
         class="mx-auto flex h-[calc(100dvh-16px)] max-w-7xl flex-col gap-2"
      >
         <section class="flex-1 overflow-y-auto">
            <Synchronous ref="synchrononus_ref" />
         </section>
      </main>
      <Template401 v-else />
   </div>
</template>

<script setup lang="ts">
import { useGetData } from '@/hook.ts'
import { useCommonStore } from '@/stores'
import { queryString } from '@/service/helper/queryString'
import { getBusiness } from '@/service/api/api'

import { onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import Template401 from '@/components/Template401.vue'
import Synchronous from '@/components/enterpriseSettings/Synchronous.vue'

import type { BusinessBranchData, CompanyData } from '@/service/interface'

const commonStore = useCommonStore()
const { businesses } = storeToRefs(commonStore)
const { getBusinessInfos } = useGetData()
const router = useRouter()

const is_authenticated = ref(false)
const synchrononus_ref = ref<typeof Synchronous | null>(null)

onMounted(async () => {
   // Đăng ký lắng nghe message từ iframe cha gửi xuống
   window.addEventListener('message', handleParentMessage)

   // Lấy token và business_id từ URL hoặc localStorage để xác thực màn hình nhúng
   getDataFromUrl()

   if (!is_authenticated.value) {
      // gửi lên token không hợp lệ
      sendMessageToParent('401', {})
      return
   }

   commonStore.is_loading_full_screen = true

   try {
      // Lấy dữ liệu cần thiết trước khi cho phép thao tác đồng bộ
      await Promise.all([getBusinessInfos(), getBusinesses()])
   } catch (e) {
      // Nếu lấy dữ liệu lỗi thì báo về iframe cha để cha xử lý trạng thái lỗi
      sendMessageToParent('401', {})
   } finally {
      commonStore.is_loading_full_screen = false
   }
})

onUnmounted(() => {
   // Gỡ listener khi rời màn hình để tránh bị gọi lặp nhiều lần
   window.removeEventListener('message', handleParentMessage)
})

function getDataFromUrl() {
   const USER_TOKEN = queryString('token_user') || localStorage.getItem('user_token')
   const BUSINESS_ID = queryString('business_id') || localStorage.getItem('business_id')

   if (!USER_TOKEN || !BUSINESS_ID) return

   commonStore.user_token = USER_TOKEN
   commonStore.business_id = BUSINESS_ID

   localStorage.setItem('user_token', USER_TOKEN)
   localStorage.setItem('business_id', BUSINESS_ID)

   router.replace({ query: {} })
   is_authenticated.value = true
}

async function getBusinesses() {
   try {
      const res = (await getBusiness({
         body: {
            user_setting_bm: false,
         },
      })) as CompanyData[]

      businesses.value = res.reduce<Record<string, CompanyData>>((acc, item) => {
         if (!item?._id) return acc

         const branchs = Array.isArray(item?.branches)
            ? item.branches.reduce<Record<string, BusinessBranchData>>((branchAcc, branch) => {
                 const branchId = branch?._id || branch?.id || branch?.branch_id

                 if (branchId) branchAcc[branchId] = branch

                 return branchAcc
              }, {})
            : item?.branches || {}

         acc[item._id] = {
            ...item,
            branchs,
         }

         return acc
      }, {})
   } catch (error) {
      throw error
   }
}

async function saveSetting() {
   try {
      // Bật loading toàn màn hình trong lúc lưu cài đặt đồng bộ
      commonStore.is_loading_full_screen = true

      // Gọi hàm save đã expose từ component Synchronous
      await synchrononus_ref.value?.save()
   } catch (error) {
   } finally {
      // Tắt loading sau khi lưu xong hoặc khi xảy ra lỗi
      commonStore.is_loading_full_screen = false
   }
}

/** lắng nghe message từ cha */
function handleParentMessage(event: MessageEvent) {
   // Chỉ nhận message đến từ iframe cha, bỏ qua message từ nguồn khác
   if (event.source !== window.parent) return

   // Lấy loại sự kiện mà iframe cha gửi xuống
   const type = event.data?.type

   // Khi cha gửi lệnh save-setting thì iframe con sẽ tự gọi hàm lưu
   if (type === 'save-setting') {
      saveSetting()
   }
}

/** gửi message lên cha */
function sendMessageToParent(type: string, data?: any) {
   // Nếu đang chạy độc lập, không nằm trong iframe, thì không cần gửi message
   if (window.parent === window) return

   // Gửi sự kiện lên iframe cha để cha biết trạng thái hiện tại của màn hình con
   window.parent.postMessage(
      {
         from: 'vn.merchant.control',
         type,
         data,
      },
      '*',
   )
}
</script>
