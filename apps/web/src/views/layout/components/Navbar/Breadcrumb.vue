<script setup>
import { homeRoute, isHomeRoute } from '@/router'

const route = useRoute()

const breadcrumbList = computed(() => {
  return [homeRoute, ...route.matched.filter((item) => item.meta.title && !isHomeRoute(item))]
})
</script>

<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
      <router-link v-if="isHomeRoute(item)" :to="item.path">{{ item.meta.title }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.el-breadcrumb {
  margin-left: 8px;

  .el-breadcrumb__item a,
  .el-breadcrumb__item :deep(.el-breadcrumb__separator) {
    font-weight: 400;
  }
}
</style>
