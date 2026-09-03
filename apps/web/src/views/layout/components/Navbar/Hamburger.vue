<script setup>
import { useLayoutStore } from '@/stores'

const layoutStore = useLayoutStore()
const { collapseSidebar } = storeToRefs(layoutStore)
</script>

<template>
  <div class="app-layout__navbar-hamburger group" @click="collapseSidebar = !collapseSidebar">
    <icon
      class="text-foreground group-hover:text-accent-foreground text-lg"
      :icon="'ant-design:menu-fold-outlined'"
    ></icon>
  </div>
</template>

<style scoped>
.app-layout__navbar-hamburger {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: var(--accent);
  }
}
</style>
