<script setup>
import { useLayoutStore } from '@/stores'

const layoutStore = useLayoutStore()
const { collapseSidebar } = storeToRefs(layoutStore)
</script>

<template>
  <div
    class="group hover:bg-accent flex size-8 cursor-pointer items-center justify-center rounded-md"
    @click="collapseSidebar = !collapseSidebar"
  >
    <icon
      class="text-foreground group-hover:text-accent-foreground size-4.5"
      :icon="collapseSidebar ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'"
    ></icon>
  </div>
</template>

<style scoped></style>
