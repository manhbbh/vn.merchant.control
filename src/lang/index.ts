/**
 * Vue i18n.
 *
 * Template: {{ $t('v1.common.loading') }}
 * Script setup: const { t } = useI18n()
 * Other scripts: import { i18n } from '@/lang'
 */

import { createI18n } from 'vue-i18n'
import { queryString } from '@/service/helper/queryString'

import en from '@/lang/en'
import vn from '@/lang/vn'

export type AppLocale = 'vn' | 'vi' | 'en'

const supportedLocales: AppLocale[] = ['vn', 'vi', 'en']

function normalizeLocale(value?: string | null): AppLocale {
  if (value === 'vi') return 'vi'
  if (value === 'en') return 'en'
  return 'vn'
}

const storedLocale = queryString('locale') || localStorage.getItem('locale') || 'vi'

export const locale = normalizeLocale(storedLocale)

localStorage.setItem('locale', locale)

export const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'vn',
  messages: {
    en,
    vn,
    vi: vn,
  },
})

export function setLocale(nextLocale: string) {
  const normalizedLocale = normalizeLocale(nextLocale)

  if (!supportedLocales.includes(normalizedLocale)) return

  i18n.global.locale.value = normalizedLocale
  localStorage.setItem('locale', normalizedLocale)
}
