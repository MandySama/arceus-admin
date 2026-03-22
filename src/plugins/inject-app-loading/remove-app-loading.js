export const removeAppLoading = () => {
  const loadingElement = document.getElementById('app-loading-container')
  if (loadingElement !== null) {
    loadingElement.classList.add('hidden-loading')
    loadingElement.addEventListener('transitionend', () => {
      loadingElement.remove()
      document.getElementById('app-loading-style')?.remove()
    })
  }
}
