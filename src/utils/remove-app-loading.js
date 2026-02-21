export const removeAppLoading = () => {
  const loadingElement = document.getElementById('app-loading-container')
  loadingElement.style.pointerEvents = 'none'
  loadingElement.style.opacity = '0'
  loadingElement.style.transition = 'opacity 0.8s ease-out'
  loadingElement.addEventListener('transitionend', () => {
    loadingElement.remove()
    document.getElementById('app-loading-style').remove()
  })
}
