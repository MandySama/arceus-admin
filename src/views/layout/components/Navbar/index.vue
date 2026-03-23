<script setup>
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
</script>

<template>
  <el-header class="navbar-container">
    <hamburger></hamburger>
    <breadcrumb></breadcrumb>
  </el-header>
</template>

<style scoped lang="scss">
.navbar-container {
  height: 48px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color-light);
}
</style>
