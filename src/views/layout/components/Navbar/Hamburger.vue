<script setup>
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { collapseSidebar } = storeToRefs(appStore)

const toggleSidebar = () => {
  appStore.toggleSidebar()
}
</script>

<template>
  <div class="hamburger-container" @click="toggleSidebar">
    <i-ant-design-menu-unfold-outlined v-if="collapseSidebar" />
    <i-ant-design-menu-fold-outlined v-else />
  </div>
</template>

<style scoped lang="scss">
.hamburger-container {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #323639cc;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    color: #18181b;
    background-color: #f4f4f5;
  }

  svg {
    width: 18px;
    height: 18px;
  }
}
</style>
