<script setup>
import { useAppStore } from '@/stores/app'
import { useResize } from '@/hooks/resize'
import { useUserInfoStore } from '@/stores/userInfo'

import Logo from './Logo.vue'
import MenuItem from './MenuItem.vue'

const appStore = useAppStore()
const { collapseSidebar: isCollapse } = storeToRefs(appStore)

const { isMobile } = useResize()

const route = useRoute()
const activeMenu = computed(() => {
  return route.path
})

const userInfoStore = useUserInfoStore()
const { routeList: menuList } = storeToRefs(userInfoStore)
</script>

<template>
  <el-aside class="sidebar-container" :class="{ 'collapse-sidebar': isCollapse, 'is-mobile': isMobile }">
    <logo :is-collapse="isCollapse"></logo>
    <el-scrollbar>
      <el-menu
        class="!border-none"
        :collapse="isCollapse"
        :default-active="activeMenu"
        :collapse-transition="false"
        unique-opened
      >
        <menu-item v-for="menu in menuList" :key="menu.routePath" :menu="menu"></menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped lang="scss">
.sidebar-container {
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-right: 1px solid #e4e4e7;

  &.collapse-sidebar {
    width: 64px;
  }

  &.is-mobile {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1001;
  }

  .el-scrollbar {
    flex: 1;

    :deep(.el-scrollbar__bar).is-horizontal {
      display: none;
    }
  }
}
</style>
