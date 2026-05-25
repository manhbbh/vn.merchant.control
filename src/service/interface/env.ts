export interface Env {
  /**cài đặt cho local */
  local_storage: {
    /**prefix cho tên của local */
    prefix: string
  }
  /**danh sách url các máy chủ */
  host: {
    /**máy chủ test */
    test: string
    /**máy chủ merchant */
    merchant: string
    
    /** API get get_business */
    merchant_get_business?: string
    /**máy chủ product */
    product: string
    /**máy chủ timeboxing */
    timeboxing: string
  }
}
