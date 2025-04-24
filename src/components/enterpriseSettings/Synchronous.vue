<template>
  <div
    class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconSyn class="w-5 h-5 flex-shrink-0"></IconSyn>
    <!--content  -->
    <div class="flex flex-col items-start flex-1 gap-2 lg:gap-3">
      <div class="flex flex-col">
        <h4 class="flex justify-start text-sm font-medium">
          Đồng bộ Trang - {{ business_data?.short_name || business_data?.name }}
        </h4>
        <p class="text-sm text-muted">
          Kết nối Tổ chức, Chi nhánh với các Kênh bán hàng (Facebook, Zalo, Web
          ...) của {{ business_data?.short_name || business_data?.name }}.
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
          <p
            class="text-start py-2 px-3 border border-border bg-slate-50 shadow-sm rounded-md"
          >
            {{ business_data?.short_name || business_data?.name }}
          </p>
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
          <DropBox :close="() => (is_open_dropbox = false)" class="w-full">
            <template #trigger>
              <button
                class="flex justify-between border-border border px-3 py-2 w-full truncate rounded-md"
                @click="is_open_dropbox = true"
              >
                <p>
                  {{
                    businesses?.[business_data.redirect_to || '']?.name ||
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
                <li>
                  <button
                    class="text-start p-2 w-full truncate rounded-md hover:bg-slate-100"
                    :class="{
                      '!bg-blue-700 text-white': !business_data.redirect_to,
                    }"
                    @click="changeId(business_data?._id, '')"
                  >
                    Không chọn
                  </button>
                </li>
                <li v-for="item in Object.values(businesses)">
                  <button
                    class="text-start p-2 w-full truncate rounded-md hover:bg-slate-100"
                    :class="{
                      '!bg-blue-700 text-white':
                        business_data.redirect_to === item._id,
                    }"
                    @click="changeId(business_data?._id, item._id)"
                  >
                    {{ item?.name }}
                  </button>
                </li>
              </ul>
            </template>
          </DropBox>
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
              Chi nhánh
            </label>
          </div>
          <div class="py-2 flex justify-center"></div>
          <div class="flex col-span-4 flex-col gap-1">
            <label
              class="text-center py-1 rounded bg-slate-200 text-sm font-medium"
              for=""
            >
              Trang
            </label>
          </div>
        </div>
        <!--Nội dung các input  -->
        <div
          v-for="(item, index) in branches"
          :key="index"
          class="grid grid-cols-16 border-slate-100 w-full items-end"
          :class="{
            'border-b , pb-3': index !== branches.length - 1,
            'pt-3': index !== 0,
          }"
        >
          <div class="flex col-span-4 flex-col">
            <p
              class="text-start py-2 px-3 border border-border bg-slate-50 shadow-sm rounded-md"
            >
              {{ item?.name }}
            </p>
          </div>
          <div class="py-2 flex justify-center">
            <IconNexts class="w-5 h-5 shrink-0"></IconNexts>
          </div>
          <div class="flex col-span-4 flex-col gap-1">
            <DropBox :close="() => (is_open_dropbox = false)" class="w-full">
              <template #trigger>
                <button
                  class="flex justify-between border-border border px-3 py-2 w-full truncate rounded-md disabled:bg-slate-100"
									:disabled="!business_data?.redirect_to"
                  @click="is_open_dropbox = true"
                >
                  <p class="truncate">
                    {{
                      businesses_sync?.[item?.redirect_to || '']?.branch_name ||
                      'Không chọn'
                    }}
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
                      @click="changeId(item?._id, '')"
                    >
                      Không chọn
                    </button>
                  </li>
                  <li v-for="branch in businesses_sync">
                    <button
                      class="text-start p-2 w-full truncate rounded-md hover:bg-slate-100"
                      :class="{
                        '!bg-blue-700 text-white':
                          item?.redirect_to === branch.branch_id,
                      }"
                      @click="changeId(item?._id, branch.branch_id)"
                    >
                      {{ branch?.branch_name }}
                    </button>
                  </li>
                </ul>
              </template>
            </DropBox>
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
import { useCommonStore } from '@/stores'

// * libraries
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

/**ICon*/
import IconSyn from '@/components/icons/IconSyn.vue'
import IconNexts from '@/components/icons/IconNexts.vue'
import IconDown from '@/components/icons/IconDown.vue'
import IconWarning from '@/components/icons/IconWarning.vue'
import DropBox from '../DropBox.vue'
import { updateBusiness } from '@/service/api/api'
import { BranchData, BusinessBranchData } from '@/service/interface'

// * store
const commonStore = useCommonStore()
const { businesses, branches, business_data } = storeToRefs(commonStore)

/** ẩn hiện dropbox */
const is_open_dropbox = ref(false)

/** doanh nghiệp đang được đồng bộ tới */
const businesses_sync = computed(() => {
  return businesses.value?.[business_data.value?.redirect_to || '']?.branchs
})

/** thay đổi id doanh nghiệp, chi nhánh */
async function changeId(id?: string, redirect_to?: string) {
  try {
    is_open_dropbox.value = false

    if (id === business_data.value._id) {
      business_data.value.redirect_to = redirect_to

      branches.value.forEach(async (item: BranchData, index: number) => {
        if (item.redirect_to) {
          await updateBusiness({ body: { id: item._id, redirect_to: '' } })
					branches.value[index].redirect_to = ''
				}
      })
    } 

		await updateBusiness({ body: { id, redirect_to } })
		
    if (id !== business_data.value._id) {
			branches.value = branches.value.map((item: BranchData) => {
        if (item._id === id) item.redirect_to = redirect_to
        return item
      })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
