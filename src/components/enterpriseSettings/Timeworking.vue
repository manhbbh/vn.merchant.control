<template>
   <div class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3">
      <!-- icon -->
      <IconTime class="w-5 h-5 flex-shrink-0 hidden md:block"></IconTime>
      <!--content  -->
      <div
         class="flex flex-col gap-2 w-full overflow-hidden"
         v-if="working_time.setting_data"
      >
         <!-- tiêu đề -->
         <div class="flex justify-between">
            <div class="flex-col">
               <h4 class="flex text-customDark h-5 mb-2.5 justify-start text-sm font-medium">
                  <IconTime class="w-5 h-5 flex-shrink-0 block md:hidden mr-2"></IconTime>

                  {{ $t('v1.setting.working_time_general') }}
               </h4>
               <p class="flex justify-start text-start text-sm text-gray-500 lg:truncate">
                  {{ $t('v1.setting.working_time_general_description') }}
               </p>
            </div>
            <button
               class="hidden lg:block font-medium text-slate-500 px-3"
               @click="reset()"
            >
               <span v-if="!branch_data?._id">{{ $t('v1.common.restore_default') }}</span>
               <span v-else>{{ $t('v1.common.restore_by_business') }}</span>
            </button>
         </div>
         <!-- Múi giờ -->
         <div class="flex flex-col items-start justify-start gap-2 mb-2 sm:flex-row max-md:mt-2">
            <div class="flex">
               <IconWorld class="h-5 w-5"></IconWorld>
               <h4 class="flex sm:hidden h-5 pl-2 justify-start text-sm font-medium">
                  {{ $t('v1.setting.time_zone') }}
               </h4>
            </div>
            <!--  -->
            <div
               class="flex flex-col flex-1 sm:border-b bottom-1 border-slate-200 items-center sm:justify-between sm:flex-row"
            >
               <div class="flex-col mb-3">
                  <h4 class="sm:flex hidden h-5 justify-start text-sm font-medium">
                     {{ $t('v1.setting.time_zone') }}
                  </h4>
                  <p class="flex h-5 line-clamp-1 justify-start text-sm text-gray-500">
                     {{ $t('v1.setting.time_zone_description') }}
                  </p>
               </div>
               <!-- select -->
               <div class="relative w-full flex justify-start sm:w-85">
                  <CustomSelectV3
                     :options="timeZoneOptions"
                     :default_value="{ value: working_time.setting_data.time_zone }"
                     :get-value="(item: TimeZoneOption) => item?.value"
                     :get-label="(item: TimeZoneOption) => item?.label"
                     :is_search="true"
                     :is_clearable="false"
                     :placeholder="$t('v1.setting.time_zone')"
                     :update="(item: TimeZoneOption) => {
                        updateTimeZone(item)
                     }"
                     trigger_class="h-9 !border-slate-300 text-slate-600"
                     class="w-full sm:w-85"
                  />
               </div>
               <!--  -->
            </div>
         </div>
         <!-- Thời gian làm việc -->
         <div class="h-10 flex items-start gap-2 pt-2">
            <IconPapers class="h-5 w-5"></IconPapers>
            <!--  -->
            <div class="flex max-w-full flex-1 items-center justify-between">
               <div class="flex-col mb-3">
                  <h4 class="flex h-5 justify-start text-sm font-medium">
                     {{ $t('v1.setting.daily_working_time') }}
                  </h4>
                  <p class="hidden h-5 justify-start text-sm text-gray-500 sm:flex">
                     {{ $t('v1.setting.daily_working_time_description') }}
                  </p>
               </div>
               <!-- select -->
               <Toggle
                  v-if="working_time.setting_data.organization_working_time"
                  v-model="working_time.setting_data.organization_working_time.active"
               />
            </div>
         </div>
         <!--4  -->
         <!-- Vòng lặp qua mảng -->
         <div
            v-for="(day, index) in working_time?.setting_data?.organization_working_time?.working_time"
            :key="index"
            class="flex flex-col text-sm border-b border-slate-200 items-center py-3 md:justify-between text-customDark md:flex-row last:border-none"
         >
            <div class="h-9 flex sm:pb-0 pb-4 w-full items-center justify-between">
               <div class="sm: flex">
                  <div class="sm:w-32 flex-none py-2 pr-3 font-medium sm:pr-0">
                     {{ translateDayTitle(day.title) }}
                  </div>
                  <!-- select -->
                  <Toggle
                     v-model="day.active"
                     class="sm:hidden"
                  />
               </div>
            </div>
            <!--  -->
            <div class="h-9 flex sm:gap-5 w-full justify-between items-center sm:justify-end">
               <!-- từ -->
               <p
                  v-if="day.active"
                  class="text-center md:px-4"
               >
                  {{ $t('v1.setting.from') }}
               </p>

               <div v-if="day.active && day.checkin">
                  <select
                     :value="`${day?.checkin?.hour?.toString().padStart(2, '0')}:${day?.checkin?.minute
                        ?.toString()
                        .padStart(2, '0')}`"
                     class="mr-0 flex h-9 w-30 rounded-md border px-3 py-2"
                     @change="
                        ($event: Event) => {
                           const TARGET = $event.target as HTMLSelectElement
                           if (!day.checkin) return
                           day.checkin.hour = parseInt(TARGET.value.split(':')[0])
                           day.checkin.minute = parseInt(TARGET.value.split(':')[1])
                        }
                     "
                  >
                     <template v-for="i in 24">
                        <option :value="`${i?.toString().padStart(2, '0')}:00`">
                           {{ `${i?.toString().padStart(2, '0')}:00` }}
                        </option>
                        <option
                           v-if="i < 24"
                           :value="`${i?.toString().padStart(2, '0')}:30`"
                        >
                           {{ `${i?.toString().padStart(2, '0')}:30` }}
                        </option>
                     </template>
                     <!-- Add more options as needed -->
                  </select>
               </div>
               <!-- đến -->
               <p
                  v-if="day.active"
                  class="text-center md:px-4"
               >
                  {{ $t('v1.setting.to') }}
               </p>

               <div v-if="day.active && day.checkout">
                  <select
                     :value="`${day?.checkout?.hour?.toString().padStart(2, '0')}:${day?.checkout?.minute
                        ?.toString()
                        .padStart(2, '0')}`"
                     class="mr-0 flex h-9 w-30 rounded-md border px-3 py-2"
                     @change="
                        ($event: Event) => {
                           const TARGET = $event.target as HTMLSelectElement
                           if (!day.checkout) return
                           day.checkout.hour = parseInt(TARGET.value.split(':')[0])
                           day.checkout.minute = parseInt(TARGET.value.split(':')[1])
                        }
                     "
                  >
                     <template v-for="i in 24">
                        <option :value="`${i?.toString().padStart(2, '0')}:00`">
                           {{ `${i?.toString().padStart(2, '0')}:00` }}
                        </option>
                        <option
                           v-if="i < 24"
                           :value="`${i?.toString().padStart(2, '0')}:30`"
                        >
                           {{ `${i?.toString().padStart(2, '0')}:30` }}
                        </option>
                     </template>
                     <!-- Add more options as needed -->
                  </select>
               </div>
               <!--  -->

               <!-- select -->
               <Toggle
                  class="hidden sm:flex"
                  v-model="day.active"
               />
            </div>
            <!--  -->
         </div>

         <button
            class="min-w-60 lg:hidden text-white text-sm font-medium bg-slate-500 p-2 border rounded-md"
            @click="reset()"
         >
            <span v-if="!branch_data?._id">{{ $t('v1.common.restore_default') }}</span>
            <span v-else>{{ $t('v1.common.restore_by_business') }}</span>
         </button>
      </div>
      <!--  -->
   </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores'
import { copy } from '@/service/helper/format'
import { TIME_ZONES } from '@/service/constant'
import { confirm } from '@/service/helper/alert'

// * library
import { computed, PropType } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

// * component
import Toggle from '@/components/Toggle.vue'
import CustomSelectV3 from '@/components/CustomSelectV3.vue'

// * icons
import IconTime from '@/components/icons/IconTime.vue'
import IconWorld from '@/components/icons/IconWorld.vue'
import IconPapers from '@/components/icons/IconPapers.vue'

// * interface
import { WorkingTimeSetting, WorkingTimeSettingData } from '@/service/interface'

// * props
const props = defineProps({
   setting_working_time: {
      type: Object as PropType<WorkingTimeSettingData>,
      required: true,
   },
})

// * store
const { branch_data } = storeToRefs(useCommonStore())
const { t } = useI18n()

/** dữ liệu thiết lập thời gian làm việc */
const working_time = defineModel<WorkingTimeSetting>({
   default: {},
})

type TimeZoneOption = {
   label: string
   value: string
}

const timeZoneOptions = computed<TimeZoneOption[]>(() =>
   TIME_ZONES.map(item => ({
      label: item,
      value: item,
   })),
)

/** khôi phục dữ liệu */
function updateTimeZone(item: TimeZoneOption) {
   if (!working_time.value.setting_data) return
   working_time.value.setting_data.time_zone = item.value
}

function reset() {
   confirm('warning', t('v1.confirm.restore_default'), '', (is_cancel: boolean) => {
      if (is_cancel) return
      working_time.value.setting_data = copy(props.setting_working_time)
   })
}

function translateDayTitle(title?: string) {
   const keyByTitle: Record<string, string> = {
      'Thứ hai': 'v1.day.monday',
      'Thứ ba': 'v1.day.tuesday',
      'Thứ tư': 'v1.day.wednesday',
      'Thứ năm': 'v1.day.thursday',
      'Thứ sáu': 'v1.day.friday',
      'Thứ bảy': 'v1.day.saturday',
      'Chủ nhật': 'v1.day.sunday',
   }

   return title && keyByTitle[title] ? t(keyByTitle[title]) : title
}
</script>
