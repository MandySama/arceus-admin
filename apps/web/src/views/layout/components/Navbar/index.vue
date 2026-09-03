<script setup>
import Hamburger from './Hamburger.vue'
</script>

<template>
  <el-header class="app-layout__navbar">
    <hamburger></hamburger>
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
