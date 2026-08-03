<script setup>
import { useLayoutStore } from '@/stores'

import Logo from './Logo.vue'

const layoutStore = useLayoutStore()
const { collapseSidebar } = storeToRefs(layoutStore)
</script>

<template>
  <el-aside class="app-layout__sidebar" :class="{ 'collapse-sidebar': collapseSidebar }">
    <logo :is-collapse="collapseSidebar"></logo>
    <el-scrollbar>
      <el-menu></el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped>
.app-layout__sidebar {
  width: 224px;
  border-right: 1px solid #e4e4e7;
  display: flex;
  flex-direction: column;

  &.collapse-sidebar {
    width: 64px;
  }

  .el-scrollbar {
    flex: 1;
  }
}
</style>
