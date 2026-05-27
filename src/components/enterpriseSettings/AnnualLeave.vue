<template>
  <div
    class="py-3 px-2 sm:px-4 bg-white rounded-lg flex text-black items-start gap-2 sm:gap-3"
  >
    <!-- icon -->
    <IconAnnuaLeave class="w-5 h-5 flex-shrink-0"></IconAnnuaLeave>
    <!--  -->
    <div class="flex flex-col gap-2.5 w-full">
      <div class="flex items-start justify-between">
        <h4 class="flex justify-start font-medium">{{ $t('v1.setting.annual_leave') }}</h4>
      </div>
      <div class="grid grid-cols-9 gap-3">
        <div
          class="grid col-span-9 lg:col-span-5 grid-cols-3 gap-5 items-center"
        >
          <div class="col-span-3 lg:col-span-1 flex items-center gap-2 w-full">
            <label class="flex-shrink-0 font-medium w-30 text-start lg:w-auto">
              {{ $t('v1.setting.annual_leave_days') }}
            </label>
            <input
              v-if="annual_leave_year.setting_data"
              v-model="annual_leave_year.setting_data.annual_leave_days"
              class="appearance-none font-semibold p-2 rounded-md outline-none w-full border"
              type="number"
            />
          </div>

          <div class="col-span-3 lg:col-span-2">
            <div class="flex gap-2 items-center w-full">
              <label class="flex-shrink-0 font-medium w-30 text-start lg:w-auto">
                {{ $t('v1.setting.salary') }}
              </label>
              <div class="relative w-full flex justify-start">
                <select
                  class="appearance-none w-full outline-none rounded-lg border-border border px-3 py-2"
                  :class="{
                    'text-slate-500': !annual_leave_year.calculate_holiday_pay,
                  }"
                  v-model="annual_leave_year.calculate_holiday_pay"
                >
                  <option class="text-black" value="undefined" hidden>
                    {{ $t('v1.setting.select_calculation') }}
                  </option>
                  <option class="text-black" value="P1_AND_P2">
                    {{ $t('v1.setting.calculate_p1_p2') }}
                  </option>
                  <option class="text-black" value="ONLY_P1">{{ $t('v1.setting.calculate_p1') }}</option>
                  <option class="text-black" value="ONLY_P2">{{ $t('v1.setting.calculate_p2') }}</option>
                  <option class="text-black" value="NONE">{{ $t('v1.setting.no_calculation') }}</option>
                </select>
                <IconDown
                  class="w-5 h-5 text-down absolute right-3 top-2"
                ></IconDown>
              </div>
            </div>
          </div>
        </div>
        <div class="flex col-span-9 lg:col-span-4 flex-col">
          <label
            v-if="annual_leave_year.setting_data"
            class="flex-shrink-0 flex items-start cursor-pointer gap-2.5"
          >
            <input
              type="checkbox"
              v-model="annual_leave_year.setting_data.auto_clear"
              class="sr-only peer"
            />
            <div
              class="relative w-11 h-6 flex-shrink-0 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"
            ></div>

            <!--  -->
            <p class="w-full font-medium text-wrap text-left">
              {{ $t('v1.setting.annual_leave_auto_clear_note') }}
            </p>
          </label>

          <p class="pl-16 text-left text-muted">
            {{ $t('v1.setting.annual_leave_rollover_note') }}
          </p>
        </div>
      </div>
      <div class="flex flex-col px-1">
        <div class="flex text-muted gap-2 items-center">
          <span class="w-1 h-1 bg-muted rounded-full"></span>
          <p>
            {{ $t('v1.setting.annual_leave_employee_note') }}
          </p>
        </div>
        <div class="flex text-muted gap-2 items-center">
          <span class="w-1 bg-muted h-1 rounded-full"></span>
          <p class="text-start">
            {{ $t('v1.setting.annual_leave_monthly_note') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// * libraries
import { ref } from 'vue'

// * components
import IconDown from '@/components/icons/IconDown.vue'
import IconAnnuaLeave from '@/components/icons/IconAnnuaLeave.vue'
import { AnnualLeaveYear } from '@/service/interface'

const Annua = ref(12)

/** dữ liệu thiết lập nghỉ lễ */
const annual_leave_year = defineModel<AnnualLeaveYear>({ default: {} })
</script>
