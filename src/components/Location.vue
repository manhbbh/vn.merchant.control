<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-2 gap-x-3">
    <div class="flex flex-col gap-2 lg:col-span-4">
      <p class="font-medium">Địa chỉ <span class="text-red-500">*</span></p>
      <CustomSelectV3
        :getShow="() => location.address"
        :getLabel="(item: Addresses) => item?.address_name || ''"
        :is_update="is_update"
        :is_search="is_update"
        :placeholder="'Địa chỉ'"
        :options="addresses"
        :content_class="'z-[1000]'"
        :onSearch="(address:string) =>searchAddress(address)"
        :onClear="
          () => {
            location.address = ''
          }
        "
        :update="(item: Addresses) => {
          chooseLocation(item, 'address')
        }"
        :name="'address_id'"
      >
        <template
          v-for="(item, index) in addresses"
          #[item.address_id]
        >
          <span class="block truncate">
            {{ item?.address_name }}
          </span>
        </template>
      </CustomSelectV3>
    </div>
    <div class="grid grid-cols-12 gap-y-2 gap-x-3 lg:col-span-8">
      <div class="flex flex-col gap-2 col-span-4">
        <p class="font-medium">
          Tỉnh, Thành phố <span class="text-red-500">*</span>
        </p>
        <CustomSelectV3
          v-model:search="search_provice"
          :default_value="location?.locations?.province"
          :getShow="() => getProvinceName()"
          :get-label="(item: ProvinceData) => item?.name"
          :get-value="(item: ProvinceData) => item?.id || item?.code"
          :is_update="is_update"
          :is_search="is_update"
          :placeholder="'Tỉnh, thành phố'"
          :options="provinces"
          :filter="filterProvine"
          :content_class="'z-[1000]'"
          :onClear="() => removeLocations('province')"
          :update="(item: ProvinceData) => {
            chooseLocation(item, 'province')
          }"
        >
        </CustomSelectV3>
      </div>
      <div class="flex flex-col gap-2 col-span-4">
        <p class="font-medium">
          Quận, Huyện <span class="text-red-500">*</span>
        </p>
        <CustomSelectV3
          v-model:search="search_district"
          :getShow="() => getDistrictName()"
          :is_update="is_update"
          :is_search="is_update"
          :placeholder="'Quận, Huyện'"
          :options="districts"
          :get-label="(item: DistrictData) => item?.name_with_type"
          :get-value="(item: DistrictData) => item?.id || item?.code"
          :filter="filterDistrict"
          :content_class="'z-[1000]'"
          :onClear="() => removeLocations('district')"
          :update="(item: DistrictData) => {
            chooseLocation(item, 'district')
          }"
          :default_value="location?.locations?.district"
        >
        </CustomSelectV3>
      </div>
      <div class="flex flex-col gap-2 col-span-4">
        <p class="font-medium">
          Phường, xã <span class="text-red-500">*</span>
        </p>
        <CustomSelectV3
          v-model:search="search_ward"
          :getShow="() => getWardName()"
          :is_update="is_update"
          :is_search="is_update"
          :placeholder="'Phường, xã'"
          :options="wards"
          :get-label="(item: WardData) => item?.name_with_type"
          :get-value="(item: WardData) => item?.id || item?.code"
          :filter="filterWard"
          :content_class="'z-[1000]'"
          :onClear="() => removeLocations('ward')"
          :update="(item: WardData) => {
            chooseLocation(item, 'ward')
          }"
          :default_value="location?.locations?.ward"
        >
        </CustomSelectV3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toast } from '@/service/helper/toast'
import { PROVINCE } from '@/service/constant'
import { nonAccentVn } from '@/service/helper/format'
import { useLocation } from '@/service/hook/location'

// * libraries
import { onMounted, ref } from 'vue'

// * components
import CustomSelectV3 from '@/components/CustomSelectV3.vue'

// * interfaces
import {
  Addresses,
  DistrictData,
  LocationDetail,
  ProvinceData,
  WardData,
} from '@/service/interface'

// * toast
const $toast = new Toast()

const location = ref<{
  address: string
  locations: LocationDetail
}>({
  address: '',
  locations: {},
})

// * hooks
const {
  search_provice,
  search_district,
  search_ward,
  chooseAddress,
  chooseDistrict,
  chooseProvince,
  chooseWard,
  searchAddressHook,
  addresses,
  provinces,
  districts,
  wards,
  getProvinceName,
  getDistrictName,
  getWardName,
  removeLocation,
} = useLocation(location)

//* Props
const $props = defineProps({
  /** cho phép cập nhật hay không */
  is_update: {
    type: Boolean,
    required: false,
    default: true,
  },
})

onMounted(() => {
  /** Lấy danh sách tỉnh thành */
  provinces.value = PROVINCE
})

/** Tìm kiếm địa chỉ */
async function searchAddress(address: string) {
  location.value.address = address
  if (address) searchAddressHook(address)
}

/** hàm tìm kiếu tỉnh, thành phố */
function filterProvine(item: ProvinceData) {
  const PROVINCE_NAME = nonAccentVn(item?.name || '')
  return PROVINCE_NAME?.includes(nonAccentVn(search_provice.value || ''))
}

/** hàm tìm kiếm quận huyện */
function filterDistrict(item: DistrictData) {
  const DISTRICT_NAME = nonAccentVn(item?.name_with_type || '')
  return DISTRICT_NAME?.includes(nonAccentVn(search_district.value || ''))
}

/** hàm tìm kiếm xã phường */
function filterWard(item: WardData) {
  const WARD_NAME = nonAccentVn(item?.name_with_type || '')
  return WARD_NAME?.includes(nonAccentVn(search_ward.value || ''))
}

/** chọn địa điểm */
async function chooseLocation(
  item: Addresses | ProvinceData | DistrictData | WardData,
  type: 'address' | 'province' | 'district' | 'ward'
) {
  try {
    if (type === 'address') await chooseAddress(item as Addresses)
    if (type === 'province') await chooseProvince(item as ProvinceData)
    if (type === 'district') await chooseDistrict(item as DistrictData)
    if (type === 'ward') await chooseWard(item as WardData)
  } catch (e) {
    $toast.error(e)
  }
}

/** xóa địa điểm */
function removeLocations(type: 'province' | 'district' | 'ward' | 'all') {
  try {
    removeLocation(type)
  } catch (e) {
    $toast.error(e)
  }
}
</script>
