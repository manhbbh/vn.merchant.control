<template>
  <div
    class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconTime class="w-5 h-5 flex-shrink-0"></IconTime>
    <!--content  -->
    <div
      class="flex flex-col gap-2 w-full overflow-hidden"
      v-if="working_time.setting_data"
    >
      <!-- tiêu đề -->
      <div class="flex justify-between">
        <div class="flex-col">
          <h4
            class="flex text-customDark h-5 mb-2.5 justify-start text-sm font-medium"
          >
            Thời gian làm việc chung
          </h4>
          <p
            class="flex justify-start text-start text-sm text-gray-500 lg:truncate"
          >
            Khi tạo thêm Chi nhánh thì mặc định kế thừa cấu hình này. Ngoài ra,
            có thể thiết lập tùy biến theo từng Chi nhánh.
          </p>
        </div>
        <button
          class="hidden lg:block font-medium text-slate-500 px-3"
          @click="reset()"
        >
          <span v-if="!branch_data?._id">Khôi phục mặc định</span>
          <span v-else>Khôi phục theo Doanh nghiệp</span>
        </button>
      </div>
      <!-- Múi giờ -->
      <div
        class="flex flex-col items-start justify-start gap-2 mb-2 sm:flex-row"
      >
        <div class="flex">
          <IconWorld class="h-5 w-5"></IconWorld>
          <h4 class="flex sm:hidden h-5 pl-2 justify-start text-sm font-medium">
            Múi giờ
          </h4>
        </div>
        <!--  -->
        <div
          class="flex flex-col flex-1 sm:border-b bottom-1 border-slate-200 items-center sm:justify-between sm:flex-row"
        >
          <div class="flex-col mb-3">
            <h4 class="sm:flex hidden h-5 justify-start text-sm font-medium">
              Múi giờ
            </h4>
            <p
              class="flex h-5 line-clamp-1 justify-start text-sm text-gray-500"
            >
              Thiết lập múi giờ theo khu vực kinh doanh, giúp báo cáo thống kê
              chính xác.
            </p>
          </div>
          <!-- select -->
          <div class="relative w-full flex justify-start sm:w-85">
            <select
              class="appearance-none h-9 text-slate-600 outline-none w-full sm:w-85 text-sm rounded-lg border border-slate-300 px-2 sm:px-3 py-1.5"
              v-model="working_time.setting_data.time_zone"
            >
              <template v-for="item in TIME_ZONES">
                <option :value="item">{{ item }}</option>
              </template>
            </select>
            <IconArrow
              class="w-4 h-4 text-slate-600 absolute right-2 top-2.5"
            ></IconArrow>
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
              Thời gian làm việc trong ngày
            </h4>
            <p class="hidden h-5 justify-start text-sm text-gray-500 sm:flex">
              Thiết lập thời gian làm việc giúp thống kê, tính tiền lương P1, P2
              chính xác.
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
        v-for="(day, index) in working_time?.setting_data
          ?.organization_working_time?.working_time"
        :key="index"
        class="flex flex-col text-sm border-b border-slate-200 items-center py-3 md:justify-between text-customDark md:flex-row last:border-none"
      >
        <div class="h-9 flex sm:pb-0 pb-4 w-full items-center justify-between">
          <div class="sm: flex">
            <div class="sm:w-32 flex-none py-2 pr-3 font-medium sm:pr-0">
              {{ day.title }}
            </div>
            <!-- select -->
            <Toggle v-model="day.active" class="sm:hidden" />
          </div>
        </div>
        <!--  -->
        <div
          class="h-9 flex sm:gap-5 w-full justify-between items-center sm:justify-end"
        >
          <!-- từ -->
          <p v-if="day.active" class="text-center md:px-4">từ</p>

          <div v-if="day.active && day.checkin">
            <select
              :value="`${day?.checkin?.hour
                ?.toString()
                .padStart(2, '0')}:${day?.checkin?.minute
                ?.toString()
                .padStart(2, '0')}`"
              class="mr-0 flex h-9 w-30 rounded-md border px-3 py-2"
              @change="($event:Event)=>{
                const TARGET = $event.target as HTMLSelectElement
                if(!day.checkin) return
                day.checkin.hour = parseInt(TARGET.value.split(':')[0]);
                day.checkin.minute = parseInt(TARGET.value.split(':')[1]);
              }"
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
          <p v-if="day.active" class="text-center md:px-4">đến</p>

          <div v-if="day.active && day.checkout">
            <select
              :value="`${day?.checkout?.hour
                ?.toString()
                .padStart(2, '0')}:${day?.checkout?.minute
                ?.toString()
                .padStart(2, '0')}`"
              class="mr-0 flex h-9 w-30 rounded-md border px-3 py-2"
              @change="($event:Event)=>{
                const TARGET = $event.target as HTMLSelectElement
                if(!day.checkout) return
                day.checkout.hour = parseInt(TARGET.value.split(':')[0]);
                day.checkout.minute = parseInt(TARGET.value.split(':')[1]);
              }"
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
          <Toggle class="hidden sm:flex" v-model="day.active" />
        </div>
        <!--  -->
      </div>

      <button
        class="min-w-60 lg:hidden text-white text-sm font-medium bg-slate-500 p-2 border rounded-md"
        @click="reset()"
      >
        <span v-if="!branch_data?._id">Khôi phục mặc định</span>
        <span v-else>Khôi phục theo Doanh nghiệp</span>
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
import { PropType } from 'vue'
import { storeToRefs } from 'pinia'

// * component
import Toggle from '@/components/Toggle.vue'

// * icons
import IconTime from '@/components/icons/IconTime.vue'
import IconWorld from '@/components/icons/IconWorld.vue'
import IconPapers from '@/components/icons/IconPapers.vue'
import IconArrow from '@/components/icons/IconArrow.vue'

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

/** dữ liệu thiết lập thời gian làm việc */
const working_time = defineModel<WorkingTimeSetting>({
  default: {},
})

/** khôi phục dữ liệu */
function reset() {
  confirm(
    'warning',
    'Xác nhận khôi phục mặc định?',
    '',
    (is_cancel: boolean) => {
      if (is_cancel) return
      working_time.value.setting_data = copy(props.setting_working_time)
    }
  )
}
</script>
