<script setup>
import { Sidebar, Navbar } from './components'

import { useResize } from '@/hooks/resize'

const { isMobile } = useResize()
</script>

<template>
  <el-container class="app-layout">
    <sidebar v-if="!isMobile"></sidebar>
    <el-container direction="vertical">
      <navbar></navbar>
    </el-container>
  </el-container>
</template>

<style scoped>
.app-layout {
  height: 100vh;
}
</style>
