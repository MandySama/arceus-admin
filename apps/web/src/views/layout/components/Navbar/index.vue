<script setup>
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
</script>

<template>
  <el-header class="app-layout__navbar">
    <hamburger></hamburger>
    <breadcrumb></breadcrumb>
  </el-header>
</template>

<style scoped>
.app-layout__navbar {
  height: 48px;
  background-color: var(--background);
  border-bottom: 1px solid var(--border);
  padding-inline: 8px;
  display: flex;
  align-items: center;
}
</style>
