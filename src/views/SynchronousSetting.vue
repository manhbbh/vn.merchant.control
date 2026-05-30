<template>
  <div class="min-h-screen bg-gray-100 p-2 text-black">
    <main v-if="is_authenticated" class="mx-auto flex h-[calc(100dvh-16px)] max-w-7xl flex-col gap-2">
      <section class="flex-1 overflow-y-auto">
        <Synchronous ref="synchrononus_ref" />
      </section>

      <footer class="flex flex-shrink-0 justify-end rounded-lg bg-white px-3 py-2">
        <button
          class="h-9 w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white sm:w-auto"
          @click="saveSetting()"
        >
          {{ $t('v1.common.save_setting') }}
        </button>
      </footer>
    </main>

    <Template401 v-else />
  </div>
</template>

<script setup lang="ts">
import { useGetData } from '@/hook.ts'
import { useCommonStore } from '@/stores'
import { Toast } from '@/service/helper/toast'
import { queryString } from '@/service/helper/queryString'
import { getBusiness } from '@/service/api/api'

import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import Template401 from '@/components/Template401.vue'
import Synchronous from '@/components/enterpriseSettings/Synchronous.vue'

import type { BusinessBranchData, CompanyData } from '@/service/interface'

const commonStore = useCommonStore()
const { businesses } = storeToRefs(commonStore)
const { getBusinessInfos } = useGetData()
const router = useRouter()
const { t } = useI18n()
const $toast = new Toast()

const is_authenticated = ref(false)
const synchrononus_ref = ref<typeof Synchronous | null>(null)

onMounted(async () => {
  getDataFromUrl()

  if (!is_authenticated.value) return

  commonStore.is_loading_full_screen = true

  try {
    await Promise.all([getBusinessInfos(), getBusinesses()])
  } finally {
    commonStore.is_loading_full_screen = false
  }
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
    $toast.error(error)
  }
}

async function saveSetting() {
  try {
    commonStore.is_loading_full_screen = true
    await synchrononus_ref.value?.save()
    $toast.success(t('v1.common.save_success'))
  } catch (error) {
    $toast.error(error)
  } finally {
    commonStore.is_loading_full_screen = false
  }
}
</script>
