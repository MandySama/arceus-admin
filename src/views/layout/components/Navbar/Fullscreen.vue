<script setup>
import screenfull from 'screenfull'

const isFullscreen = ref(false)

screenfull.on('change', () => {
  isFullscreen.value = !isFullscreen.value
})

const toggleFullscreen = () => {
  screenfull.toggle()
}
</script>

<template>
  <div @click="toggleFullscreen">
    <icon :icon="isFullscreen ? 'lucide:minimize' : 'lucide:maximize'" />
  </div>
</template>

<style scoped lang="scss"></style>
