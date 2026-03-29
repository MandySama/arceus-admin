<script setup>
import { Sidebar, Navbar } from './components'

import { useResize } from '@/hooks/resize'
import { useAppStore } from '@/stores/app'

const { isMobile } = useResize()

const appStore = useAppStore()
const { collapseSidebar } = storeToRefs(appStore)

const route = useRoute()

watch(
  () => isMobile.value,
  () => appStore.toggleSidebar(isMobile.value)
)

watch(
  () => route.path,
  () => isMobile.value && appStore.toggleSidebar()
)

const toggleSidebar = () => {
  appStore.toggleSidebar()
}

onMounted(() => {
  if (isMobile.value && !collapseSidebar.value) {
    appStore.toggleSidebar()
  }
})
</script>

<template>
  <el-container class="layout-container">
    <sidebar v-show="!(isMobile && collapseSidebar)"></sidebar>
    <el-container direction="vertical">
      <navbar></navbar>
    </el-container>
    <div
      v-if="isMobile && !collapseSidebar"
      class="size-full fixed z-999 bg-(--el-overlay-color-lighter)"
      @click="toggleSidebar"
    ></div>
  </el-container>
</template>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
}
</style>
