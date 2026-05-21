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
    <icon :icon="collapseSidebar ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'" />
  </div>
</template>

<style scoped lang="scss">
.hamburger-container {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--foreground);
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  svg {
    width: 18px;
    height: 18px;
  }
}
</style>
