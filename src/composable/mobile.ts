import { ref, onMounted, onUnmounted } from 'vue'

export function useIsMobile() {
  // ===== Reactive state: xác định có phải màn mobile không =====
  // true nếu width <= 768px
  const isMobile = ref(window.innerWidth <= 768)

  // ===== Handler: cập nhật lại giá trị khi resize =====
  const handleResize = () => {
    isMobile.value = window.innerWidth <= 768
  }

  onMounted(() => {
    // ===== Lắng nghe sự kiện resize của window =====
    // để cập nhật trạng thái mobile khi thay đổi kích thước màn hình
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    // ===== Cleanup: hủy listener khi component bị destroy =====
    // tránh memory leak
    window.removeEventListener('resize', handleResize)
  })

  // ===== Expose ra ngoài để component sử dụng =====
  return { isMobile }
}