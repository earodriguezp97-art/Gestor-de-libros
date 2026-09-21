export const agotado = {
  mounted(el, binding) {
    if (binding.value === 0) {
      el.style.opacity = '0.55'
    }
  },
  updated(el, binding) {
    if (binding.value === 0) {
      el.style.opacity = '0.55'
    } else {
      el.style.opacity = '1'
    }
  }
}