<script setup>
import { Sidebar, Navbar } from './components'

import { useResize } from '@/hooks/resize'
import { useLayoutStore } from '@/stores'

const { isMobile } = useResize()

const layoutStore = useLayoutStore()
const { collapseSidebar } = storeToRefs(layoutStore)

const route = useRoute()

watch(
  isMobile,
  (value) => {
    collapseSidebar.value = value
  },
  {
    immediate: true,
  },
)

watch(
  () => route.path,
  () => {
    if (isMobile.value) {
      collapseSidebar.value = true
    }
  },
)
</script>

<template>
  <el-container class="app-layout">
    <sidebar v-if="!isMobile || !collapseSidebar"></sidebar>
    <el-container direction="vertical">
      <navbar></navbar>
    </el-container>
    <div
      v-if="isMobile && !collapseSidebar"
      class="fixed inset-0 z-999 bg-(--el-overlay-color-lighter)"
      @click="collapseSidebar = true"
    ></div>
  </el-container>
</template>

<style scoped>
.app-layout {
  height: 100vh;
}
</style>
