<script setup>
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import Search from './Search.vue'
import Setting from './Setting.vue'
import Fullscreen from './Fullscreen.vue'
</script>

<template>
  <el-header class="navbar-container">
    <hamburger></hamburger>
    <breadcrumb></breadcrumb>
    <div class="ml-auto flex items-center gap-x-1">
      <search></search>
      <setting class="toolbar-item"></setting>
      <fullscreen class="toolbar-item"></fullscreen>
    </div>
  </el-header>
</template>

<style scoped lang="scss">
.navbar-container {
  height: 48px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e4e7;

  .toolbar-item,
  :deep(.toolbar-item) {
    height: 32px;
    padding-inline: 8px;
    display: flex;
    align-items: center;
    color: #323639;
    border-radius: 16px;
    cursor: pointer;

    &:hover {
      background-color: #f4f4f5;
    }
  }

  .toolbar-item :deep(svg),
  :deep(.toolbar-item) svg {
    width: 16px;
    height: 16px;
  }
}
</style>
