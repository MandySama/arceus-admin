<script setup>
import { useAppStore } from '@/stores/app'
import { useUserInfoStore } from '@/stores/userInfo'

import Logo from '../Logo/index.vue'
import MenuItem from '../Menu/MenuItem.vue'

const appStore = useAppStore()
const { collapseSidebar: isCollapse } = storeToRefs(appStore)

const route = useRoute()
const activeMenu = computed(() => {
  return route.path
})

const userInfoStore = useUserInfoStore()
const { routeList: menuList } = storeToRefs(userInfoStore)
</script>

<template>
  <el-aside class="sidebar-container" :class="{ 'collapse-sidebar': isCollapse }">
    <logo :is-collapse="isCollapse" @click="isCollapse = !isCollapse"></logo>
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
  width: 224px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--el-border-color-light);

  &.collapse-sidebar {
    width: 64px;
  }

  .el-scrollbar {
    flex: 1;

    :deep(.el-scrollbar__bar).is-horizontal {
      display: none;
    }

    :deep(.el-scrollbar__bar).is-vertical {
      right: 0;
    }
  }
}
</style>
