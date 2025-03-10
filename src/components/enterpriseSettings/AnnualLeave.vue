<template>
    <div class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3">
        <!-- icon -->
        <IconAnnuaLeave class="w-5 h-5 flex-shrink-0"></IconAnnuaLeave>
        <!--  -->
        <div class="flex flex-col gap-2.5 w-full">
            <div class="flex items-start justify-between">
                <h4 class="flex justify-start text-sm font-medium">Phép năm</h4>
            </div>
            <div class="grid grid-cols-2 gap-5">
                <div class="grid grid-cols-3 gap-5 items-center">
    
                    <div class="flex items-center  gap-4 w-full">
                        <label class="flex-shrink-0 font-medium" for="">
                            Ngày phép năm </label>
                        <input v-model="Annua"
                            class="text-sm font-semibold py-2 rounded-md outline-none px-3 w-full border border-border shadow-sm"
                            type="text" placeholder="" name="" id="" />
                    </div>
    
                    <div class="col-span-2">
                        <div class="flex gap-1 items-center w-full">
                            <label class="flex-shrink-0 text-sm font-medium" for="">
                                Tính lương
                            </label>
                            <div class="relative w-full flex justify-start">
                                <select
                                    class="appearance-none w-full outline-none rounded-lg border-border border text-sm px-3 py-2">
                                    <option value="">Tính cả P1 và P2</option>
                                    <option value="p1">Tính P1</option>
                                    <option value="p1">Tính P2</option>
                                </select>
                                <IconDown class="w-5 h-5 text-down absolute right-3 top-2 "></IconDown>
                            </div>
                        </div>
                    </div>
    
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2 ">
                        <label class="flex-shrink-0 inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer" checked />
                            <div
                                class="relative w-11 h-6 flex-shrink-0 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600">
                            </div>
                        </label>
                        <!--  -->
                        <p class="text-sm font-medium">Nếu còn phép thì ngày 30/12 sẽ tự động xóa hết phép.</p>
                    </div>
    
    
                    <p class="text-sm pl-13 text-left text-muted">Mặc định, nếu hết năm mà còn ngày phép thì cộng dồn sang
                        Quý 1 năm sau.
                    </p>

    
                </div>
    
            </div>
            <div class="flex flex-col px-1">
                <div class="flex text-sm text-muted gap-2 items-center">
                    <span class="w-1 h-1 bg-muted rounded-full"></span>
                    <p>Ngày phép chỉ áp dụng với nhân viên có trạng thái Làm việc chính thức.</p>
                </div>
                <div class="flex text-sm text-muted gap-2 items-center">
                    <span class="w-1 bg-muted  h-1 rounded-full"></span>
                    <p>Ngày phép sẽ được cộng dồn hàng tháng. Mặc định mỗi 1 tháng sẽ được +1 ngày phép.</p>
                </div>
    
            </div>
    
        </div>
    </div>
</template>

<script setup lang="ts">
import IconAnnuaLeave from '@/components/icons/IconAnnuaLeave.vue';
import { ref } from 'vue';

const Annua = ref(12)
</script>