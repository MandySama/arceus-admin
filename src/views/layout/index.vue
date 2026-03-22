<script setup>
import { Sidebar, Navbar } from './components'
</script>

<template>
  <el-container class="layout-container">
    <sidebar></sidebar>
    <el-container direction="vertical">
      <navbar></navbar>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
}
</style>
