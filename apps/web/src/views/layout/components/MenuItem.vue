<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <el-menu-item v-if="item.menuType === 'menu'" :index="item.menuId">
    <el-icon>
      <icon :icon="item.icon"></icon>
    </el-icon>
    <template #title>
      <span>{{ item.menuName }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else-if="item.menuType === 'dir'" :index="item.menuId">
    <template #title>
      <el-icon>
        <icon :icon="item.icon"></icon>
      </el-icon>
      <span>{{ item.menuName }}</span>
    </template>
    <menu-item
      v-for="childItem in item.children"
      :key="childItem.menuId"
      :item="childItem"
    ></menu-item>
  </el-sub-menu>
</template>

<style scoped></style>
