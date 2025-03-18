<template>
    <div class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3">
        <!-- icon -->
        <IconSyn class="w-5 h-5 flex-shrink-0"></IconSyn>
        <!--content  -->
        <div class="flex flex-col items-start flex-1 gap-2 lg:gap-3">
            <div class="flex flex-col">
                <h4 class="flex justify-start text-sm font-medium">Đồng bộ Trang - Bot Bán Hàng</h4>
                <p class="text-sm text-muted">
                    Kết nối Tổ chức, Chi nhánh với các Kênh bán hàng (Facebook, Zalo, Web ...) của Bot Bán Hàng.
                </p>
            </div>
            <!--  -->
            <div class="grid grid-cols-16 w-full items-end">
                <div class="flex col-span-4 flex-col gap-1">
                    <label class="text-center py-1 rounded bg-slate-200 text-sm font-medium " for="">Tổ chức</label>
                    <input type="text" v-model="sysnch_item.organization"
                        class="text-sm outline-none py-2 px-3 mr-2 border border-border bg-slate-50 shadow-sm rounded-md">
                </div>
                <div class="py-2 flex justify-center ">
                    <IconNexts class="w-5 h-5 shrink-0"></IconNexts>
                </div>
                <div class="flex col-span-4 flex-col gap-1">
                    <label class="text-center py-1 rounded bg-slate-200 text-sm font-medium " for="">Tổ chức</label>
                    <div class="relative w-full flex justify-start">
                        <select :class="{ 'text-red-500': !sysnch_item.active }"
                            class="appearance-none w-full truncate outline-none rounded-md shadow-sm border-border border px-3 py-2">
                            <option class="" value="Tổ chức Bot Bán Hàng (12390213)">
                                Tổ chức Bot Bán Hàng (12390213)
                            </option>

                        </select>
                        <IconDown class="w-5 h-5 text-down absolute right-3 top-2"></IconDown>
                    </div>
                </div>
                <!--  -->
                <div class="flex col-span-7 pl-3 items-center gap-1">
                    <div class="py-1.5">
                        <IconWarning class="w-5 h-5 shrink-0"></IconWarning>
                    </div>
                    <p class="text-xs text-left truncate text-red-500">
                        Bạn không còn là Quản trị viên của Tổ chức Bot Bán Hàng, vui lòng kiểm tra lại
                    </p>

                </div>


            </div>
            <!--  -->
            <div class="flex flex-col gap-1 w-full">
                <!-- Tiêu đề -->
                <div class="grid grid-cols-16 w-full items-end">
                    <div class="flex col-span-4 flex-col gap-1">
                        <label class="text-center py-1 rounded bg-slate-200 text-sm font-medium " for="">Chi
                            nhánh</label>

                    </div>
                    <div class="py-2 flex justify-center ">

                    </div>
                    <div class="flex col-span-4 flex-col gap-1">
                        <label class="text-center py-1 rounded bg-slate-200 text-sm font-medium " for="">Trang</label>

                    </div>
                </div>
                <!--Nội dung các input  -->
                <div v-for="(item, index) in sysnch_item.list_branch" :key="index"
                    class="grid grid-cols-16 border-slate-100 w-full items-end" :class="{ 'border-b , pb-3': index !== sysnch_item.list_branch.length - 1,  'pt-3': index !== 0 
                    }">
                    
                        <div class="flex col-span-4 flex-col ">
                            <input type="text" v-model="item.name_branch"
                                class="text-sm outline-none py-2 px-3 border border-border bg-slate-50 shadow-sm rounded-md">
                        </div>
                        <div class="py-2 flex justify-center ">
                            <IconNexts class="w-5 h-5 shrink-0"></IconNexts>
                        </div>
                        <div class="flex col-span-4 flex-col gap-1">
                            <div class="relative w-full flex justify-start">
                                <select v-model="item.page_branch" :class="{ 'text-red-500': !item.active }"
                                    class="appearance-none w-full truncate outline-none rounded-md shadow-sm border-border border px-3 py-2">
                                    <option class="" value="Bot Bán Hàng (123123123)">
                                        Bot Bán Hàng (123123123)
                                    </option>

                                </select>
                                <IconDown class="w-5 h-5 text-down absolute right-3 top-2"></IconDown>
                            </div>
                        </div>
                        <!--  -->
                        <div v-if="!item.active" class="flex col-span-7 pl-3 items-center gap-1">
                            <div class="py-1.5">
                                <IconWarning class="w-5 h-5 shrink-0"></IconWarning>
                            </div>
                            <p class="text-xs text-left truncate text-red-500">
                                Bạn không còn quản lý Trang này, vui lòng kết nối lại Trang bên Bot Bán Hàng.
                            </p>
                            <div class="py-1.5">
                                <IconNexts class="w-5 h-5 shrink-0"></IconNexts>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <!--  -->
        </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores'

// * libraries
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

/**ICon*/
import IconSyn from '@/components/icons/IconSyn.vue'
import IconNexts from '@/components/icons/IconNexts.vue'
import IconDown from '@/components/icons/IconDown.vue'
import IconWarning from '@/components/icons/IconWarning.vue'


// * store
const commonStore = useCommonStore()
const { background, employees_user_ids, user } = storeToRefs(commonStore)

const sysnch_item = ref({

    organization: 'Bot Bán Hàng',
    organizations: 'Tổ chức Bot Bán Hàng (12390213)',
    active: false,
    list_branch: [{
        name_branch: 'BU Hà Nội',
        page_branch: 'Bot Bán Hàng (123123123)',
        active: true,
    },
    {
        name_branch: 'BU Hà Nội',
        page_branch: 'Bot Bán Hàng (123123123)',
        active: false,
    },
    {
        name_branch: 'BU Hà Nội',
        page_branch: 'Bot Bán Hàng (123123123)',
        active: true,
    }]
})

</script>