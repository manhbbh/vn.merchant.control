<template>
  <div
    class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconPeriod class="w-5 h-5 flex-shrink-0"></IconPeriod>
    <!--content  -->
    <div class="flex-col flex-1">
      <div class="flex flex-col items-start mb-3">
        <h4 class="flex justify-start text-sm font-medium">Kỳ kinh doanh</h4>
        <p class="text-sm text-left text-muted">
          <span class="font-medium">Tháng:</span> Ngày bắt đầu và kết thúc để
          tính Lương P1, P2. <span class="font-medium">Năm:</span> Ngày bắt đầu
          và kết thúc 1 năm kinh doanh để hiển thị dữ liệu trong báo cáo năm.
        </p>
      </div>
      <!-- phần các ô input  -->
      <div class="flex flex-col gap-3 sm:flex-row">
        <div
          class="flex flex-col gap-1 text-sm items-start w-80 overflow-hidden"
          v-if="monthly_business_period.setting_data"
        >
          <h3 class="text-sm font-medium">
            Tháng<span class="text-error"> *</span>
          </h3>
          <div
            class="flex items-center border border-gray-300 h-9 py-2 rounded-md"
          >
            <p class="text-muted w-28">Ngày bắt đầu</p>
            <div
              class="border-l w-12 border-gray-300 flex items-center justify-center h-9"
            >
              <select
                v-model="monthly_business_period.setting_data.start"
                class="outline-none appearance-none text-center"
              >
                <option v-for="i in 28" :value="i" class="px-2">{{ i }}</option>
              </select>
            </div>
          </div>
          <div class="flex">
            <div
              class="flex items-center border border-gray-300 rounded-md"
            >
              <p class="text-muted w-28">Ngày kết thúc</p>
              <div
                class="border-l w-12 rounded-e-md border-gray-300 flex items-center justify-center py-2"
                :class="{
                  'bg-slate-100':
                    monthly_business_period.setting_data.end === 32,
                }"
              >
                <select
                  v-model="monthly_business_period.setting_data.end"
                  class="outline-none appearance-none text-center bg-transparent"
                >
                  <option v-for="i in 28" :value="i" class="px-2">
                    {{ i }}
                  </option>
                </select>
              </div>
            </div>
            <Toggle
              :title="'Cuối tháng'"
              :model-value="monthly_business_period.setting_data.end === 32"
              @update:model-value="
                (modelValue) => {
                  // nếu không có data thì thôi
                  if (!monthly_business_period.setting_data) return

                  if (modelValue) monthly_business_period.setting_data.end = 32
                  else monthly_business_period.setting_data.end = 28
                }
              "
            />
          </div>
        </div>
        <div class="flex flex-col gap-1 items-start w-80">
          <h3 class="text-sm font-medium">
            Năm<span class="text-error"> *</span>
          </h3>
          <!--  -->
          <div
            class="flex items-center border text-sm border-gray-300 h-9 py-2 rounded-md"
          >
            <p class="text-muted w-40">Ngày/Tháng bắt đầu</p>
            <div
              class="border-l w-14 border-gray-300 flex items-center justify-center h-9"
            >
              <CustomVuePicker
                class=""
                v-model="start_date_year"
                :format="'dd/MM'"
                :input_class="'!border-transparent !h-max !p-0 text-center'"
                :handle-date="
                  () => {
                    if (!year_business_period.setting_data) return
                    year_business_period.setting_data.start = {
                      day: start_date_year?.getDate(),
                      month:
                        start_date_year?.getMonth() &&
                        start_date_year?.getMonth() + 1,
                    }
                  }
                "
                :hidden_icon="true"
              />
            </div>
          </div>
          <!--  -->
          <div
            class="flex items-center border text-sm border-gray-300 h-9 py-2 rounded-md"
          >
            <p class="text-muted w-40">Ngày/Tháng kết thúc</p>
            <div
              class="border-l w-14 border-gray-300 flex items-center justify-center h-9"
            >
              <CustomVuePicker
                class=""
                v-model="end_date_year"
                :format="'dd/MM'"
                :input_class="'!border-transparent !h-max !p-0 text-center'"
                :handle-date="
                  () => {
                    if (!year_business_period.setting_data) return
                    year_business_period.setting_data.end = {
                      day: end_date_year?.getDate(),
                      month:
                        end_date_year?.getMonth() &&
                        end_date_year?.getMonth() + 1,
                    }
                  }
                "
                :hidden_icon="true"
              />
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
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

// * component
import CustomVuePicker from '@/components/CustomVuePicker.vue'

/**ICon*/
import IconPeriod from '@/components/icons/IconPeriod.vue'
import { endOfYear, startOfYear } from 'date-fns'
import Toggle from '../Toggle.vue'

// * store
const commonStore = useCommonStore()
const { monthly_business_period, year_business_period } =
  storeToRefs(commonStore)

onMounted(() => {
  start_date_year.value = getStartDateYear()
  end_date_year.value = getEndDateYear()
})

const stop = watch(
  () => year_business_period.value,
  (newValue) => {
    start_date_year.value = getStartDateYear()
    end_date_year.value = getEndDateYear()
    stop() // Dừng watcher sau lần đầu tiên
  }
)
/** ngày bắt đầu chu kỳ kinh doanh của năm */
const start_date_year = ref<Date>()

/** ngày kết thúc chu kỳ kinh doanh của năm */
const end_date_year = ref<Date>()

/** lấy ngày bắt đầu chu kỳ kinh doanh của năm */
function getStartDateYear() {
  /** ngày hôm nay */
  const TODAY = new Date()

  /** ngày bắt đầu */
  const START_DATE = year_business_period.value?.setting_data?.start?.day

  /** tháng bắt đầu */
  const START_MONTH = year_business_period.value?.setting_data?.start?.month

  // nếu không có thì trả về undefined
  if (!START_DATE || !START_MONTH) return startOfYear(TODAY)

  // nếu có thì trả về ngày bắt đầu
  return new Date(TODAY.getFullYear(), START_MONTH - 1, START_DATE)
}

/** lấy ngày kết thúc chu kỳ kinh doanh của năm */
function getEndDateYear() {
  /** ngày hôm nay */
  const TODAY = new Date()

  /** ngày kết thúc */
  const END_DATE = year_business_period.value?.setting_data?.end?.day

  /** tháng kết thúc */
  const END_MONTH = year_business_period.value?.setting_data?.end?.month

  // nếu không có thì trả về undefined
  if (!END_DATE || !END_MONTH) return endOfYear(TODAY)

  // nếu có thì trả về ngày kết thúc
  return new Date(TODAY.getFullYear(), END_MONTH - 1, END_DATE)
}
</script>
