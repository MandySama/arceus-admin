<script setup>
defineProps({
  menu: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <el-sub-menu v-if="menu.children?.length > 0" :index="menu.routePath">
    <template #title>
      <el-icon :size="14">
        <component :is="menu.icon"></component>
      </el-icon>
      <span>{{ menu.menuName }}</span>
    </template>
    <menu-item v-for="subMenu in menu.children" :key="subMenu.routePath" :menu="subMenu"></menu-item>
  </el-sub-menu>
  <router-link v-else :to="menu.routePath">
    <el-menu-item :index="menu.routePath">
      <el-icon :size="14">
        <component :is="menu.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ menu.menuName }}</span>
      </template>
    </el-menu-item>
  </router-link>
</template>

<style scoped lang="scss"></style>
