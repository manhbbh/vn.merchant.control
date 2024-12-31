/** Dữ liệu tỉnh thành */
export interface ProvinceData {
  id?:string,
  name?: string,
  slug?: string,
  type?: string,
  name_with_type?: string,
  code?: string
  is_hidden?: boolean
}

/** Dữ liệu quận huyện */
export interface DistrictData {
  id?:string,
  name?: string,
  type?: string,
  slug?: string,
  name_with_type?: string,
  path?: string,
  path_with_type?: string,
  code?: string,
  parent_code?: string
  is_hidden?: boolean
}

/** Dữ liệu xã phường */
export interface WardData {
  id?:string,
  name?: string,
  type?: string,
  slug?: string,
  name_with_type?: string,
  path?: string,
  path_with_type?: string,
  code?: string,
  parent_code?: string
  is_hidden?: boolean
}

export interface StreetData {
  id?: string
  code?: string
  name?: string
}

/** Các dạng type detect */
export type DetectType = 'PROVINCE' | 'DISTRICT' | 'WARD' | 'STREET' | 'HOUSE_NUMBER'

/** Dữ liệu chi tiết */
export interface DetailData {
  id?: string
  code?: string
  type?: DetectType
  name?: string
}

/** Dữ liệu detect */
export interface DetectData {
  formattedAddress: string
  components: DetailData[]
}

/** Danh sách đia chỉ detect */
export interface Addresses {
  address_id: string;
  address_name: string
  engine?:string
  province?: ProvinceData
  district?: DistrictData
  ward?: WardData
  address?: string
}

/** Dữ liệu chi tiết của địa chỉ */
export interface LocationDetail {
  /** Tỉnh thành */
province?: ProvinceData
/** Quận huyện */
district?: DistrictData
/** Phường xã */
ward?: WardData
/** Dữ liệu tên đường */
street?: StreetData
/** Số nhà */
house_number?: StreetData
}