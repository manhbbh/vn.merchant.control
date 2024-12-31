/**
 * .env.dev
 */

import type { Env } from '@/service/interface'

const ENV: Env = {
  local_storage: {
    prefix: 'botcast_',
  },
  host: {
    test: 'http://localhost:1355',
    merchant: 'https://api.merchant.vn/v1',
    product: 'https://api-product.merchant.vn',
  },
}

export default ENV
