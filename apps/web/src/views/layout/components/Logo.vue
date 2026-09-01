<script setup>
import LogoSvg from '@/assets/icons/logo.svg'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div class="app-layout__sidebar-logo">
    <router-link class="flex size-full items-center justify-center" to="/home">
      <img v-if="isCollapse" class="size-8" :src="LogoSvg" />
      <div v-else class="text-primary text-xl font-bold">{{ title }}</div>
    </router-link>
  </div>
</template>

<style scoped>
.app-layout__sidebar-logo {
  height: 48px;
}
</style>
