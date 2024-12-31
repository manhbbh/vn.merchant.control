import { Toast } from '@/service/helper/toast'
import { nonAccentVn } from '@/service/helper/format'

import { get } from 'lodash'
import { ref, type Ref } from 'vue'

import {
  getWard,
  getAddress,
  getDistrict,
  detectAddressV2,
} from '@/service/api/api'

import type {
  Addresses,
  DistrictData,
  LocationDetail,
  ProvinceData,
  StreetData,
  WardData,
} from '@/service/interface'


export function useLocation(
  order_edit: Ref<{
    address?: string
    locations?: LocationDetail
  }>
) {
  const $toast = new Toast()

  /** Nội dung tìm kiếm province */
  const search_provice = ref<string>('')

  /** Nội dung tìm kiếm district */
  const search_district = ref<string>('')

  /** Nội dung tìm kiếm ward */
  const search_ward = ref<string>('')

  /** Danh sách tỉnh thành */
  const provinces = ref<ProvinceData[]>([])

  /** Danh sách quận huyện */
  const districts = ref<DistrictData[]>([])

  /** Danh sách phường xã */
  const wards = ref<WardData[]>([])

  /** Danh sách địa chỉ */
  const addresses = ref<Addresses[]>([])

  /** chọn địa chỉ */
  async function chooseAddress(address: Addresses) {
    try {
      if (!order_edit.value.locations) order_edit.value.locations = {}
      
      if (address?.engine && order_edit.value.locations) {  
        
        if (address?.address) {
          order_edit.value.address = address?.address
        }
        

        if (address?.province) {
          order_edit.value.locations.province = address?.province
          search_provice.value = getProvinceName() || ''
        }

        if (address?.district) {
          order_edit.value.locations.district = address?.district
          search_district.value = getDistrictName() || ''
        }

        if (address?.ward) {
          search_ward.value = getWardName()
          order_edit.value.locations.ward = address?.ward
        }

        const PROVINCE_CODE = Number(address.province?.id)
          ? address.province?.id
          : address.province?.code
        // * Lấy thêm thông tin quận huyện
        if (PROVINCE_CODE) {
          districts.value = await getDistrict({
            province_id: PROVINCE_CODE,
          })
        }

        const DISTRICT_CODE = Number(address.district?.id)
          ? address.district?.id
          : address.district?.code
        // * Lấy thêm thông tin phường xã
        if (DISTRICT_CODE) {
          wards.value = await getWard({
            district_id: DISTRICT_CODE,
          })
        }
        return
      }

      /** Gán địa chỉ */
      order_edit.value.address = address.address_name?.split(' - ')?.[0]

      /** Lấy dữ liệu chi tiết */
      let location_detail = (await getAddress({
        address_id: address.address_id,
        address_name: address.address_name,
      })) as LocationDetail

      // * Gán dữ liệu loction
      if (order_edit.value.locations) {
        // * Lưu dữ liệu tỉnh thành
        provinces.value.map(item => {
          if (
            item.code === location_detail.province?.id &&
            order_edit.value.locations
          ) {
            order_edit.value.locations.province = item
            search_provice.value = item.name || ''
          }
        })

        // * Lưu dữ liệu quận huyện
        order_edit.value.locations.district = {
          code: location_detail.district?.id,
          name: location_detail.district?.name,
          name_with_type: location_detail.district?.name,
        }
        search_district.value = location_detail.district?.name || ''

        // * Lưu dữ liệu phường xã
        order_edit.value.locations.ward = {
          code: location_detail.ward?.id,
          name: location_detail.ward?.name,
          name_with_type: location_detail.ward?.name,
        }
        search_ward.value = location_detail.ward?.name || ''

        order_edit.value.locations.street = {
          code: location_detail.street?.id,
          name: location_detail.street?.name,
        }

        order_edit.value.locations.house_number = {
          code: location_detail.house_number?.id,
          name: location_detail.house_number?.name,
        }
      }      

      // * Lấy thêm thông tin quận huyện
      if (location_detail.province?.id) {
        districts.value = await getDistrict({
          province_id: location_detail.province?.id,
        })
      }
      // * Lấy thêm thông tin phường xã
      if (location_detail.district?.id) {
        wards.value = await getWard({
          district_id: location_detail.district?.id,
        })
      }
    } catch (error) {
      $toast.error(error)
    }
  }

  /** hàm chọn tỉnh thành */
  async function chooseProvince(item: ProvinceData) {
    try {
      search_provice.value = item.name || ''
      search_district.value = ''
      search_ward.value = ''
      if (!order_edit.value.locations) order_edit.value.locations = {}
      if (order_edit.value.locations) order_edit.value.locations.province = item
      if (order_edit.value.locations) order_edit.value.locations.district = {}
      if (order_edit.value.locations) order_edit.value.locations.ward = {}

      if(!item.code) return      
      districts.value = await getDistrict({
        province_id: item.code,
      })
    } catch (error) {
      $toast.error(error)
    }
  }

  /** hàm chọn quận huyện */
  async function chooseDistrict(item: DistrictData) {
    try {
      search_district.value = item.name_with_type || ''
      search_ward.value = ''
      if (order_edit.value.locations) order_edit.value.locations.district = item
      if (order_edit.value.locations) order_edit.value.locations.ward = {}
      
      if(!item.code) return
      wards.value = await getWard({
        district_id: item.code,
      })
    } catch (error) {
      $toast.error(error)
    }
  }

  /** hàm chọn phường xã */
  async function chooseWard(item: WardData) {
    try {
      search_ward.value = item.name_with_type || ''
      if (order_edit.value.locations) order_edit.value.locations.ward = item
    } catch (error) {
      $toast.error(error)
    }
  }

  /** lấy tên của tỉnh, thành phố */
  function getProvinceName() {
    return (
      get(order_edit.value, 'locations.province.name') ||
      get(order_edit.value, 'locations.province.name_with_type') ||
      ''
    )
  }

  /** lấy tên của quận huyện */
  function getDistrictName() {
    return (
      get(order_edit.value, 'locations.district.name_with_type') ||
      get(order_edit.value, 'locations.district.name') ||
      ''
    )
  }

  /** lấy tên của phường xã */
  function getWardName() {
    return (
      get(order_edit.value, 'locations.ward.name_with_type') ||
      get(order_edit.value, 'locations.ward.name') ||
      ''
    )
  }

  /** tìm kiếm địa chỉ */
  async function searchAddressHook(address: string) {
    try {
      addresses.value = await detectAddressV2({
        address: address,
      })
      console.log(addresses.value)
    } catch (error) {
      $toast.error(error)
    }
  }

  

  /** Focus vào input */
  function focusInput(id: string) {
    let input = document.getElementById(id) as HTMLInputElement
    let timeout = setTimeout(() => {
      if (input) input.click()
      if (input) input.focus()
      clearTimeout(timeout)
    }, 100)
  }

  /** Xóa location */
  function removeLocation(type: 'province' | 'district' | 'ward' | 'all') {
    if (order_edit.value.locations?.province && type === 'province') {
      order_edit.value.locations.province = {}
      order_edit.value.locations.district = {}
      order_edit.value.locations.ward = {}
      focusInput('province-input')
      search_provice.value = ''
      search_district.value = ''
      search_ward.value = ''
    }
    if (order_edit.value.locations?.district && type === 'district') {
      order_edit.value.locations.district = {}
      order_edit.value.locations.ward = {}
      focusInput('district-input')
      search_district.value = ''
      search_ward.value = ''
    }
    if (order_edit.value.locations?.ward && type === 'ward') {
      order_edit.value.locations.ward = {}
      focusInput('ward-input')
      search_ward.value = ''
    }
    if (type === 'all') {
      order_edit.value.address = ''
    }
  }

  return {
    search_provice,
    search_district,
    search_ward,
    provinces,
    districts,
    wards,
    addresses,
    chooseAddress,
    chooseProvince,
    chooseDistrict,
    chooseWard,
    getProvinceName,
    getDistrictName,
    getWardName,
    searchAddressHook,
    removeLocation,
  }
}
