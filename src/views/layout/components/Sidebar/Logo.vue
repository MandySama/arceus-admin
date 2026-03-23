<script setup>
import LogoSvg from '@/assets/logo.svg'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <router-link class="logo-container" to="/index">
    <img v-if="isCollapse" class="size-8" :src="LogoSvg" alt="" />
    <div v-else class="text-(--el-color-primary) text-[20px] font-bold">{{ title }}</div>
  </router-link>
</template>

<style scoped lang="scss">
.logo-container {
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color-light);
}
</style>
