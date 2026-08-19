<script setup>
import { useLayoutStore, useUserInfoStore } from '@/stores'

import Logo from '../Logo.vue'
import MenuItem from '../MenuItem.vue'

const layoutStore = useLayoutStore()
const { collapseSidebar } = storeToRefs(layoutStore)

const userInfoStore = useUserInfoStore()
const { routeList: menuList } = storeToRefs(userInfoStore)
</script>

<template>
  <el-aside class="app-layout__sidebar" :class="{ 'collapse-sidebar': collapseSidebar }">
    <logo :is-collapse="collapseSidebar" @click="collapseSidebar = !collapseSidebar"></logo>
    <el-scrollbar>
      <el-menu :collapse="collapseSidebar" :collapse-transition="false">
        <menu-item v-for="item in menuList" :key="item.menuId" :item="item"></menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped>
.app-layout__sidebar {
  width: 224px;
  border-right: 1px solid #e4e4e7;
  display: flex;
  flex-direction: column;

  &.collapse-sidebar {
    width: 64px;
  }

  .el-scrollbar {
    flex: 1;
  }
}
</style>
