export const removeAppLoading = () => {
  const loadingStyle = document.querySelector('#app-loading-style')
  const loadingDiv = document.querySelector('#app-loading')
  loadingDiv.classList.add('hidden-loading')
  loadingDiv.addEventListener('transitionend', () => {
    loadingStyle.remove()
    loadingDiv.remove()
  })
}
