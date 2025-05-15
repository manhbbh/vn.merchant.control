/** Lấy ra mã màu ngẫu nhiên */
export function randomBackgroundColors() {
  /** danh sách các màu cần random */
  const TAILWIND_COLORS = [
    'bg-red-600',
    'bg-blue-600',
    'bg-green-600',
    'bg-yellow-600',
    'bg-pink-600',
    'bg-purple-600',
    'bg-indigo-600',
    'bg-teal-600',
    'bg-orange-600',
    'bg-cyan-600',
    'bg-lime-600',
    'bg-emerald-600',
    'bg-violet-600',
    'bg-rose-600',
    'bg-amber-600',
  ]
  /** index của 1 màu ngẫu nhiên */
  const RANDOM_INDEX = Math.floor(Math.random() * TAILWIND_COLORS.length)

  /** lấy ra màu ngẫu nhiên */
  return TAILWIND_COLORS[RANDOM_INDEX]
}