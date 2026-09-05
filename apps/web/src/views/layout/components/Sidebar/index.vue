<script setup>
import { useLayoutStore, useUserInfoStore } from '@/stores'

import Logo from '../Logo.vue'
import MenuItem from '../MenuItem.vue'
import { useResize } from '@/hooks/resize'

const layoutStore = useLayoutStore()
const { collapseSidebar } = storeToRefs(layoutStore)

const { isMobile } = useResize()

const showLogoBorder = ref(false)

const route = useRoute()
const activeMenu = computed(() => {
  return route.path
})

const userInfoStore = useUserInfoStore()
const { routeList: menuList } = storeToRefs(userInfoStore)

const handleMenuScroll = ({ scrollTop }) => {
  showLogoBorder.value = scrollTop > 0
}
</script>

<template>
  <el-aside
    class="app-layout__sidebar"
    :class="{ 'collapse-sidebar': collapseSidebar, 'is-mobile': isMobile }"
  >
    <logo
      :class="showLogoBorder && 'border-b-border border-b-1'"
      :is-collapse="collapseSidebar"
    ></logo>
    <el-scrollbar @scroll="handleMenuScroll">
      <el-menu
        :collapse="collapseSidebar"
        :default-active="activeMenu"
        unique-opened
        :collapse-transition="false"
      >
        <menu-item v-for="item in menuList" :key="item.menuId" :item="item"></menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped lang="scss">
.app-layout__sidebar {
  width: 224px;
  background-color: var(--background);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;

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

    :deep(.el-scrollbar__bar.is-vertical) {
      right: 0;
    }
  }
}
</style>
