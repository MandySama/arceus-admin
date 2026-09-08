<script setup>
import { homeRoute, isHomeRoute } from '@/router'

const route = useRoute()

const breadcrumbList = computed(() => {
  return [homeRoute, ...route.matched.filter((item) => item.meta.title && !isHomeRoute(item))]
})
</script>

<template>
  <el-breadcrumb class="hidden lg:block">
    <el-breadcrumb-item
      v-for="item in breadcrumbList"
      :key="item.path"
      :to="isHomeRoute(item) ? item.path : ''"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.el-breadcrumb {
  margin-left: 8px;

  :deep(.el-breadcrumb__inner.is-link),
  :deep(.el-breadcrumb__separator) {
    font-weight: 400;
  }
}
</style>
