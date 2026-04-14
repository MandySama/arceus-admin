<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <el-sub-menu v-if="item.children?.length > 0" :index="item.routePath">
    <template #title>
      <el-icon :size="14">
        <component :is="item.icon"></component>
      </el-icon>
      <span>{{ item.menuName }}</span>
    </template>
    <menu-item v-for="menu in item.children" :key="menu.routePath" :item="menu"></menu-item>
  </el-sub-menu>
  <router-link v-else :to="item.routePath">
    <el-menu-item :index="item.routePath">
      <el-icon :size="14">
        <component :is="item.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.menuName }}</span>
      </template>
    </el-menu-item>
  </router-link>
</template>

<style scoped lang="scss"></style>
